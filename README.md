# Desserts

SPA de una tienda de postres desarrollada como prueba técnica Frontend. Incluye catálogo, búsqueda y filtrado contra una API local, detalle de productos, carrito persistente y una interfaz administrativa con CRUD completo.

## Tecnologías

- React 19, Vite y JavaScript con tipos documentados mediante JSDoc.
- Tailwind CSS para estilos y diseño responsive.
- React Router para navegación del lado del cliente.
- Axios y TanStack Query para consumo, caché y sincronización de datos.
- Zustand con middleware `persist` para el carrito.
- React Hook Form y Zod para formularios y validaciones.
- Sonner para notificaciones.
- json-server como API REST local.

## Requisitos previos

- Node.js 20 o una versión LTS reciente.
- npm.
- Git, si se desea clonar el repositorio.

## Instalación

```bash
git clone <URL_DEL_REPOSITORIO>
cd prueba-tecnica-desserts
npm install
```

## Ejecución local

La aplicación necesita dos procesos activos. Abre dos terminales en la raíz del proyecto.

Terminal 1 — API local:

```bash
npm run server
```

La API estará disponible en `http://localhost:3000`.

Terminal 2 — Frontend:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

## Scripts disponibles

| Script | Descripción |
| --- | --- |
| `npm run dev` | Inicia Vite en modo desarrollo. |
| `npm run server` | Inicia json-server con `db.json` en el puerto 3000. |
| `npm run build` | Genera la versión optimizada de producción en `dist/`. |
| `npm run preview` | Sirve localmente el build de producción. |
| `npm run lint` | Ejecuta ESLint sobre el proyecto. |

## Rutas de la aplicación

| Ruta | Vista |
| --- | --- |
| `/` | Catálogo, búsqueda, filtros, paginación y carrito. |
| `/producto/:id` | Detalle de un producto y manejo de producto inexistente. |
| `/admin/productos` | Administración para crear, editar y eliminar productos. |

## Arquitectura

```text
src/
├── components/   Componentes visuales reutilizables
├── hooks/        Queries, mutaciones y hooks de categorías
├── interfaces/   Contratos de productos, filtros y categorías
├── pages/        Vistas asociadas a las rutas
├── routes/       Configuración centralizada de React Router
├── schemas/      Esquemas de validación con Zod
├── services/     Cliente Axios y operaciones de la API
├── stores/       Estado global y persistente del carrito
├── App.jsx       Entrada de las rutas de la aplicación
└── main.jsx      Proveedores globales y sistema de notificaciones
```

La separación por responsabilidades mantiene la UI independiente de la capa de datos. Las páginas consumen hooks; los hooks coordinan TanStack Query; y los servicios concentran las solicitudes HTTP.

## Funcionamiento de la API local

El archivo `db.json` contiene dos recursos:

- `products`: productos con `id`, `name`, `price`, `categoryId` e `image`.
- `categories`: categorías con `id` y `name`.

Endpoints principales:

| Método | Endpoint | Uso |
| --- | --- | --- |
| `GET` | `/products` | Lista productos. |
| `GET` | `/products/:id` | Obtiene el detalle de un producto. |
| `POST` | `/products` | Crea un producto. |
| `PUT` | `/products/:id` | Actualiza un producto. |
| `DELETE` | `/products/:id` | Elimina un producto. |
| `GET` | `/categories` | Lista las categorías. |

El listado envía `_page` y `_per_page=8` para paginar. La búsqueda utiliza `name:contains` y el filtro envía `categoryId`, por lo que ambas operaciones se realizan contra json-server y no únicamente en memoria. Las consultas del catálogo incorporan un delay artificial de aproximadamente 1.2 segundos para visualizar los skeletons.

Después de crear, editar o eliminar, las mutaciones invalidan la query key `['products']` para sincronizar automáticamente el catálogo. Los errores y resultados exitosos se comunican mediante notificaciones visuales.

## Decisiones técnicas

- **TanStack Query:** administra caché, loading, errores, reintentos e invalidación después de mutaciones.
- **Axios centralizado:** `apiClient` define `http://localhost:3000` como URL base y evita repetir configuración.
- **Hooks personalizados:** `useProductsQueries` y `useProductsMutations` aíslan la lógica de servidor de las vistas.
- **Formulario reutilizable:** el mismo componente sirve para crear y editar, utilizando `defaultValues` en edición.
- **Validación con Zod:** centraliza reglas para nombre, precio, categoría e imagen.
- **Zustand persistente:** conserva productos y cantidades del carrito en `localStorage` bajo la clave `desserts-cart`.
- **Categorías relacionadas:** los productos almacenan `categoryId` y la UI presenta el nombre mediante badges.
- **SPA responsive:** el catálogo usa una columna en mobile y tres columnas desde el breakpoint `md`.

## Build y deploy en Vercel

Antes de desplegar, verifica el build:

```bash
npm run build
```

La configuración de `vercel.json` reescribe las rutas hacia `index.html`, permitiendo recargar directamente `/producto/:id` o `/admin/productos` sin recibir un 404 de Vercel.

Configuración esperada en Vercel:

- Build command: `npm run build`
- Output directory: `dist`
- Framework preset: Vite

> **Importante:** el proyecto tiene prohibido consumir APIs online. Por eso, el deploy publica únicamente el frontend; `json-server` continúa siendo una API local en `http://localhost:3000`. El catálogo dinámico y el CRUD requieren ejecutar `npm run server` localmente. Para un deploy completamente funcional sería necesario autorizar y configurar una API accesible desde producción, lo cual está fuera del alcance de esta prueba.

## Funcionalidades principales

- Catálogo responsive con skeletons, estados de error y estado vacío.
- Búsqueda por nombre, filtro por categoría y paginación desde la API.
- Detalle de producto con vista 404 amigable.
- Carrito funcional y persistente con cálculo de cantidades y total.
- Confirmación de orden y vaciado del carrito.
- CRUD de productos con validación y confirmación antes de eliminar.
- Notificaciones de éxito y error.
