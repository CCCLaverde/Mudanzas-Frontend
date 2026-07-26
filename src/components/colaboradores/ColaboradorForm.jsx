import { useEffect, useState } from "react";

function ColaboradorForm({
  darkMode,
  colaboradorEditar,
  onGuardar,
  onCancelar,
}) {
  const [formData, setFormData] = useState({
    nombre: "",
    estado: "ACTIVO",
  });

  // =========================
  // CARGAR DATOS PARA EDITAR
  // =========================

  useEffect(() => {
    if (colaboradorEditar) {
      setFormData({
        nombre: colaboradorEditar.nombre,
        estado: colaboradorEditar.estado,
      });
    } else {
      setFormData({
        nombre: "",
        estado: "ACTIVO",
      });
    }
  }, [colaboradorEditar]);

  // =========================
  // INPUTS
  // =========================

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // =========================
  // GUARDAR
  // =========================

  const handleSubmit = (e) => {
    e.preventDefault();

    onGuardar({
      ...formData,
      id: colaboradorEditar?.id,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "22px",
        padding: "25px",
        borderRadius: "14px",
        background: darkMode ? "#0f172a" : "#f8fafc",
        border: darkMode
          ? "1px solid #334155"
          : "1px solid #e5e7eb",
      }}
    >
      {/* ================= TÍTULO ================= */}

      <h3
        style={{
          margin: 0,
          fontSize: "22px",
          color: "#0d6efd",
        }}
      >
        {colaboradorEditar
          ? "✏ Editar colaborador"
          : "👷 Nuevo colaborador"}
      </h3>

      {/* ================= NOMBRE ================= */}

      <div>
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "600",
          }}
        >
          Nombre completo
        </label>

        <input
          type="text"
          name="nombre"
          placeholder="Ej: Juan Pérez"
          value={formData.nombre}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: darkMode
              ? "1px solid #475569"
              : "1px solid #d1d5db",
            background: darkMode ? "#1e293b" : "#fff",
            color: darkMode ? "#fff" : "#111827",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* ================= ESTADO ================= */}

      <div>
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "600",
          }}
        >
          Estado
        </label>

        <select
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          style={{
            width: "100%",
            maxWidth: "220px",
            padding: "12px",
            borderRadius: "10px",
            border: darkMode
              ? "1px solid #475569"
              : "1px solid #d1d5db",
            background: darkMode ? "#1e293b" : "#fff",
            color: darkMode ? "#fff" : "#111827",
          }}
        >
          <option value="ACTIVO">Activo</option>
          <option value="INACTIVO">Inactivo</option>
        </select>
      </div>

      {/* ================= BOTONES ================= */}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
        }}
      >
        <button
          type="button"
          onClick={onCancelar}
          style={{
            padding: "12px 18px",
            border: "none",
            borderRadius: "10px",
            background: "#64748b",
            color: "white",
            cursor: "pointer",
          }}
        >
          Cancelar
        </button>

        <button
          type="submit"
          style={{
            padding: "12px 20px",
            border: "none",
            borderRadius: "10px",
            background: "#0d6efd",
            color: "white",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          {colaboradorEditar
            ? "Actualizar"
            : "Guardar"}
        </button>
      </div>
    </form>
  );
}

export default ColaboradorForm;