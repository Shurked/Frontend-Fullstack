# React Frontend - FullStack Project

Este es un proyecto de React configurado con Vite, Tailwind CSS, React Router DOM y un sistema de autenticación completo.

## Características

- ⚛️ **React 18** con Vite para desarrollo rápido
- 🎨 **Tailwind CSS** para styling
- 🧭 **React Router DOM** para navegación
- 🔐 **Sistema de autenticación** con Context API
- 🛡️ **Rutas protegidas**
- 📱 **Diseño responsive**

## Estructura del Proyecto

```
src/
├── components/
│   └── ProtectedRoute.jsx    # Componente para rutas protegidas
├── context/
│   └── AuthContext.jsx       # Context para autenticación
├── pages/
│   ├── LandingPage.jsx       # Página de inicio
│   ├── Login.jsx             # Página de login
│   ├── Register.jsx          # Página de registro
│   └── Dashboard.jsx         # Dashboard protegido
├── App.jsx                   # Componente principal
├── main.jsx                  # Punto de entrada
└── index.css                 # Estilos Tailwind
```

## Rutas Disponibles

- `/` - Landing Page (página principal)
- `/login` - Página de inicio de sesión
- `/register` - Página de registro
- `/dashboard` - Dashboard (ruta protegida)

## Flujo de Navegación

1. **Landing Page** (`/`) - Punto de entrada con enlaces a login y register
2. **Login** (`/login`) - Formulario de inicio de sesión con enlace a register
3. **Register** (`/register`) - Formulario de registro con enlace a login
4. **Dashboard** (`/dashboard`) - Área protegida que requiere autenticación

## Sistema de Autenticación

- Utiliza Context API para manejar el estado de autenticación
- Persistencia de sesión con localStorage
- Rutas protegidas que redirigen a login si no hay usuario autenticado
- Función de logout que limpia el estado y redirige al inicio

## Instalación y Uso

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Compilar para producción:**
   ```bash
   npm run build
   ```

4. **Preview de la compilación:**
   ```bash
   npm run preview
   ```

## Tecnologías Utilizadas

- **Vite** - Build tool y servidor de desarrollo
- **React** - Biblioteca de JavaScript para UI
- **React Router DOM** - Enrutamiento del lado del cliente
- **Tailwind CSS** - Framework de CSS utility-first
- **PostCSS** - Procesador de CSS

## Notas de Desarrollo

- El proyecto está configurado solo con JavaScript (no TypeScript)
- La autenticación es simulada (no hay backend real)
- Los estilos utilizan las clases de Tailwind CSS
- Las rutas están protegidas mediante el componente `ProtectedRoute`

## Próximos Pasos

- Integrar con una API backend real
- Implementar validación de formularios más robusta
- Agregar más páginas al dashboard
- Implementar refresh tokens
- Agregar tests unitarios+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
