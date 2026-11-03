
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generar token JWT
const generarToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// REGISTRAR USUARIO
const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({
        mensaje: "Todos los campos son obligatorios"
      });
    }

    if (typeof nombre !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string" ||
        !email.includes("@") ||
        password.length < 8) {
      return res.status(400).json({
        mensaje: "Datos inválidos. La contraseña debe tener al menos 8 caracteres"
      });
    }

    const correo = email.trim().toLowerCase();

    const existeUsuario = await Usuario.findOne({
      email: correo
    });

    if (existeUsuario) {
      return res.status(400).json({
        mensaje: "El correo ya está registrado"
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const usuario = await Usuario.create({
      nombre: nombre.trim(),
      email: correo,
      password: passwordHash
    });

    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      },
      token: generarToken(usuario._id)
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        mensaje: "El correo ya está registrado"
      });
    }

    console.error(error);
    res.status(500).json({
      mensaje: "Error al registrar usuario"
    });
  }
};

// INICIAR SESIÓN
const iniciarSesion = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== "string" ||
        typeof password !== "string" ||
        !email.trim() || !password) {
      return res.status(400).json({
        mensaje: "Correo y contraseña obligatorios"
      });
    }

    const usuario = await Usuario.findOne({
      email: email.trim().toLowerCase()
    }).select("+password");

    if (!usuario) {
      return res.status(401).json({
        mensaje: "Credenciales incorrectas"
      });
    }

    const passwordCorrecta = await bcrypt.compare(
      password,
      usuario.password
    );

    if (!passwordCorrecta) {
      return res.status(401).json({
        mensaje: "Credenciales incorrectas"
      });
    }

    res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      },
      token: generarToken(usuario._id)
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al iniciar sesión"
    });
  }
};

module.exports = {
  registrarUsuario,
  iniciarSesion
};
