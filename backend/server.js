
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const conectarDB = require("./config/db");
const productoRoutes = require("./routes/productoRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Ruta principal
app.get("/api", (req, res) => {
  res.status(200).json({
    mensaje: "Bienvenido a Chumi Cafe's ☕",
    estado: "Servidor funcionando correctamente"
  });
});

// Ruta de prueba
app.get("/api/productos/prueba", (req, res) => {
  res.status(200).json({
    mensaje: "Ruta de productos funcionando correctamente"
  });
});

// Rutas de autenticación
app.use("/api/auth", authRoutes);

// CRUD de productos
app.use("/api/productos", productoRoutes);

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({
    mensaje: "Ruta no encontrada"
  });
});

// Manejo general de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    mensaje: "Error interno del servidor"
  });
});

const PORT = process.env.PORT || 3001;

const iniciarServidor = async () => {
  try {
    await conectarDB();

    app.listen(PORT, () => {
      console.log("================================");
      console.log("☕ CHUMI CAFE'S - FULL STACK");
      console.log(`Servidor: http://localhost:${PORT}`);
      console.log("================================");
    });
  } catch (error) {
    console.error("Error al iniciar servidor:", error.message);
    process.exit(1);
  }
};

iniciarServidor();
