
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Login from "./components/Login";
import "./App.css";

interface Producto {
  _id: string;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  descripcion: string;
  imagen?: string;
}

interface FormularioProducto {
  nombre: string;
  categoria: string;
  precio: string;
  stock: string;
  descripcion: string;
  imagen: string;
}

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

const API = "http://localhost:3001/api/productos";

const imagenesProductos: Record<string, string> = {
  "Capuchino Clasico":
    "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600",
  "Cafe Americano":
    "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=600",
  "Espresso Doble":
    "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600",
  "Cafe Latte":
    "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600",
  "Mocaccino":
    "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600",
  "Caramel Macchiato":
    "https://unsplash.com/photos/Edmcnx3LLsM/download?w=600",
  "Frappe de Vainilla":
    "https://unsplash.com/photos/7oDmMCXZZpY/download?w=600",
  "Frappe de Chocolate":
    "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600",
  "Limonada Frozen":
    "https://images.unsplash.com/photo-1513558161293-cdaf765edfd4?w=600",
  "Jugo de Fresa":
    "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=600",
  "Cheesecake de Fresa":
    "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600",
  "Brownie de Chocolate":
    "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600",
  "Torta de Chocolate":
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600",
  "Croissant de Mantequilla":
    "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600",
  "Sandwich Mixto":
    "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600",
  "Sandwich de Pollo":
    "https://unsplash.com/photos/PcXZtTcRNvY/download?w=600",
};

const formularioInicial: FormularioProducto = {
  nombre: "",
  categoria: "Cafe",
  precio: "",
  stock: "",
  descripcion: "",
  imagen: "",
};

function obtenerIcono(categoria: string) {
  switch (categoria) {
    case "Cafe":
      return "☕";
    case "Bebida":
      return "🥤";
    case "Postre":
      return "🍰";
    case "Sandwich":
      return "🥪";
    default:
      return "🍽️";
  }
}

