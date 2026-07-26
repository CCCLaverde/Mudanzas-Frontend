function ColaboradorToolbar({
  darkMode,
  onNuevo,
  filtro,
  setFiltro,
  busqueda,
  setBusqueda,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "20px",
        flexWrap: "wrap",
        marginBottom: "25px",
      }}
    >
      {/* Lado izquierdo */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={onNuevo}
          style={{
            padding: "12px 18px",
            border: "none",
            borderRadius: "10px",
            background: "#0d6efd",
            color: "white",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          ➕ Nuevo colaborador
        </button>

        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: darkMode
              ? "1px solid #475569"
              : "1px solid #d1d5db",

            background: darkMode
              ? "#0f172a"
              : "#ffffff",

            color: darkMode
              ? "#e2e8f0"
              : "#111827",
          }}
        >
          <option value="TODOS">
            Todos
          </option>

          <option value="ACTIVO">
            Activos
          </option>

          <option value="INACTIVO">
            Inactivos
          </option>
        </select>
      </div>

      {/* Lado derecho */}
      <input
        type="text"
        placeholder="Buscar colaborador..."
        value={busqueda}
        onChange={(e) =>
          setBusqueda(e.target.value)
        }
        style={{
          width: "280px",
          padding: "12px",

          borderRadius: "10px",

          border: darkMode
            ? "1px solid #475569"
            : "1px solid #d1d5db",

          background: darkMode
            ? "#0f172a"
            : "#ffffff",

          color: darkMode
            ? "#e2e8f0"
            : "#111827",
        }}
      />
    </div>
  );
}

export default ColaboradorToolbar;