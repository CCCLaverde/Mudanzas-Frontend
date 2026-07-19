function MudanzaList({ mudanzas, onEditar, onEliminar, darkMode }) {
  const cardBackground = darkMode ? "#1e293b" : "#ffffff";
  const textColor = darkMode ? "#e2e8f0" : "#333";
  const borderColor = darkMode ? "#334155" : "#e6e6e6";

  if (!mudanzas || mudanzas.length === 0) {
    return (
      <p
        style={{
          textAlign: "center",
          color: textColor,
        }}
      >
        No hay mudanzas registradas.
      </p>
    );
  }

  const mudanzasOrdenadas = [...mudanzas].sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: "20px",
        width: "100%",
        marginTop: "20px",
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
              background: cardBackground,
              border: `1px solid ${borderColor}`,
              position: "relative",
              transition: "all 0.25s ease",
              boxShadow: "0 0 8px rgba(0,170,255,0.15)",
              color: textColor,
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

            {/* Cliente */}
            <h2
              style={{
                margin: 0,
                fontSize: "1.35rem",
              }}
            >
              👤 {m.nombreCliente || "Cliente"}
            </h2>

            <p
              style={{
                marginTop: "6px",
                marginBottom: "18px",
                color: darkMode ? "#94a3b8" : "#666",
              }}
            >
              📞 {m.telefonoCliente || "Sin teléfono"}
            </p>

            <hr
              style={{
                border: "none",
                borderTop: `1px solid ${borderColor}`,
                marginBottom: "18px",
              }}
            />

            {/* Ruta */}
            <div style={{ marginBottom: "14px" }}>
              <strong>📍 Ruta</strong>

              <div style={{ marginTop: "8px" }}>
                <div>🚚 {m.lugarRecogida}</div>
                <div
                  style={{
                    margin: "6px 0",
                    textAlign: "center",
                    fontSize: "1.2rem",
                  }}
                >
                </div>
                <div>🏁 {m.lugarEntrega}</div>
              </div>
            </div>

            {/* Fecha y hora */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "14px",
              }}
            >
              <span>📅 {m.fecha}</span>
              <span>⏰ {m.hora}</span>
            </div>

            {/* Descripción */}
            <div
              style={{
                marginBottom: "18px",
              }}
            >
              <strong>📝 Descripción</strong>

              <p
                style={{
                  marginTop: "6px",
                  marginBottom: 0,
                }}
              >
                {m.descripcion || "Sin descripción"}
              </p>
            </div>

            {/* Botones */}
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                onClick={() => onEditar(m)}
                style={{
                  flex: 1,
                  padding: "9px",
                  borderRadius: "6px",
                  border: "none",
                  background: "#0d6efd",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                ✏ Editar
              </button>

              <button
                onClick={() => onEliminar(m.id)}
                style={{
                  flex: 1,
                  padding: "9px",
                  borderRadius: "6px",
                  border: "none",
                  background: "#dc3545",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
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