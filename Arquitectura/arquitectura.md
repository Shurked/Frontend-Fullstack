# Propuesta de Arquitectura: Screaming Architecture para Frontend-Fullstack

Resumen:
Este proyecto es una aplicación frontend React (Vite) que actúa como sistema de gestión de proyectos (tipo Jira/Slack) con área pública (Landing) y área privada (aplicación con autenticación y rutas protegidas). Se propone aplicar la Screaming Architecture para que la estructura del repositorio "grite" el propósito del proyecto y para facilitar escalabilidad y mantenibilidad.

Índice
- Objetivo y premisas
- Estructura de carpetas propuesta
- Contrato mínimo por capa (inputs/outputs)
- Convenciones (naming, tests, estilos)
- Integración con Vite, Tailwind y Context/API
- Checklist de migración
- Tareas siguientes y notas

## Objetivo y premisas
- Aplicación React (Vite) con: Landing público, autenticación, rutas protegidas, panel principal (dashboard), chat/colaboración y gestión de proyectos (issues/tasks).
- Usaremos Screaming Architecture: la raíz del proyecto debe mostrar la intención (por ejemplo "project-management-app").
- Separación clara entre "features" y "shared".
- Organización por características (feature folders) para que cada parte del dominio contenga sus componentes, hooks, estilos, tests y subrutas.

## Estructura de carpetas propuesta
La siguiente estructura está pensada para crecer por funcionalidades y mantener aisladas las dependencias internas de cada feature.

/
- public/
- src/
  - app/
    - root.jsx                 # punto de montaje y Providers globales (Router, Theme, ErrorBoundary)
    - routes.jsx               # definición de rutas (públicas, privadas)
    - store/                   # si se usa state global centralizado (opcional)
  - features/
    - auth/
      - api.js                 # llamadas API específicas de auth
      - components/            # LoginForm, RegisterForm, ProtectedRoute (si es local a auth)
      - hooks/                 # useAuthForm, etc
      - routes.jsx             # rutas relacionadas con auth (login/register)
      - auth.slice.js          # si usas Redux/RTK o dominio local state
      - index.js               # export público de la feature
    - landing/
      - LandingPage.jsx
      - components/
      - styles.module.css
      - index.js
    - dashboard/
      - components/
      - pages/
      - hooks/
      - services/
      - index.js
    - projects/
      - components/
      - pages/
      - services/
      - models/                # interfaces/types de dominio (Task, Project, Comment)
      - index.js
    - chat/
      - components/
      - pages/
      - socket.js
      - index.js
  - shared/
    - ui/                      # Button, Input, Modal, Card, etc. (UI primitives)
    - components/              # Layouts: MainLayout, AuthLayout, Navbar
    - hooks/                   # useFetch, useLocalStorage, useForm (reusable)
    - services/                # apiService.js, authService.js (wrappers fetch/axios)
    - lib/                     # helpers utilitarios y formatos (date, money)
    - styles/                  # tokens tailwind (si usas CSS variables)
    - constants/               # rutas, mensajes, environment keys
    - types/                   # tipos TypeScript si se migra a TS
  - context/
    - AuthContext.jsx
    - ThemeContext.jsx
  - pages/                     # (opcional) pages individuales si no están en features
  - assets/
  - index.css
  - main.jsx
  - App.jsx
- Arquitectura/                # documentación de arquitectura (este archivo)
- package.json
- tailwind.config.js
- postcss.config.js

## Por qué esta estructura (beneficios)
- Scalability: agregar nuevas features no rompe la organización.
- Encapsulación: cada feature tiene sus propios tests y dependencias.
- Discoverability: la raíz del proyecto describe el propósito y las features dominantes.
- Re-usable UI: `shared/ui` contiene primitives usados por todas las features.

## Contrato mínimo por capa
- Features exportan un `index.js` con el router (o sub-routes), exports de hooks públicos y servicios.
- `shared/services/apiService.js` debe exponer una instancia de fetch/axios con interceptors (bearer token) y métodos básicos: get/post/put/delete.
- `AuthContext` debe exponer: user, token, login(credentials), logout(), loading, isAuthenticated().

## Convenciones sugeridas
- Nombres: kebab-case para archivos, PascalCase para componentes React.
- CSS: preferir Tailwind utility-first + módulos CSS para casos específicos.
- Tests: cada feature con carpeta `__tests__` o `*.test.jsx`. Usar Vitest + Testing Library.
- Lint/Format: ESLint (config extendido), Prettier.

## Integración con Vite y Tailwind
- Mantén `index.css` con las directivas `@tailwind base; @tailwind components; @tailwind utilities;` y variables globales en `:root` o `shared/styles`.
- `tailwind.config.js` debe incluir `./index.html` y `./src/**/*.{js,jsx}` en `content`.

## Checklist de migración (pasos prácticos)
1. Crear carpetas `src/features` y `src/shared`.
2. Mover `pages/*.jsx` a `src/features/landing` y `src/features/auth`.
3. Extraer `Navbar`, `Layouts` a `src/shared/components`.
4. Implementar `AuthContext` en `src/context/AuthContext.jsx`.
5. Crear `src/app/routes.jsx` con `react-router-dom` y `ProtectedRoute` que use `AuthContext`.
6. Añadir testing con Vitest: `npm i -D vitest @testing-library/react`.
7. Ajustar `tailwind.config.js` y `postcss.config.js` si es necesario.

## Estándares y ejemplos rápidos
- `ProtectedRoute.jsx` (pseudo):

  - Revisa `AuthContext` y si no autenticado hace `navigate('/login')`.

- `apiService.js`:
  - export const api = axios.create({ baseURL, timeout });
  - api.interceptors.request.use(add token);

## Tareas siguientes y notas
- Migración a TypeScript (opcional) para seguridad en modelos.
- Añadir Storybook para componentes UI.
- Revisión de CI: añadir tests, lint y build en pipeline.

---

### Anexo: Estructura sugerida con ejemplos de archivos a crear
- src/app/root.jsx  (Providers)
- src/app/routes.jsx
- src/context/AuthContext.jsx
- src/features/auth/Login.jsx
- src/features/landing/LandingPage.jsx
- src/shared/ui/Button.jsx
- src/shared/components/MainLayout.jsx


---

Si quieres, puedo:
- generar los archivos y mover las páginas actuales a la estructura propuesta, o
- crear plantillas (stubs) para `AuthContext`, `ProtectedRoute`, `apiService` y `routes.jsx`.

Dime cuál prefieres y lo implemento en el repo (mover/crear archivos).