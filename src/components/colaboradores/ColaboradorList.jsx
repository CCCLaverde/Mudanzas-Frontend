import ColaboradorCard from "./ColaboradorCard";

function ColaboradorList({
  colaboradores,
  darkMode,
  onEditar,
  onActivar,
  onDesactivar,
}) {

  if (colaboradores.length === 0) {
    return (
      <div
        style={{
          padding: "50px",
          textAlign: "center",
          color: darkMode ? "#94a3b8" : "#64748b",
          fontSize: "18px",
        }}
      >
        No hay colaboradores para mostrar.
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",

        gridTemplateColumns:
          "repeat(auto-fill, minmax(280px,1fr))",

        gap: "20px",

        marginTop: "20px",
      }}
    >
      {colaboradores.map((colaborador) => (
        <ColaboradorCard
          key={colaborador.id}
          colaborador={colaborador}
          darkMode={darkMode}
          onEditar={onEditar}
          onActivar={onActivar}
          onDesactivar={onDesactivar}
        />
      ))}
    </div>
  );
}

export default ColaboradorList;