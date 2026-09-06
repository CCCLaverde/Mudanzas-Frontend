function TopToolbar({
  darkMode,
  setDarkMode,
  onNuevaMudanza,
  onColaboradores,
  onLogout,
}) {
  return (
    <div className="top-toolbar">

      {/* Botones izquierda */}
      <div className="top-toolbar-group">
        <button
          onClick={onNuevaMudanza}
          style={buttonPrimary}
        >
          ➕ Nueva Mudanza
        </button>

        <button
          onClick={onColaboradores}
          style={buttonSuccess}
        >
          👷 Colaboradores
        </button>
      </div>

      {/* Botones derecha */}
      <div className="top-toolbar-group">
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            ...buttonDark,
            background: darkMode ? "#38bdf8" : "#111827",
          }}
        >
          {darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
        </button>

        <button
          onClick={onLogout}
          style={buttonLogout}
        >
          🚪 Cerrar sesión
        </button>
      </div>

    </div>
  );
}

const buttonPrimary = {
  padding: "12px 20px",
  background: "#0d6efd",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "15px",
};

const buttonSuccess = {
  padding: "12px 20px",
  background: "#10b981",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "15px",
};

const buttonDark = {
  padding: "12px 20px",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "15px",
};

const buttonLogout = {
  padding: "12px 20px",
  background: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "15px",
};

export default TopToolbar;
