function MudanzaList({ mudanzas, onEditar, onEliminar, darkMode }) {
  const cardBackground = darkMode ? "#1e293b" : "#ffffff";
  const textColor = darkMode ? "#f8fafc" : "#1e293b";
  const secondaryText = darkMode ? "#94a3b8" : "#64748b";
  const borderColor = darkMode ? "#334155" : "#e5e7eb";

  if (!mudanzas || mudanzas.length === 0) {
    return (
      <p
        style={{
          textAlign: "center",
          color: secondaryText,
          marginTop: "40px",
        }}
      >
        No hay mudanzas registradas.
      </p>
    );
  }

  const mudanzasOrdenadas = [...mudanzas].sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );

  const colorEstado = {
    PENDIENTE: "#f59e0b",
    EN_PROCESO: "#06b6d4",
    FINALIZADA: "#22c55e",
    CANCELADA: "#ef4444",
  };

  const colorPago = {
    PENDIENTE: "#f59e0b",
    PARCIAL: "#3b82f6",
    PAGADO: "#22c55e",
  };

  return (
    <div
      className="mudanza-list"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(360px,1fr))",
        gap: "22px",
        marginTop: "25px",
    }}
  >
      {mudanzasOrdenadas.map((m) => (
        <div
          key={m.id}
          style={{
            background: cardBackground,
            border: `1px solid ${borderColor}`,
            borderRadius: "18px",
            padding: "22px",
            transition: ".25s",
            boxShadow: darkMode
              ? "0 10px 25px rgba(0,0,0,.30)"
              : "0 10px 25px rgba(0,0,0,.08)",
            color: textColor,
            position: "relative",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-6px)";
            e.currentTarget.style.boxShadow =
              "0 0 18px rgba(59,130,246,.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = darkMode
              ? "0 10px 25px rgba(0,0,0,.30)"
              : "0 10px 25px rgba(0,0,0,.08)";
          }}
        >
          {/* Estado */}

          <span
            style={{
              position: "absolute",
              top: "18px",
              right: "18px",
              padding: "6px 12px",
              borderRadius: "30px",
              background: colorEstado[m.estado],
              color: "white",
              fontSize: ".75rem",
              fontWeight: 700,
            }}
          >
            {m.estado}
          </span>

          {/* Título */}

          <h3
            style={{
              margin: 0,
              marginBottom: "8px",
            }}
          >
            🚚 Mudanza #{m.id}
          </h3>

          {/* Cliente */}

          <div
            style={{
              marginBottom: "15px",
            }}
          >
            <strong>👤 {m.nombreCliente}</strong>

            <div
              style={{
                color: secondaryText,
                marginTop: "4px",
              }}
            >
              📞 {m.telefonoCliente}
            </div>
          </div>

          <hr
            style={{
              border: "none",
              borderTop: `1px solid ${borderColor}`,
              marginBottom: "18px",
            }}
          />

          {/* Fecha */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <span>📅 {m.fecha}</span>

            <span>🕓 {m.hora}</span>
          </div>

          {/* Precio */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "14px",
              alignItems: "center",
            }}
          >
            <strong>
              💰{" "}
              {new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
                maximumFractionDigits: 0,
              }).format(m.precio)}
            </strong>

            <span
              style={{
                background:
                  colorPago[m.estadoPago] || "#64748b",
                color: "white",
                padding: "4px 10px",
                borderRadius: "20px",
                fontSize: ".75rem",
              }}
            >
              💳 {m.estadoPago}
            </span>
          </div>

          {/* Ruta */}

          <div
            style={{
              marginBottom: "16px",
            }}
          >
            <strong>📍 Ruta</strong>

            <div
              style={{
                marginTop: "8px",
                color: secondaryText,
              }}
            >
              {m.lugarRecogida}

              <div
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                }}
              >
                ↓
              </div>

              {m.lugarEntrega}
            </div>
          </div>

          {/* Colaboradores */}

          <div
            style={{
              marginBottom: "16px",
            }}
          >
            <strong>👷 Colaboradores</strong>

            <div
              style={{
                marginTop: "6px",
                color: secondaryText,
              }}
            >
              {m.colaboradores?.length
                ? m.colaboradores
                    .map((c) => c.nombre)
                    .join(" • ")
                : "Sin asignar"}
            </div>
          </div>

          {/* Descripción */}

          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <strong>📝 Descripción</strong>

            <p
              style={{
                marginTop: "6px",
                color: secondaryText,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              {m.descripcion}
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
                padding: "10px",
                border: "none",
                borderRadius: "10px",
                background: "#2563eb",
                color: "white",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              ✏ Editar
            </button>

            <button
              onClick={() => onEliminar(m.id)}
              style={{
                flex: 1,
                padding: "10px",
                border: "none",
                borderRadius: "10px",
                background: "#dc2626",
                color: "white",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              🗑 Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MudanzaList;