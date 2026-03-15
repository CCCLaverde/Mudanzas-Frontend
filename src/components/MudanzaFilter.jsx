import { useState } from "react";

function MudanzaFilter({ onFilter }) {

  const [fecha, setFecha] = useState("");
  const [estado, setEstado] = useState("");

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
          background: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #e6e6e6",
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
            style={inputStyle}
          />
        </div>

        <div style={fieldStyle}>
          <label>Estado</label>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            style={inputStyle}
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

const inputStyle = {
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px"
};

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