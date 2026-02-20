# Transfer del Sur Costa del Sol - PRD

## Problem Statement
Mejoras a la página web de servicios VTC www.transferdelsur.com:
1. Optimización para teléfonos móviles (responsive design)
2. Selector de idiomas (Español, Inglés, Italiano, Alemán)
3. Subir precios +20€ en toda la tabla de tarifas
4. Selector de vehículo en el formulario de reserva

## User Personas
- **Turistas internacionales**: Necesitan el sitio en su idioma (EN, IT, DE)
- **Usuarios móviles**: Acceden desde smartphones para reservar traslados
- **Clientes corporativos**: Buscan información clara de precios y vehículos

## Core Requirements (Static)
- Diseño responsive mobile-first
- Multi-idioma (ES, EN, IT, DE)
- Formulario de reservas funcional
- Integración con WhatsApp
- Tabla de precios transparente

## What's Been Implemented (Feb 20, 2026)

### ✅ Responsive Design
- Mobile breakpoint: 390px-640px
- Tablet breakpoint: 641px-1024px
- Desktop: 1024px+
- Touch-friendly buttons (min 44px)
- Menú hamburguesa en móvil

### ✅ Sistema Multi-idioma
- Español (ES) - default
- English (EN)
- Italiano (IT)
- Deutsch (DE)
- Selector de idiomas en navbar
- Todas las secciones traducidas

### ✅ Precios Actualizados (+20€)
| Destino | Sedan (antes→ahora) | Van (antes→ahora) |
|---------|---------------------|-------------------|
| Marbella | 75€→95€ | 95€→115€ |
| Puerto Banús | 80€→100€ | 100€→120€ |
| Estepona | 90€→110€ | 115€→135€ |
| Fuengirola | 45€→65€ | 60€→80€ |
| Torremolinos | 35€→55€ | 45€→65€ |
| Benalmádena | 40€→60€ | 55€→75€ |
| Málaga Centro | 30€→50€ | 40€→60€ |
| Nerja | 110€→130€ | 140€→160€ |

### ✅ Selector de Vehículos
- Mercedes Clase E (1-3 pax) +0€
- Mercedes Clase V (4-7 pax) +20€
- Mercedes Clase S Lujo (1-3 pax) +40€

## Architecture
```
/app/frontend/src/
├── App.js              # Componente principal con todas las secciones
├── translations.js     # Traducciones ES, EN, IT, DE
├── App.css            # Estilos básicos
└── index.css          # Tailwind + estilos globales responsive
```

## Tech Stack
- React 19
- Tailwind CSS
- Lucide React (iconos)

## Prioritized Backlog

### P0 (Completed)
- [x] Responsive design
- [x] Multi-idioma
- [x] Actualizar precios
- [x] Selector de vehículos

### P1 (Future)
- [ ] Sistema de pagos online (Stripe)
- [ ] Confirmación por email automática
- [ ] Panel admin para gestionar reservas

### P2 (Backlog)
- [ ] Sistema de reseñas con Google
- [ ] Blog dinámico con CMS
- [ ] Chat en vivo
- [ ] Calculadora de precios personalizada

## Next Tasks
1. Desplegar a producción en www.transferdelsur.com
2. Guardar cambios en GitHub