function App() {
  const [sesion, setSesion] = useState<RespuestaLogin | null>(null);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditando, setProductoEditando] = useState<string | null>(null);
  const [formulario, setFormulario] = useState<FormularioProducto>({
    ...formularioInicial,
  });

  const iniciarSesion = (datos: RespuestaLogin) => {
    setSesion(datos);
    setError("");
    setMensaje("");
    setCargando(true);
  };

  const cerrarSesion = () => {
    setSesion(null);
    setProductos([]);
    setMostrarFormulario(false);
    setProductoEditando(null);
    setFormulario({ ...formularioInicial });
    setError("");
    setMensaje("");
    setCargando(true);
  };

  const cargarProductos = async () => {
    try {
      setError("");

      const respuesta = await fetch(API);

      if (!respuesta.ok) {
        throw new Error("No se pudieron cargar los productos");
      }

      const datos: Producto[] = await respuesta.json();
      setProductos(datos);
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

  useEffect(() => {
    if (sesion) {
      cargarProductos();
    }
  }, [sesion]);

  const abrirNuevoProducto = () => {
    setFormulario({ ...formularioInicial });
    setProductoEditando(null);
    setError("");
    setMensaje("");
    setMostrarFormulario(true);
  };

  const abrirEditarProducto = (producto: Producto) => {
    setFormulario({
      nombre: producto.nombre,
      categoria: producto.categoria,
      precio: String(producto.precio),
      stock: String(producto.stock),
      descripcion: producto.descripcion || "",
      imagen: producto.imagen || "",
    });

    setProductoEditando(producto._id);
    setError("");
    setMensaje("");
    setMostrarFormulario(true);
  };

  const cerrarFormulario = () => {
    if (guardando) return;

    setMostrarFormulario(false);
    setProductoEditando(null);
    setFormulario({ ...formularioInicial });
  };

  const guardarProducto = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!sesion) {
      setError("Debes iniciar sesión.");
      return;
    }

    const precio = Number(formulario.precio);
    const stock = Number(formulario.stock);

    if (!formulario.nombre.trim()) {
      setError("El nombre del producto es obligatorio.");
      return;
    }

    if (
      formulario.precio.trim() === "" ||
      !Number.isFinite(precio) ||
      precio <= 0
    ) {
      setError("Ingresa un precio válido mayor que cero.");
      return;
    }

    if (
      formulario.stock.trim() === "" ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      setError(
        "El stock debe ser un número entero mayor o igual a cero."
      );
      return;
    }

    const datos = {
      nombre: formulario.nombre.trim(),
      categoria: formulario.categoria,
      precio,
      stock,
      descripcion: formulario.descripcion.trim(),
      imagen: formulario.imagen.trim(),
    };

    try {
      setGuardando(true);
      setError("");
      setMensaje("");

      const url = productoEditando
        ? `${API}/${productoEditando}`
        : API;

      const respuesta = await fetch(url, {
        method: productoEditando ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sesion.token}`,
        },
        body: JSON.stringify(datos),
      });

      const resultado = await respuesta.json();

      if (respuesta.status === 401) {
        cerrarSesion();
        throw new Error("Tu sesión expiró. Inicia sesión nuevamente.");
      }

      if (!respuesta.ok) {
        throw new Error(
          resultado.mensaje || "No se pudo guardar el producto"
        );
      }

      const estabaEditando = Boolean(productoEditando);

      setMostrarFormulario(false);
      setProductoEditando(null);
      setFormulario({ ...formularioInicial });

      setMensaje(
        estabaEditando
          ? "Producto actualizado correctamente."
          : "Producto registrado correctamente."
      );

      await cargarProductos();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error al guardar el producto"
      );
    } finally {
      setGuardando(false);
    }
  };

  const eliminarProducto = async (producto: Producto) => {
    if (!sesion) {
      setError("Debes iniciar sesión.");
      return;
    }

    const confirmar = window.confirm(
      `¿Estás seguro de eliminar "${producto.nombre}"?`
    );

    if (!confirmar) return;

    try {
      setError("");
      setMensaje("");

      const respuesta = await fetch(`${API}/${producto._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sesion.token}`,
        },
      });

      const resultado = await respuesta.json();

      if (respuesta.status === 401) {
        cerrarSesion();
        throw new Error("Tu sesión expiró. Inicia sesión nuevamente.");
      }

      if (!respuesta.ok) {
        throw new Error(resultado.mensaje || "No se pudo eliminar");
      }

      setMensaje("Producto eliminado correctamente.");
      await cargarProductos();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error al eliminar el producto"
      );
    }
  };

  const totalProductos = productos.length;

  const stockTotal = productos.reduce(
    (total, producto) => total + producto.stock,
    0
  );

  const valorInventario = productos.reduce(
    (total, producto) =>
      total + producto.precio * producto.stock,
    0
  );

  if (!sesion) {
    return <Login onLogin={iniciarSesion} />;
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <h1>☕ Chumi Cafe's</h1>
        <p>Panel de administración</p>

        <nav>
          <a href="#dashboard">📊 Dashboard</a>
          <a href="#productos">☕ Productos</a>
        </nav>
      </aside>

      <main className="contenido" id="dashboard">
        <header className="encabezado">
          <div>
            <h2>Panel de control</h2>
            <p>Gestiona los productos de tu cafetería</p>
          </div>

          <div className="sesion-controles">
            <span className="administrador">
              {sesion.usuario.nombre}
            </span>

            <button
              type="button"
              className="btn-cerrar-sesion"
              onClick={cerrarSesion}
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        <section className="estadisticas">
          <div className="tarjeta">
            <h3>Productos registrados</h3>
            <strong>{totalProductos}</strong>
          </div>

          <div className="tarjeta">
            <h3>Unidades en stock</h3>
            <strong>{stockTotal}</strong>
          </div>

          <div className="tarjeta">
            <h3>Valor del inventario</h3>
            <strong>S/ {valorInventario.toFixed(2)}</strong>
          </div>
        </section>

        <section className="seccion-productos" id="productos">
          <div className="productos-encabezado">
            <div>
              <h2>☕ Nuestros productos</h2>
              <p>Inventario conectado con MongoDB Atlas</p>
            </div>

            <button
              className="btn-agregar"
              onClick={abrirNuevoProducto}
            >
              + Agregar producto
            </button>
          </div>

          {mensaje && <p className="mensaje-exito">{mensaje}</p>}
          {error && <p className="error">{error}</p>}
          {cargando && <p>Cargando productos...</p>}

          {!cargando && !error && productos.length === 0 && (
            <p>No hay productos registrados.</p>
          )}

          <div className="productos-grid">
            {productos.map((producto) => {
              const imagen =
                producto.imagen ||
                imagenesProductos[producto.nombre];

              return (
                <article className="producto" key={producto._id}>
                  <div className="producto-icono producto-imagen">
                    <span className="producto-emoji">
                      {obtenerIcono(producto.categoria)}
                    </span>

                    {imagen && (
                      <img
                        src={imagen}
                        alt={producto.nombre}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    )}
                  </div>

                  <span className="categoria">
                    {producto.categoria}
                  </span>

                  <h3>{producto.nombre}</h3>
                  <p>{producto.descripcion}</p>

                  <div className="producto-footer">
                    <strong>S/ {producto.precio.toFixed(2)}</strong>
                    <span>Stock: {producto.stock}</span>
                  </div>

                  <div className="producto-acciones">
                    <button
                      className="btn-editar"
                      onClick={() => abrirEditarProducto(producto)}
                    >
                      ✏️ Editar
                    </button>

                    <button
                      className="btn-eliminar"
                      onClick={() => eliminarProducto(producto)}
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      {mostrarFormulario && (
        <div className="modal-fondo">
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-formulario"
          >
            <div className="modal-encabezado">
              <h2 id="titulo-formulario">
                {productoEditando
                  ? "Editar producto"
                  : "Agregar producto"}
              </h2>

              <button
                className="btn-cerrar"
                onClick={cerrarFormulario}
                disabled={guardando}
                aria-label="Cerrar formulario"
              >
                ✕
              </button>
            </div>

            <form onSubmit={guardarProducto}>
              <label>Nombre del producto</label>
              <input
                type="text"
                value={formulario.nombre}
                onChange={(e) =>
                  setFormulario({
                    ...formulario,
                    nombre: e.target.value,
                  })
                }
                placeholder="Ejemplo: Café Americano"
                required
              />

              <label>Categoría</label>
              <select
                value={formulario.categoria}
                onChange={(e) =>
                  setFormulario({
                    ...formulario,
                    categoria: e.target.value,
                  })
                }
              >
                <option value="Cafe">Café</option>
                <option value="Bebida">Bebida</option>
                <option value="Postre">Postre</option>
                <option value="Sandwich">Sándwich</option>
              </select>

              <div className="form-fila">
                <div>
                  <label>Precio (S/)</label>
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={formulario.precio}
                    onChange={(e) =>
                      setFormulario({
                        ...formulario,
                        precio: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <label>Stock</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={formulario.stock}
                    onChange={(e) =>
                      setFormulario({
                        ...formulario,
                        stock: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <label>Descripción</label>
              <textarea
                rows={3}
                value={formulario.descripcion}
                onChange={(e) =>
                  setFormulario({
                    ...formulario,
                    descripcion: e.target.value,
                  })
                }
                placeholder="Describe el producto..."
              />

              <label>URL de la imagen</label>
              <input
                type="url"
                value={formulario.imagen}
                onChange={(e) =>
                  setFormulario({
                    ...formulario,
                    imagen: e.target.value,
                  })
                }
                placeholder="https://ejemplo.com/imagen.jpg"
              />

              {error && <p className="error">{error}</p>}

              <div className="form-botones">
                <button
                  type="button"
                  className="btn-cancelar"
                  onClick={cerrarFormulario}
                  disabled={guardando}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="btn-guardar"
                  disabled={guardando}
                >
                  {guardando
                    ? "Guardando..."
                    : productoEditando
                    ? "Guardar cambios"
                    : "Registrar producto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .producto-imagen {
          width: 100%;
          height: 190px;
          border-radius: 14px;
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f4e9dc;
          padding: 0;
          margin-bottom: 16px;
        }

        .producto-imagen .producto-emoji {
          font-size: 55px;
        }

        .producto-imagen img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }

        .producto:hover .producto-imagen img {
          transform: scale(1.05);
        }

        .sesion-controles {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn-cerrar-sesion {
          background: #70462f;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 10px 15px;
          cursor: pointer;
          font-weight: 600;
        }

        .btn-cerrar-sesion:hover {
          background: #593521;
        }

        @media (max-width: 600px) {
          .producto-imagen {
            height: 170px;
          }

          .sesion-controles {
            margin-top: 12px;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
