import { useState } from "react";
import { iniciarSesion } from "../services/authService";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setCargando(true);

    try {
      const data = await iniciarSesion(username, password);
      onLogin(data);
    } catch (error) {
      console.error(error);
      setError("Usuario o contraseña incorrectos.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        {/* ICONO */}
        <div className="login-icon">
          🚚
        </div>

        {/* TITULO */}
        <div className="login-header">
          <h1>Bienvenido</h1>

          <p>
            Ingresa a tu cuenta de Mudanzas
          </p>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="login-form">

          {/* USUARIO */}
          <div className="form-group">

            <label htmlFor="username">
              Usuario
            </label>

            <div className="input-container">

              <span className="input-icon">
                👤
              </span>

              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                placeholder="Ingresa tu usuario"
              />

            </div>

          </div>

          {/* CONTRASEÑA */}
          <div className="form-group">

            <label htmlFor="password">
              Contraseña
            </label>

            <div className="input-container">

              <span className="input-icon">
                🔒
              </span>

              <input
                id="password"
                type={mostrarPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="Ingresa tu contraseña"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setMostrarPassword(!mostrarPassword)
                }
                aria-label={
                  mostrarPassword
                    ? "Ocultar contraseña"
                    : "Mostrar contraseña"
                }
              >
                {mostrarPassword ? "🙈" : "👁️"}
              </button>

            </div>

          </div>

          {/* ERROR */}
          {error && (
            <div className="login-error">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* BOTON */}
          <button
            type="submit"
            disabled={cargando}
            className="login-button"
          >
            {cargando ? (
              <>
                <span className="spinner"></span>
                Iniciando sesión...
              </>
            ) : (
              "Iniciar sesión"
            )}
          </button>

        </form>

        {/* FOOTER */}
        <div className="login-footer">
          <span></span>

          <p>
            Sistema de Gestión de Mudanzas
          </p>

          <span></span>
        </div>

      </div>

    </div>
  );
}

export default Login;