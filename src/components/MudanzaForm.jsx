import { useState, useEffect } from "react";
import { crearMudanza, actualizarMudanza } from "../services/mudanzaService";
import { obtenerColaboradoresActivos } from "../services/colaboradorService";

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

    colaboradores: [],
  });

  const [colaboradores, setColaboradores] = useState([]);

  /* =========================
     CARGAR COLABORADORES
  ========================= */

  useEffect(() => {
    cargarColaboradores();
  }, []);

  const cargarColaboradores = async () => {
    try {
      const data = await obtenerColaboradoresActivos();
      setColaboradores(data);
    } catch (error) {
      console.error("Error cargando colaboradores:", error);
    }
  };

  /* =========================
     CARGAR DATOS PARA EDITAR
  ========================= */

  useEffect(() => {
    if (!mudanzaEditar) return;

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

      colaboradores: mudanzaEditar.colaboradores
        ? mudanzaEditar.colaboradores.map((c) => c.id)
        : [],
    });
  }, [mudanzaEditar]);

  /* =========================
     COLORES
  ========================= */

  const backgroundColor = darkMode ? "#1e293b" : "#ffffff";
  const textColor = darkMode ? "#e2e8f0" : "#333";
  const borderColor = darkMode ? "#334155" : "#e6e6e6";

  /* =========================
     HANDLERS
  ========================= */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClienteChange = (e) => {
    setFormData({
      ...formData,
      cliente: {
        ...formData.cliente,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleColaboradorChange = (id) => {
    setFormData((prev) => ({
      ...prev,
      colaboradores: prev.colaboradores.includes(id)
        ? prev.colaboradores.filter((c) => c !== id)
        : [...prev.colaboradores, id],
    }));
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

      colaboradores: [],
    });
  };

  /* =========================
     GUARDAR
  ========================= */

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
            marginBottom: 0,
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
            marginBottom: 0,
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

        {/* ================= COLABORADORES ================= */}

        <h3
          style={{
            gridColumn: "1 / -1",
            color: "#0d6efd",
            marginTop: "15px",
            marginBottom: 0,
          }}
        >
          👷 Colaboradores
        </h3>

        <div
          style={{
            gridColumn: "1 / -1",
            border: `1px solid ${borderColor}`,
            borderRadius: "8px",
            padding: "15px",
            display: "grid",
            gap: "10px",
          }}
        >
          {colaboradores.length === 0 ? (
            <span>No hay colaboradores activos.</span>
          ) : (
            colaboradores.map((c) => (
              <label
                key={c.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={formData.colaboradores.includes(c.id)}
                  onChange={() => handleColaboradorChange(c.id)}
                />

                {c.nombre}
              </label>
            ))
          )}
        </div>

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