function MudanzaList({ mudanzas, onEditar, onEliminar }) {

  if (!mudanzas || mudanzas.length === 0) {
    return <p>No hay mudanzas registradas.</p>;
  }

  // Ordenar por fecha más reciente
  const mudanzasOrdenadas = [...mudanzas].sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>

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
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              width: "260px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              background: "#fff",
              position: "relative",
            }}
          >

            {/* Estado arriba a la derecha */}
            <span
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: colorEstado[m.estado],
                color: "white",
                padding: "5px 8px",
                borderRadius: "5px",
                fontSize: "0.85rem",
                fontWeight: "bold",
              }}
            >
              {m.estado}
            </span>

            <h4>🚚 Mudanza</h4>

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

            <p>
              <strong>📝 Descripción:</strong> {m.descripcion || "Sin descripción"}
            </p>

            <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
              <button onClick={() => onEditar(m)}>
                ✏ Editar
              </button>

              <button
                onClick={() => onEliminar(m.id)}
                style={{ color: "red" }}
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