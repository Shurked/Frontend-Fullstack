# Estructura Organizacional del Proyecto React

## 📁 Estructura de Carpetas Recomendada

```
src/
├── components/                 # Componentes reutilizables
│   ├── ui/                    # Componentes básicos de UI
│   │   ├── Button.jsx         # Botón reutilizable
│   │   ├── Input.jsx          # Input reutilizable
│   │   ├── Card.jsx           # Card reutilizable
│   │   └── index.js           # Barrel exports
│   ├── layout/                # Componentes de diseño
│   │   ├── MainLayout.jsx     # Layout principal
│   │   ├── AuthLayout.jsx     # Layout para auth
│   │   ├── Navbar.jsx         # Barra de navegación
│   │   └── index.js           # Barrel exports
│   └── auth/                  # Componentes específicos de auth
│       ├── ProtectedRoute.jsx # Rutas protegidas
│       └── index.js           # Barrel exports
├── pages/                     # Páginas de la aplicación
│   ├── LandingPage.jsx        # Página principal
│   ├── Login.jsx              # Página de login
│   ├── Register.jsx           # Página de registro
│   └── Dashboard.jsx          # Dashboard
├── context/                   # Context providers
│   └── AuthContext.jsx        # Context de autenticación
├── hooks/                     # Custom hooks
│   ├── useForm.js             # Hook para formularios
│   ├── useLocalStorage.js     # Hook para localStorage
│   └── index.js               # Barrel exports
├── services/                  # Servicios para APIs
│   ├── apiService.js          # Servicio base para APIs
│   ├── authService.js         # Servicio de autenticación
│   └── index.js               # Barrel exports
├── utils/                     # Funciones utilitarias
│   └── index.js               # Funciones de utilidad
├── constants/                 # Constantes de la aplicación
│   └── index.js               # Rutas, configuraciones, etc.
├── assets/                    # Recursos estáticos
│   ├── images/                # Imágenes
│   ├── icons/                 # Iconos
│   └── fonts/                 # Fuentes
├── App.jsx                    # Componente principal
├── main.jsx                   # Punto de entrada
└── index.css                  # Estilos globales
```

## 📋 Guías de Organización

### 1. **Componentes (`/components`)**
- **ui/**: Componentes básicos y reutilizables (Button, Input, Modal, etc.)
- **layout/**: Componentes de estructura (Header, Footer, Sidebar, etc.)
- **auth/**: Componentes específicos de autenticación
- **feature/**: Componentes específicos de características

### 2. **Páginas (`/pages`)**
- Una página por archivo
- Nombres descriptivos que coincidan con las rutas
- Pueden tener subcarpetas para páginas complejas

### 3. **Hooks (`/hooks`)**
- Custom hooks reutilizables
- Nombres que empiecen con "use"
- Lógica compartida entre componentes

### 4. **Servicios (`/services`)**
- Llamadas a APIs
- Lógica de negocio
- Interacciones con servicios externos

### 5. **Utils (`/utils`)**
- Funciones de utilidad puras
- Helpers y formatters
- Validaciones comunes

### 6. **Constants (`/constants`)**
- Configuraciones
- Rutas de la aplicación
- Valores constantes

## 🎯 Ventajas de Esta Organización

### ✅ **Escalabilidad**
- Fácil agregar nuevas características
- Estructura clara y predecible
- Separación de responsabilidades

### ✅ **Reutilización**
- Componentes UI reutilizables
- Hooks compartidos
- Servicios modulares

### ✅ **Mantenimiento**
- Fácil localizar archivos
- Cambios aislados
- Testing más simple

### ✅ **Colaboración**
- Estructura estándar del equipo
- Convenciones claras
- Onboarding más rápido

## 📦 Barrel Exports (index.js)

Los archivos `index.js` en cada carpeta permiten importaciones más limpias:

```javascript
// En lugar de:
import Button from './components/ui/Button';
import Input from './components/ui/Input';
import Card from './components/ui/Card';

// Puedes hacer:
import { Button, Input, Card } from './components/ui';
```

## 🚀 Próximos Pasos para Escalar

1. **Features por carpetas**: Cuando crezca, organizar por características
2. **Lazy loading**: Componentes cargados dinámicamente
3. **Storybook**: Documentar componentes UI
4. **Testing**: Tests organizados por carpeta
5. **TypeScript**: Tipado para mejor desarrollo

## 📝 Convenciones de Nombres

- **Componentes**: PascalCase (Button.jsx)
- **Hooks**: camelCase con 'use' (useForm.js)
- **Servicios**: camelCase (authService.js)
- **Utils**: camelCase (formatDate.js)
- **Constants**: UPPER_SNAKE_CASE