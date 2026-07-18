import { useState, useEffect } from "react";
import { crearMudanza, actualizarMudanza } from "../services/mudanzaService";

function MudanzaForm({
  onMudanzaCreada,
  mudanzaEditar,
  setMudanzaEditar,
  darkMode,
}) {
  const [formData, setFormData] = useState({
    fecha: "",
    hora: "",
    lugarRecogida: "",
    lugarEntrega: "",
    descripcion: "",
    estado: "PENDIENTE",
    cliente: {
      nombre: "",
      telefono: "",
      email: "",
    },
  });

  /* CARGAR DATOS CUANDO SE EDITA */
  useEffect(() => {
    if (mudanzaEditar) {
      setFormData({
        fecha: mudanzaEditar.fecha,
        hora: mudanzaEditar.hora,
        lugarRecogida: mudanzaEditar.lugarRecogida,
        lugarEntrega: mudanzaEditar.lugarEntrega,
        descripcion: mudanzaEditar.descripcion,
        estado: mudanzaEditar.estado,

        cliente: {
          nombre: mudanzaEditar.nombreCliente || "",
          telefono: mudanzaEditar.telefonoCliente || "",
          email: "",
        },
      });
    }
  }, [mudanzaEditar]);

  /* COLORES */
  const backgroundColor = darkMode ? "#1e293b" : "#ffffff";
  const textColor = darkMode ? "#e2e8f0" : "#333";
  const borderColor = darkMode ? "#334155" : "#e6e6e6";

  /* CAMPOS DE LA MUDANZA */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* CAMPOS DEL CLIENTE */
  const handleClienteChange = (e) => {
    setFormData({
      ...formData,
      cliente: {
        ...formData.cliente,
        [e.target.name]: e.target.value,
      },
    });
  };

  const limpiarFormulario = () => {
    setFormData({
      fecha: "",
      hora: "",
      lugarRecogida: "",
      lugarEntrega: "",
      descripcion: "",
      estado: "PENDIENTE",
      cliente: {
        nombre: "",
        telefono: "",
        email: "",
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mudanzaEditar) {
        await actualizarMudanza(mudanzaEditar.id, formData);
      } else {
        await crearMudanza(formData);
      }

      onMudanzaCreada();
      limpiarFormulario();
      setMudanzaEditar(null);
    } catch (error) {
      console.error("Error guardando mudanza:", error);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "700px",
        margin: "40px auto",
        padding: "30px",
        borderRadius: "14px",
        background: backgroundColor,
        border: `1px solid ${borderColor}`,
        color: textColor,
        boxShadow: "0 0 10px rgba(0,170,255,0.15)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        {mudanzaEditar ? "✏ Editar Mudanza" : "🚚 Nueva Mudanza"}
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "15px",
        }}
      >
        {/* ================= MUDANZA ================= */}

        <h3
          style={{
            gridColumn: "1 / -1",
            color: "#0d6efd",
            marginBottom: "0",
          }}
        >
          🚚 Datos de la mudanza
        </h3>

        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          required
        />

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

        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={handleChange}
          style={{
            gridColumn: "1 / -1",
            minHeight: "90px",
          }}
        />

        <select
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          style={{
            gridColumn: "1 / -1",
          }}
        >
          <option value="PENDIENTE">PENDIENTE</option>
          <option value="EN_PROCESO">EN PROCESO</option>
          <option value="FINALIZADA">FINALIZADA</option>
          <option value="CANCELADA">CANCELADA</option>
        </select>

        {/* ================= CLIENTE ================= */}

        <h3
          style={{
            gridColumn: "1 / -1",
            color: "#0d6efd",
            marginTop: "15px",
            marginBottom: "0",
          }}
        >
          👤 Datos del cliente
        </h3>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre del cliente"
          value={formData.cliente.nombre}
          onChange={handleClienteChange}
          required
        />

        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={formData.cliente.telefono}
          onChange={handleClienteChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico (opcional)"
          value={formData.cliente.email}
          onChange={handleClienteChange}
          style={{
            gridColumn: "1 / -1",
          }}
        />

        <button
          type="submit"
          style={{
            gridColumn: "1 / -1",
            padding: "12px",
            background: "#0d6efd",
            border: "none",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {mudanzaEditar ? "Actualizar Mudanza" : "Guardar Mudanza"}
        </button>
      </form>
    </div>
  );
}

export default MudanzaForm;