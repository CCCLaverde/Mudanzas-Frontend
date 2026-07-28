function TopToolbar({
  darkMode,
  setDarkMode,
  onNuevaMudanza,
  onColaboradores,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
      }}
    >
      {/* Botones izquierda */}

      <div
        style={{
          display: "flex",
          gap: "15px",
        }}
      >
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

      {/* Botón derecha */}

      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          ...buttonDark,
          background: darkMode ? "#38bdf8" : "#111827",
        }}
      >
        {darkMode
          ? "☀️ Modo Claro"
          : "🌙 Modo Oscuro"}
      </button>
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

export default TopToolbar;