
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

const protegerRuta = async (req, res, next) => {
  try {
    const autorizacion = req.headers.authorization;

    if (!autorizacion || !autorizacion.startsWith("Bearer ")) {
      return res.status(401).json({
        mensaje: "Acceso denegado. Token requerido"
      });
    }

    const token = autorizacion.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
      { algorithms: ["HS256"] }
    );

    const usuario = await Usuario.findById(decoded.id);

    if (!usuario) {
      return res.status(401).json({
        mensaje: "Usuario no autorizado"
      });
    }

    req.usuario = usuario;
    next();

  } catch (error) {
    if (error.name === "JsonWebTokenError" ||
        error.name === "TokenExpiredError") {
      return res.status(401).json({
        mensaje: "Token inválido o expirado"
      });
    }

    console.error("Error de autenticación:", error);
    return res.status(500).json({
      mensaje: "Error interno de autenticación"
    });
  }
};

module.exports = { protegerRuta };

