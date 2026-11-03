
const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },

    categoria: {
      type: String,
      required: true,
      enum: ["Cafe", "Bebida", "Postre", "Sandwich"]
    },

    precio: {
      type: Number,
      required: true,
      min: 0.01
    },

    stock: {
      type: Number,
      required: true,
      min: 0
    },

    descripcion: {
      type: String,
      default: ""
    },

    // Imagen del producto
    imagen: {
      type: String,
      default: "",
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Producto", productoSchema);
