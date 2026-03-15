function MudanzaList({ mudanzas, onEditar, onEliminar }) {

  if (!mudanzas || mudanzas.length === 0) {
    return <p style={{ textAlign: "center" }}>No hay mudanzas registradas.</p>;
  }

  const mudanzasOrdenadas = [...mudanzas].sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "20px",
        width: "100%",
        marginTop: "20px"
      }}
    >

      {mudanzasOrdenadas.map((m) => {

        const colorEstado = {
          PENDIENTE: "#ffc107",
          EN_PROCESO: "#17a2b8",
          FINALIZADA: "#28a745",
          CANCELADA: "#dc3545",
        };

        return (
          <div
            key={m.id}
            style={{
              borderRadius: "12px",
              padding: "18px",
              background: "#ffffff",
              border: "1px solid #e6e6e6",
              position: "relative",
              transition: "all 0.25s ease",
              boxShadow: "0 0 8px rgba(0,170,255,0.15)"
            }}

            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0 0 12px rgba(0,170,255,0.3), 0 0 25px rgba(0,170,255,0.2)";
            }}

            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 0 8px rgba(0,170,255,0.15)";
            }}
          >

            {/* Estado */}
            <span
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: colorEstado[m.estado],
                color: "white",
                padding: "4px 10px",
                borderRadius: "20px",
                fontSize: "0.75rem",
                fontWeight: "bold",
              }}
            >
              {m.estado}
            </span>

            <h3 style={{ marginBottom: "8px" }}>
              🚚 Mudanza
            </h3>

            <p>
              <strong>📅 Fecha:</strong> {m.fecha}
            </p>

            <p>
              <strong>⏰ Hora:</strong> {m.hora}
            </p>

            <p>
              <strong>📍 Recogida:</strong> {m.lugarRecogida}
            </p>

            <p>
              <strong>📍 Entrega:</strong> {m.lugarEntrega}
            </p>

            <p style={{ marginTop: "6px" }}>
              <strong>📝 Descripción:</strong>{" "}
              {m.descripcion || "Sin descripción"}
            </p>

            <div
              style={{
                marginTop: "12px",
                display: "flex",
                gap: "10px"
              }}
            >
              <button
                onClick={() => onEditar(m)}
                style={{
                  flex: 1,
                  padding: "6px",
                  borderRadius: "6px",
                  border: "none",
                  background: "#0d6efd",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                ✏ Editar
              </button>

              <button
                onClick={() => onEliminar(m.id)}
                style={{
                  flex: 1,
                  padding: "6px",
                  borderRadius: "6px",
                  border: "none",
                  background: "#dc3545",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                🗑 Eliminar
              </button>
            </div>

          </div>
        );
      })}
    </div>
  );
}

export default MudanzaList;