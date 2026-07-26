function EstadoBadge({ estado }) {

  const estados = {
    ACTIVO: {
      texto: "🟢 Activo",
      fondo: "#dcfce7",
      color: "#166534",
    },

    INACTIVO: {
      texto: "🔴 Inactivo",
      fondo: "#fee2e2",
      color: "#991b1b",
    },
  };

  const badge = estados[estado] || {
    texto: estado,
    fondo: "#e5e7eb",
    color: "#374151",
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",

        padding: "6px 14px",

        borderRadius: "999px",

        fontSize: "13px",

        fontWeight: "600",

        background: badge.fondo,

        color: badge.color,
      }}
    >
      {badge.texto}
    </span>
  );
}

export default EstadoBadge;