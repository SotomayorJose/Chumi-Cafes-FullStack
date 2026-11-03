
const express = require("express");
const router = express.Router();

const {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} = require("../controllers/productoController");

// Middleware de autenticación JWT
const { protegerRuta } = require("../middleware/authMiddleware");

// Consultar productos (ruta pública)
router.get("/", obtenerProductos);

// Crear producto (requiere iniciar sesión)
router.post("/", protegerRuta, crearProducto);

// Actualizar producto (requiere iniciar sesión)
router.put("/:id", protegerRuta, actualizarProducto);

// Eliminar producto (requiere iniciar sesión)
router.delete("/:id", protegerRuta, eliminarProducto);

module.exports = router;
