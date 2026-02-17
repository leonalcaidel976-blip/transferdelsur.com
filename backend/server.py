from fastapi import FastAPI, APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import httpx
import jwt
import hashlib

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Telegram config
TELEGRAM_BOT_TOKEN = os.environ.get('TELEGRAM_BOT_TOKEN', '')
TELEGRAM_CHAT_ID = os.environ.get('TELEGRAM_CHAT_ID', '')

# JWT Secret
JWT_SECRET = "transfer_del_sur_secret_key_2024"

# Create the main app
app = FastAPI(title="Transfer del Sur API")

# Create router with /api prefix
api_router = APIRouter(prefix="/api")

# Security
security = HTTPBearer(auto_error=False)

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# ============== MODELS ==============

class ReservationCreate(BaseModel):
    service_type: str  # aeropuerto, por_horas, tours
    pickup_location: str
    destination: str
    date: str
    time: str
    passengers: int
    luggage: int
    name: str
    email: EmailStr
    phone: str
    notes: Optional[str] = None

class Reservation(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    service_type: str
    pickup_location: str
    destination: str
    date: str
    time: str
    passengers: int
    luggage: int
    name: str
    email: str
    phone: str
    notes: Optional[str] = None
    status: str = "pendiente"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str

class Contact(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    subject: str
    message: str
    read: bool = False
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class AdminLogin(BaseModel):
    email: str
    password: str

class AdminResponse(BaseModel):
    token: str
    email: str

# ============== TELEGRAM ==============

async def send_telegram_notification(reservation: Reservation):
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        logger.warning("Telegram credentials not configured")
        return
    
    service_names = {
        "aeropuerto": "Traslado Aeropuerto",
        "por_horas": "Servicio por Horas", 
        "tours": "Tour Exclusivo"
    }
    
    message = f"""
🚗 *NUEVA RESERVA - Transfer del Sur*

📋 *Tipo:* {service_names.get(reservation.service_type, reservation.service_type)}
📍 *Recogida:* {reservation.pickup_location}
🎯 *Destino:* {reservation.destination}
📅 *Fecha:* {reservation.date}
⏰ *Hora:* {reservation.time}
👥 *Pasajeros:* {reservation.passengers}
🧳 *Maletas:* {reservation.luggage}

👤 *Cliente:* {reservation.name}
📧 *Email:* {reservation.email}
📞 *Teléfono:* {reservation.phone}

📝 *Notas:* {reservation.notes or 'Sin notas'}

🔖 *ID Reserva:* `{reservation.id}`
"""
    
    try:
        async with httpx.AsyncClient() as client:
            url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
            response = await client.post(url, json={
                "chat_id": TELEGRAM_CHAT_ID,
                "text": message,
                "parse_mode": "Markdown"
            })
            if response.status_code == 200:
                logger.info(f"Telegram notification sent for reservation {reservation.id}")
            else:
                logger.error(f"Telegram API error: {response.text}")
    except Exception as e:
        logger.error(f"Failed to send Telegram notification: {e}")

async def send_contact_telegram(contact: Contact):
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        return
    
    message = f"""
📬 *NUEVO MENSAJE DE CONTACTO*

👤 *Nombre:* {contact.name}
📧 *Email:* {contact.email}
📞 *Teléfono:* {contact.phone or 'No proporcionado'}

📋 *Asunto:* {contact.subject}

💬 *Mensaje:*
{contact.message}
"""
    
    try:
        async with httpx.AsyncClient() as client:
            url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
            await client.post(url, json={
                "chat_id": TELEGRAM_CHAT_ID,
                "text": message,
                "parse_mode": "Markdown"
            })
    except Exception as e:
        logger.error(f"Failed to send contact Telegram notification: {e}")

# ============== AUTH ==============

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if not credentials:
        raise HTTPException(status_code=401, detail="No autorizado")
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expirado")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token inválido")

# ============== ROUTES ==============

@api_router.get("/")
async def root():
    return {"message": "Transfer del Sur API", "status": "online"}

@api_router.get("/health")
async def health():
    return {"status": "healthy"}

# Reservations
@api_router.post("/reservations", response_model=Reservation)
async def create_reservation(data: ReservationCreate):
    reservation = Reservation(**data.model_dump())
    doc = reservation.model_dump()
    await db.reservations.insert_one(doc)
    
    # Send Telegram notification
    await send_telegram_notification(reservation)
    
    return reservation

@api_router.get("/reservations", response_model=List[Reservation])
async def get_reservations(token: dict = Depends(verify_token)):
    reservations = await db.reservations.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return reservations

@api_router.patch("/reservations/{reservation_id}/status")
async def update_reservation_status(reservation_id: str, status: str, token: dict = Depends(verify_token)):
    result = await db.reservations.update_one(
        {"id": reservation_id},
        {"$set": {"status": status}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Reserva no encontrada")
    return {"message": "Estado actualizado"}

@api_router.delete("/reservations/{reservation_id}")
async def delete_reservation(reservation_id: str, token: dict = Depends(verify_token)):
    result = await db.reservations.delete_one({"id": reservation_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Reserva no encontrada")
    return {"message": "Reserva eliminada"}

# Contact
@api_router.post("/contact", response_model=Contact)
async def create_contact(data: ContactCreate):
    contact = Contact(**data.model_dump())
    doc = contact.model_dump()
    await db.contacts.insert_one(doc)
    
    # Send Telegram notification
    await send_contact_telegram(contact)
    
    return contact

@api_router.get("/contacts", response_model=List[Contact])
async def get_contacts(token: dict = Depends(verify_token)):
    contacts = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return contacts

@api_router.patch("/contacts/{contact_id}/read")
async def mark_contact_read(contact_id: str, token: dict = Depends(verify_token)):
    await db.contacts.update_one({"id": contact_id}, {"$set": {"read": True}})
    return {"message": "Marcado como leído"}

@api_router.delete("/contacts/{contact_id}")
async def delete_contact(contact_id: str, token: dict = Depends(verify_token)):
    result = await db.contacts.delete_one({"id": contact_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Mensaje no encontrado")
    return {"message": "Mensaje eliminado"}

# Admin Auth
@api_router.post("/admin/login", response_model=AdminResponse)
async def admin_login(data: AdminLogin):
    # Default admin credentials
    admin_email = "admin@transferdelsur.es"
    admin_password = "admin123"
    
    if data.email == admin_email and data.password == admin_password:
        token = jwt.encode(
            {"email": data.email, "exp": datetime.now(timezone.utc).timestamp() + 86400},
            JWT_SECRET,
            algorithm="HS256"
        )
        return {"token": token, "email": data.email}
    
    raise HTTPException(status_code=401, detail="Credenciales incorrectas")

# Stats for admin dashboard
@api_router.get("/admin/stats")
async def get_admin_stats(token: dict = Depends(verify_token)):
    total_reservations = await db.reservations.count_documents({})
    pending = await db.reservations.count_documents({"status": "pendiente"})
    confirmed = await db.reservations.count_documents({"status": "confirmada"})
    completed = await db.reservations.count_documents({"status": "completada"})
    unread_contacts = await db.contacts.count_documents({"read": False})
    
    return {
        "total_reservations": total_reservations,
        "pending": pending,
        "confirmed": confirmed,
        "completed": completed,
        "unread_contacts": unread_contacts
    }

# Include router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
