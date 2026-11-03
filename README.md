# ☕ CHUMI CAFE'S
## Sistema Web de Gestión de Productos e Inventario

**Proyecto:** Trabajo Integrador – Desarrollo de una Aplicación Web Full Stack  
**Estudiante:** Jose David Sotomayor Ore  
**Modalidad:** Proyecto individual  
**Tecnologías:** React, TypeScript, Node.js, Express y MongoDB Atlas

---

## 1. Descripción del proyecto

Chumi Cafe's es una aplicación web Full Stack desarrollada para administrar los productos y el inventario de una cafetería.

El sistema permite registrar, consultar, modificar y eliminar productos mediante una interfaz gráfica conectada a un servidor y una base de datos MongoDB Atlas.

La aplicación cuenta con un panel de administración que muestra los productos registrados, sus fotografías, categorías, precios, descripciones y cantidades disponibles.

## 2. Objetivo

Desarrollar una aplicación web funcional que integre tecnologías de frontend, backend y base de datos, aplicando los conocimientos adquiridos en JavaScript moderno, TypeScript, React, Node.js, Express y MongoDB.

## 3. Tecnologías utilizadas

| Tecnología | Función |
|---|---|
| React | Desarrollo de la interfaz de usuario |
| TypeScript | Tipado de datos y componentes |
| Vite | Entorno de desarrollo del frontend |
| HTML y CSS | Estructura y diseño visual |
| Node.js | Ejecución del servidor backend |
| Express | Creación de la API REST |
| MongoDB Atlas | Almacenamiento de productos |
| Mongoose | Modelado y acceso a MongoDB |
| Visual Studio Code | Entorno de desarrollo |

## 4. Funcionalidades principales

### Gestión de productos (CRUD)

- **Crear:** registrar productos con nombre, categoría, precio, stock, descripción e imagen.
- **Leer:** consultar y visualizar los productos almacenados en MongoDB.
- **Actualizar:** modificar los datos de un producto existente.
- **Eliminar:** eliminar productos mediante una confirmación previa.

### Panel de administración

El dashboard permite visualizar:

- Cantidad total de productos registrados.
- Cantidad total de unidades disponibles en stock.
- Valor económico total del inventario.
- Catálogo de productos con fotografías.
- Formularios para registrar y editar información.
- Mensajes de confirmación y error.

## 5. Arquitectura del sistema

La aplicación utiliza una arquitectura cliente-servidor:

**React + TypeScript → API REST (Node.js + Express) → MongoDB Atlas**

El frontend realiza solicitudes HTTP al backend, que procesa las operaciones y accede a la base de datos.

Los datos se almacenan de forma persistente en MongoDB Atlas.

## 6. Estructura del proyecto

```text
Chumi-Cafes-FullStack/
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── main.tsx
│   └── package.json
│
├── backend/
│   ├── controllers/
│   │   └── productoController.js
│   ├── models/
│   │   └── Producto.js
│   ├── routes/
│   │   └── productoRoutes.js
│   ├── server.js
│   └── package.json
│
├── productos.json
└── README.md
```

## 7. Instalación y ejecución

### Requisitos

- Node.js y npm instalados.
- Visual Studio Code.
- Conexión a Internet.
- Una base de datos MongoDB Atlas configurada.

### Instalar dependencias del backend

Abrir una terminal en la carpeta principal del proyecto y ejecutar:

```powershell
cd backend
npm install
```

### Configurar MongoDB

Crear un archivo `.env` dentro de `backend` con el siguiente contenido:

```env
PORT=3001
MONGO_URI=TU_CADENA_DE_CONEXION_MONGODB
```

Reemplazar el valor de `MONGO_URI` por una cadena de conexión válida de MongoDB Atlas.

No compartir contraseñas ni credenciales reales dentro del proyecto entregado.

### Ejecutar el backend

Desde la carpeta `backend`:

```powershell
node server.js
```

El servidor utiliza el puerto 3001.

### Instalar dependencias del frontend

Abrir otra terminal y ejecutar desde la carpeta principal:

```powershell
cd frontend
npm install
```

### Ejecutar React

Desde la carpeta `frontend`:

```powershell
npm run dev
```

Abrir en el navegador:

http://localhost:5173/

**Importante:** mantener abiertas las terminales del frontend y backend mientras se utiliza la aplicación.

## 8. API REST

El servidor dispone de los siguientes endpoints:

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/productos` | Consultar productos |
| POST | `/api/productos` | Registrar un producto |
| PUT | `/api/productos/:id` | Actualizar un producto |
| DELETE | `/api/productos/:id` | Eliminar un producto |

**Dirección base:** `http://localhost:3001`

## 9. Base de datos MongoDB

**Base de datos:** `chumi_cafes`  
**Colección:** `productos`

Los documentos contienen los siguientes campos principales:

- `nombre`
- `categoria`
- `precio`
- `stock`
- `descripcion`
- `imagen`

Las categorías utilizadas son Café, Bebida, Postre y Sándwich.

El archivo `productos.json` contiene una exportación de los datos de prueba y puede importarse en una colección MongoDB para realizar demostraciones.

## 10. Pruebas realizadas

Se realizaron pruebas de las operaciones principales del sistema:

| Operación | Resultado |
|---|---|
| Registrar producto | Correcto |
| Consultar productos | Correcto |
| Actualizar precio | Correcto |
| Eliminar producto con confirmación | Correcto |
| Persistencia de datos en MongoDB | Correcto |

Las operaciones se comprobaron desde la aplicación web y mediante la visualización de los documentos en MongoDB Atlas.

## 11. Relación con los temas del curso

- **T01 – JavaScript moderno:** funciones, arreglos, objetos, métodos de arreglos, módulos y operaciones asíncronas.
- **T02 – TypeScript:** interfaces y tipado de los datos de productos.
- **T03 – React:** interfaz gráfica, componentes y Hooks como `useState` y `useEffect`.
- **T04 – Formularios y APIs:** formularios controlados, validaciones y solicitudes HTTP mediante `fetch`.
- **T05 – Node.js y Express:** servidor web, rutas, controladores y API REST.
- **T06 – MongoDB:** conexión a MongoDB Atlas y almacenamiento persistente de los productos.

## 12. Conclusiones

El desarrollo de Chumi Cafe's permitió integrar las tecnologías utilizadas en el curso mediante una aplicación web funcional.

Se implementó un sistema de gestión de productos con operaciones CRUD y almacenamiento persistente en MongoDB Atlas.

El proyecto demuestra la comunicación entre frontend, backend y base de datos, así como el uso de React, TypeScript, Node.js y Express para resolver una necesidad de administración de inventario.

---

**Autor:** Jose David Sotomayor Ore  
**Proyecto:** Chumi Cafe's – Sistema de Gestión de Productos e Inventario