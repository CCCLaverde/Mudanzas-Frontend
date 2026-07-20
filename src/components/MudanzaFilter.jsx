import { useEffect, useState } from "react";
import { obtenerColaboradoresActivos } from "../services/colaboradorService";

function MudanzaFilter({ onFilter, darkMode }) {

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [estado, setEstado] = useState("");
  const [colaboradorId, setColaboradorId] = useState("");

  const [colaboradores, setColaboradores] = useState([]);

  useEffect(() => {
    cargarColaboradores();
  }, []);

  const cargarColaboradores = async () => {
    try {
      const data = await obtenerColaboradoresActivos();
      setColaboradores(data);
    } catch (error) {
      console.error(error);
    }
  };

  /* COLORES */

  const backgroundColor = darkMode ? "#1e293b" : "#ffffff";
  const textColor = darkMode ? "#e2e8f0" : "#333";
  const borderColor = darkMode ? "#334155" : "#e6e6e6";

  const handleSubmit = (e) => {
    e.preventDefault();

    onFilter({
      fechaInicio,
      fechaFin,
      estado,
      colaboradorId
    });
  };

  const limpiarFiltros = () => {

    setFechaInicio("");
    setFechaFin("");
    setEstado("");
    setColaboradorId("");

    onFilter({});
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "30px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
          flexWrap: "wrap",
          padding: "18px 25px",
          background: backgroundColor,
          borderRadius: "12px",
          border: `1px solid ${borderColor}`,
          color: textColor,
          boxShadow: "0 0 8px rgba(0,170,255,0.15)",
        }}
      >

        <h3
          style={{
            width: "100%",
            marginBottom: "5px",
          }}
        >
          🔎 Filtrar Mudanzas
        </h3>

        {/* Fecha Inicio */}

        <div style={fieldStyle}>
          <label>Fecha inicio</label>

          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            style={inputStyle(darkMode)}
          />
        </div>

        {/* Fecha Fin */}

        <div style={fieldStyle}>
          <label>Fecha fin</label>

          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            style={inputStyle(darkMode)}
          />
        </div>

        {/* Estado */}

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

        {/* Colaborador */}

        <div style={fieldStyle}>
          <label>Colaborador</label>

          <select
            value={colaboradorId}
            onChange={(e) => setColaboradorId(e.target.value)}
            style={inputStyle(darkMode)}
          >
            <option value="">Todos</option>

            {colaboradores.map((c) => (
              <option
                key={c.id}
                value={c.id}
              >
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          style={buscarBtn}
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
  gap: "4px",
};

const inputStyle = (darkMode) => ({
  padding: "8px",
  borderRadius: "6px",
  border: darkMode ? "1px solid #334155" : "1px solid #ccc",
  background: darkMode ? "#020617" : "#fff",
  color: darkMode ? "#e2e8f0" : "#333",
});

const buscarBtn = {
  padding: "8px 16px",
  border: "none",
  borderRadius: "6px",
  background: "#0d6efd",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};

const limpiarBtn = {
  padding: "8px 16px",
  border: "none",
  borderRadius: "6px",
  background: "#6c757d",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};

export default MudanzaFilter;