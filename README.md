# KUSKA - Frontend React con Vite & TypeScript

Sistema de gestión de proyectos y colaboración en equipo construido con React, TypeScript, Vite y Tailwind CSS, con autenticación completa integrada con backend REST API.

## Estructura del Proyecto

```
src/
├── app/
│   └── AppRoot.tsx              # Configuración de rutas principal
├── components/
│   └── ProtectedRoute.tsx       # HOC para rutas protegidas
├── features/
│   ├── auth/                    # Feature de Autenticación
│   │   ├── context/
│   │   │   ├── AuthContext.tsx  # Context API para auth
│   │   │   └── index.ts
│   │   ├── services/
│   │   │   ├── axios.config.ts  # Configuración de Axios + interceptores
│   │   │   ├── auth.service.ts  # Servicio de autenticación
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   ├── auth.types.ts    # Interfaces TypeScript
│   │   │   └── index.ts
│   │   ├── login/
│   │   │   └── Login.tsx        # Página de login
│   │   ├── register/
│   │   │   └── Register.tsx     # Página de registro
│   │   └── index.ts
│   ├── landing/
│   │   └── LandingPage.tsx      # Landing page
│   └── dashboard/               # Feature del Dashboard
│       ├── modules/
│       │   ├── foryou/          # Módulo "Para Ti"
│       │   ├── projects/        # Módulo de Proyectos
│       │   ├── templates/       # Módulo de Plantillas
│       │   ├── teams/           # Módulo de Equipos
│       │   ├── calendar/        # Módulo de Calendario
│       │   ├── profile/         # Módulo de Perfil
│       │   └── configuration/   # Módulo de Configuración
│       ├── shared/
│       │   ├── Navbar.tsx       # Barra de navegación
│       │   ├── Sidebar.tsx      # Menú lateral
│       │   └── Sidebarconfig.tsx
│       └── Dashboard.tsx        # Layout del dashboard
├── App.tsx
├── main.tsx
└── index.css
```

## 🌐 Rutas Disponibles

### Rutas Públicas
- `/` - Landing Page
- `/auth/login` - Inicio de sesión
- `/auth/register` - Registro de usuario

### Rutas Protegidas (Requieren autenticación)
- `/auth/work-type` - Onboarding: Tipo de trabajo
- `/auth/project-name` - Onboarding: Nombre del proyecto
- `/auth/work-needs` - Onboarding: Necesidades
- `/auth/work-tracking` - Onboarding: Seguimiento

### Dashboard (Protegido)
- `/dashboard` - Dashboard principal (For You)
- `/dashboard/for-you` - Sección Para Ti
- `/dashboard/projects` - Lista de proyectos
- `/dashboard/projects/:projectId` - Detalle de proyecto
- `/dashboard/templates` - Plantillas
- `/dashboard/teams` - Equipos
- `/dashboard/teams/equipo/:teamId` - Detalle de equipo
- `/dashboard/calendar` - Calendario
- `/dashboard/profile/:id` - Perfil de usuario

### Configuración (Protegido)
- `/configuration` - Configuración general
- `/configuration/profile` - Perfil de usuario
- `/configuration/appearance` - Apariencia
- `/configuration/notifications` - Notificaciones
- `/configuration/security` - Seguridad

### Endpoints del Backend

#### Públicos (no requieren autenticación)
```typescript
POST /api/auth/register
Body: { email, password, completeName, phone? }
Response: { accessToken, refreshToken, user }

POST /api/auth/login
Body: { email, password }
Response: { accessToken, refreshToken, user }

POST /api/auth/refresh
Body: { refreshToken }
Response: { accessToken }
```

#### Protegidos (requieren header: `Authorization: Bearer <token>`)
```typescript
GET  /api/auth/me
POST /api/auth/logout
GET  /api/projects
POST /api/projects
GET  /api/tasks
POST /api/tasks
GET  /api/teams
POST /api/teams
```

### Validaciones
- **Password**: Mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número
- **Phone**: Opcional, formato: `+countrycode+number` (ej: `+51987654321`)