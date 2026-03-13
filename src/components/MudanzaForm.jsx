import { useState, useEffect } from "react";
import { crearMudanza, actualizarMudanza } from "../services/mudanzaService";

function MudanzaForm({ onMudanzaCreada, mudanzaEditar, setMudanzaEditar }) {

  const [formData, setFormData] = useState({
    fecha: "",
    hora: "",
    lugarRecogida: "",
    lugarEntrega: "",
    descripcion: "",
    estado: "PENDIENTE",
  });

  // 🔹 Cargar datos cuando se selecciona editar
  useEffect(() => {
    if (mudanzaEditar) {
      setFormData({
        fecha: mudanzaEditar.fecha || "",
        hora: mudanzaEditar.hora || "",
        lugarRecogida: mudanzaEditar.lugarRecogida || "",
        lugarEntrega: mudanzaEditar.lugarEntrega || "",
        descripcion: mudanzaEditar.descripcion || "",
        estado: mudanzaEditar.estado || "PENDIENTE",
      });
    }
  }, [mudanzaEditar]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (mudanzaEditar) {

        // 🔹 actualizar
        await actualizarMudanza(mudanzaEditar.id, formData);
        setMudanzaEditar(null);

      } else {

        // 🔹 crear
        await crearMudanza(formData);

      }

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
      console.error("Error guardando mudanza:", error);
    }
  };

  return (
    <div>

      <h3>
        {mudanzaEditar ? "Editar Mudanza" : "Crear Nueva Mudanza"}
      </h3>

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

        <button type="submit">
          {mudanzaEditar ? "Actualizar" : "Guardar"}
        </button>

      </form>

    </div>
  );
}

export default MudanzaForm;