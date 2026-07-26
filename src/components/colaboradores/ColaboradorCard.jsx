import EstadoBadge from "./EstadoBadge";

function ColaboradorCard({
  colaborador,
  darkMode,
  onEditar,
  onActivar,
  onDesactivar,
}) {

  const activo = colaborador.estado === "ACTIVO";

  return (

    <div
      style={{
        background: darkMode ? "#1e293b" : "#ffffff",

        borderRadius: "18px",

        padding: "22px",

        border: darkMode
          ? "1px solid #334155"
          : "1px solid #e5e7eb",

        boxShadow: darkMode
          ? "0 10px 25px rgba(0,0,0,.35)"
          : "0 10px 25px rgba(0,0,0,.08)",

        transition: ".25s",

        display: "flex",
        flexDirection: "column",

        minHeight: "260px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >

      {/* Avatar */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            width: "70px",
            height: "70px",

            borderRadius: "50%",

            background: "#0d6efd",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            fontSize: "34px",

            color: "white",
          }}
        >
          👷
        </div>
      </div>

      {/* Nombre */}

      <h3
        style={{
          margin: 0,
          textAlign: "center",

          fontSize: "22px",

          color: darkMode ? "#ffffff" : "#111827",
        }}
      >
        {colaborador.nombre}
      </h3>

      {/* Estado */}

      <div
        style={{
          marginTop: "15px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <EstadoBadge estado={colaborador.estado} />
      </div>

      {/* Espacio para futura información */}

      <div
        style={{
          flex: 1,
        }}
      />

      {/* Botones */}

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "25px",
        }}
      >

        <button
          onClick={() => onEditar(colaborador)}
          style={{
            flex: 1,

            padding: "10px",

            borderRadius: "10px",

            border: "none",

            background: "#0d6efd",

            color: "white",

            fontWeight: "600",

            cursor: "pointer",
          }}
        >
          ✏ Editar
        </button>

        {activo ? (

          <button
            onClick={() => onDesactivar(colaborador)}
            style={{
              flex: 1,

              padding: "10px",

              borderRadius: "10px",

              border: "none",

              background: "#ef4444",

              color: "white",

              fontWeight: "600",

              cursor: "pointer",
            }}
          >
            🔴 Desactivar
          </button>

        ) : (

          <button
            onClick={() => onActivar(colaborador)}
            style={{
              flex: 1,

              padding: "10px",

              borderRadius: "10px",

              border: "none",

              background: "#22c55e",

              color: "white",

              fontWeight: "600",

              cursor: "pointer",
            }}
          >
            🟢 Activar
          </button>

        )}

      </div>

    </div>

  );

}

export default ColaboradorCard;