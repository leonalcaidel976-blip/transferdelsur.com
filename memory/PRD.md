# Transfer del Sur - PRD

## Problema Original
Recuperar la página web Transfer del Sur (www.transferdelsur.com) - servicio VTC premium en la Costa del Sol, incluyendo dominio, Bot de Telegram e imágenes.

## Descripción
Landing page premium para servicio de transporte VTC en la Costa del Sol, Málaga. Diseño elegante en tonos oscuros con acentos dorados.

## User Personas
- **Turistas internacionales**: Necesitan traslados aeropuerto-hotel confiables
- **Viajeros de negocios**: Requieren servicio puntual y profesional
- **Residentes locales**: Tours y servicios por horas para ocasiones especiales

## Requisitos Core (Estáticos)
1. Landing page con secciones: Hero, Servicios, Flota, Tarifas, Nosotros, Blog, Contacto
2. Sistema de reservas online (3 tipos: Aeropuerto, Por Horas, Tours)
3. Panel de administración con login
4. Notificaciones de Telegram para nuevas reservas
5. Integración WhatsApp
6. Diseño responsive

## Implementado ✅
**Fecha: 17 Feb 2026**

### Frontend
- Landing page completa con diseño oscuro/dorado premium
- Navbar fijo con navegación smooth scroll
- Hero section con imagen de fondo y estadísticas
- Formulario de reservas con 3 tabs (Aeropuerto, Por Horas, Tours)
- Sección Servicios (4 servicios)
- Sección Flota (3 vehículos Mercedes)
- Tabla de Tarifas (8 destinos desde aeropuerto)
- Testimonios de clientes
- Sección Nosotros con estadísticas
- Blog con 3 posts
- Formulario de contacto
- Footer
- Botón flotante WhatsApp
- Panel Admin con login
- Dashboard Admin con gestión de reservas y mensajes

### Backend
- API FastAPI completa
- MongoDB para persistencia
- Endpoints: reservations, contacts, admin auth, stats
- Integración Telegram Bot para notificaciones
- JWT authentication para admin

### Integraciones
- **Telegram Bot**: @transferdelsur_reservas_bot
  - Token: 8272405004:AAGMDQeCWwl4UDkHvL0Q59RQGea1C6dviw8
  - Chat ID: 1418360041
- **WhatsApp**: +34600221794
- **Email**: transferdelsur976@gmail.com
- **Instagram**: @transferdelsur

## Credenciales Admin
- Email: admin@transferdelsur.es
- Password: admin123

## Backlog / Próximos Pasos

### P0 (Crítico)
- [ ] Configurar dominio transferdelsur.com (requiere DNS)

### P1 (Importante)
- [ ] Sistema de emails automáticos de confirmación
- [ ] Dashboard más detallado con gráficos
- [ ] Exportar reservas a Excel/CSV

### P2 (Mejoras)
- [ ] Multi-idioma (EN, DE, FR)
- [ ] Sistema de reviews/valoraciones
- [ ] Calculadora de precios dinámica
- [ ] Integración Google Maps para rutas
- [ ] Sistema de pagos online (Stripe)

## Stack Técnico
- **Frontend**: React 19, Tailwind CSS, Lucide Icons
- **Backend**: FastAPI, Motor (MongoDB async)
- **Database**: MongoDB
- **Fonts**: Cormorant Garamond, Montserrat
