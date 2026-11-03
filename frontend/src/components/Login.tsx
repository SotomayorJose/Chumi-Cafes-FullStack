
import { useState } from "react";
import type { FormEvent } from "react";

interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: string;
}

interface RespuestaLogin {
  mensaje: string;
  token: string;
  usuario: Usuario;
}

interface LoginProps {
  onLogin: (datos: RespuestaLogin) => void;
}

function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const iniciarSesion = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      setError("Completa todos los campos.");
      return;
    }

    try {
      setCargando(true);
      setError("");

      const respuesta = await fetch(
        "http://localhost:3001/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email.trim(),
            password
          })
        }
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          datos.mensaje || "No se pudo iniciar sesión"
        );
      }

      if (!datos.token || !datos.usuario) {
        throw new Error("Respuesta de autenticación inválida");
      }

      onLogin(datos as RespuestaLogin);

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error al conectar con el servidor"
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-pagina">
      <div className="login-tarjeta">
        <div className="login-logo">☕</div>

        <h1>CHUMI CAFE'S</h1>
        <p>Panel de administración</p>

        <form onSubmit={iniciarSesion}>
          <label htmlFor="login-email">
            Correo electrónico
          </label>

          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@chumicafes.com"
            autoComplete="username"
            required
          />

          <label htmlFor="login-password">
            Contraseña
          </label>

          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            autoComplete="current-password"
            required
          />

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" disabled={cargando}>
            {cargando ? "Ingresando..." : "Iniciar sesión"}
          </button>
        </form>

        <small>CHUMI CAFE'S © 2026</small>
      </div>

      <style>{`
        .login-pagina {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #f6eee5, #e6d2bd);
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .login-tarjeta {
          background: white;
          padding: 42px 35px;
          border-radius: 20px;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 15px 40px rgba(60, 35, 20, 0.12);
          text-align: center;
        }

        .login-logo {
          font-size: 48px;
          margin-bottom: 12px;
        }

        .login-tarjeta h1 {
          color: #67432e;
          margin-bottom: 8px;
        }

        .login-tarjeta p {
          color: #806b5a;
          margin-bottom: 28px;
        }

        .login-tarjeta form {
          display: flex;
          flex-direction: column;
          text-align: left;
          gap: 10px;
        }

        .login-tarjeta label {
          color: #493020;
          font-weight: 600;
          font-size: 14px;
        }

        .login-tarjeta input {
          padding: 13px;
          border: 1px solid #d8c9bc;
          border-radius: 9px;
          font-size: 15px;
          margin-bottom: 10px;
          background: white;
          color: #30251e;
        }

        .login-tarjeta input:focus {
          outline: 2px solid #a67c52;
          outline-offset: 1px;
        }

        .login-tarjeta button {
          padding: 14px;
          background: #70462f;
          color: white;
          border: none;
          border-radius: 9px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
        }

        .login-tarjeta button:hover {
          background: #593521;
        }

        .login-tarjeta button:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .login-tarjeta .login-error {
          color: #b42318;
          font-size: 13px;
          margin: 0 0 10px;
        }

        .login-tarjeta small {
          display: block;
          margin-top: 25px;
          color: #999;
        }
      `}</style>
    </div>
  );
}

export default Login;
