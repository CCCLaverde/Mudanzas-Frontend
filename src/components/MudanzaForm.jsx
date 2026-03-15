import { useState } from "react";
import { crearMudanza } from "../services/mudanzaService";

function MudanzaForm({ onMudanzaCreada }) {

  const [formData, setFormData] = useState({
    fecha: "",
    hora: "",
    lugarRecogida: "",
    lugarEntrega: "",
    descripcion: "",
    estado: "PENDIENTE",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await crearMudanza(formData);
      onMudanzaCreada();

      setFormData({
        fecha: "",
        hora: "",
        lugarRecogida: "",
        lugarEntrega: "",
        descripcion: "",
        estado: "PENDIENTE",
      });

    } catch (error) {
      console.error("Error creando mudanza:", error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "650px",
        margin: "40px auto",
        padding: "30px",
        borderRadius: "14px",
        background: "#ffffff",
        border: "1px solid #e6e6e6",
        boxShadow: "0 0 10px rgba(0,170,255,0.15)",
        transition: "all 0.3s ease"
      }}
    >

      <h2
        style={{
          marginBottom: "25px",
          textAlign: "center",
          fontWeight: "600"
        }}
      >
        🚚 Nueva Mudanza
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "18px"
        }}
      >

        {/* Fecha */}
        <div style={fieldStyle}>
          <label>Fecha</label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        {/* Hora */}
        <div style={fieldStyle}>
          <label>Hora</label>
          <input
            type="time"
            name="hora"
            value={formData.hora}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        {/* Recogida */}
        <div style={{ ...fieldStyle, gridColumn: "span 2" }}>
          <label>Lugar de recogida</label>
          <input
            type="text"
            name="lugarRecogida"
            value={formData.lugarRecogida}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        {/* Entrega */}
        <div style={{ ...fieldStyle, gridColumn: "span 2" }}>
          <label>Lugar de entrega</label>
          <input
            type="text"
            name="lugarEntrega"
            value={formData.lugarEntrega}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        {/* Descripción */}
        <div style={{ ...fieldStyle, gridColumn: "span 2" }}>
          <label>Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows="3"
            style={inputStyle}
          />
        </div>

        {/* Estado */}
        <div style={{ ...fieldStyle, gridColumn: "span 2" }}>
          <label>Estado</label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="PENDIENTE">PENDIENTE</option>
            <option value="EN_PROCESO">EN PROCESO</option>
            <option value="FINALIZADA">FINALIZADA</option>
            <option value="CANCELADA">CANCELADA</option>
          </select>
        </div>

        {/* Botón */}
        <div style={{ gridColumn: "span 2", textAlign: "center", marginTop: "10px" }}>
          <button
            type="submit"
            style={{
              padding: "12px 26px",
              borderRadius: "8px",
              border: "none",
              background: "#0d6efd",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}

            onMouseEnter={(e)=>{
              e.currentTarget.style.boxShadow = "0 0 12px rgba(0,170,255,0.5)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}

            onMouseLeave={(e)=>{
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Guardar Mudanza
          </button>
        </div>

      </form>

    </div>
  );
}

const fieldStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "5px"
};

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px"
};

export default MudanzaForm;