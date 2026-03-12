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
      onMudanzaCreada(); // recargar lista
      setFormData({
        fecha: "",
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
    <div>
      <h3>Crear Nueva Mudanza</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          required
        />

      <label>Hora</label>
          <input
            type="time"
            name="hora"
            value={formData.hora}
            onChange={handleChange}
            required
         />

        <input
          type="text"
          name="lugarRecogida"
          placeholder="Lugar de recogida"
          value={formData.lugarRecogida}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="lugarEntrega"
          placeholder="Lugar de entrega"
          value={formData.lugarEntrega}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={handleChange}
        />

        <select
          name="estado"
          value={formData.estado}
          onChange={handleChange}
        >
          <option value="PENDIENTE">PENDIENTE</option>
          <option value="EN_PROCESO">EN_PROCESO</option>
          <option value="FINALIZADA">FINALIZADA</option>
          <option value="CANCELADA">CANCELADA</option>
        </select>

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default MudanzaForm;