
const Producto = require("../models/Producto");

// OBTENER TODOS LOS PRODUCTOS
exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// CREAR PRODUCTO
exports.crearProducto = async (req, res) => {
  try {
    const producto = await Producto.create(req.body);
    res.status(201).json(producto);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// ACTUALIZAR PRODUCTO
exports.actualizarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado"
      });
    }

    res.json(producto);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// ELIMINAR PRODUCTO
exports.eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado"
      });
    }

    res.json({
      mensaje: "Producto eliminado correctamente"
    });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};
