import { useState } from "react";

function MudanzaFilter({ onFilter, darkMode }) {

  const [fecha, setFecha] = useState("");
  const [estado, setEstado] = useState("");

  /* COLORES DINÁMICOS */
  const backgroundColor = darkMode ? "#1e293b" : "#ffffff";
  const textColor = darkMode ? "#e2e8f0" : "#333";
  const borderColor = darkMode ? "#334155" : "#e6e6e6";

  const handleSubmit = (e) => {
    e.preventDefault();

    onFilter({
      fecha,
      estado
    });
  };

  const limpiarFiltros = () => {
    setFecha("");
    setEstado("");
    onFilter({});
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "30px"
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
          flexWrap: "wrap",
          padding: "15px 25px",
          background: backgroundColor,
          borderRadius: "12px",
          border: `1px solid ${borderColor}`,
          color: textColor,
          boxShadow: "0 0 8px rgba(0,170,255,0.15)",
          transition: "all 0.3s ease"
        }}
      >

        <h3
          style={{
            marginRight: "10px",
            fontWeight: "600"
          }}
        >
          🔎 Filtrar Mudanzas
        </h3>

        <div style={fieldStyle}>
          <label>Fecha</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            style={inputStyle(darkMode)}
          />
        </div>

        <div style={fieldStyle}>
          <label>Estado</label>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            style={inputStyle(darkMode)}
          >
            <option value="">Todos</option>
            <option value="PENDIENTE">Pendiente</option>
            <option value="EN_PROCESO">En proceso</option>
            <option value="FINALIZADA">Finalizada</option>
            <option value="CANCELADA">Cancelada</option>
          </select>
        </div>

        <button
          type="submit"
          style={buscarBtn}

          onMouseEnter={(e)=>{
            e.currentTarget.style.boxShadow = "0 0 10px rgba(0,170,255,0.4)";
          }}

          onMouseLeave={(e)=>{
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Buscar
        </button>

        <button
          type="button"
          onClick={limpiarFiltros}
          style={limpiarBtn}
        >
          Limpiar
        </button>

      </form>
    </div>
  );
}

const fieldStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "4px"
};

const inputStyle = (darkMode) => ({
  padding: "8px",
  borderRadius: "6px",
  border: darkMode ? "1px solid #334155" : "1px solid #ccc",
  fontSize: "14px",
  background: darkMode ? "#020617" : "#ffffff",
  color: darkMode ? "#e2e8f0" : "#333"
});

const buscarBtn = {
  padding: "8px 14px",
  borderRadius: "6px",
  border: "none",
  background: "#0d6efd",
  color: "white",
  cursor: "pointer",
  transition: "all 0.2s ease"
};

const limpiarBtn = {
  padding: "8px 14px",
  borderRadius: "6px",
  border: "none",
  background: "#6c757d",
  color: "white",
  cursor: "pointer"
};

export default MudanzaFilter;