function ColaboradorChart({ estadisticas, darkMode }) {
  if (!estadisticas || estadisticas.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          color: darkMode ? "#94a3b8" : "#64748b",
        }}
      >
        No hay estadísticas para este mes.
      </div>
    );
  }

  const maximo = Math.max(...estadisticas.map((c) => c.totalMudanzas));
  const totalGeneral = estadisticas.reduce(
    (acc, c) => acc + c.totalMudanzas,
    0
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "22px",
      }}
    >
      {estadisticas.map((colaborador, index) => {
        const porcentajeBarra =
          maximo === 0
            ? 0
            : (colaborador.totalMudanzas / maximo) * 100;

        const porcentajeTotal =
          totalGeneral === 0
            ? 0
            : (
                (colaborador.totalMudanzas / totalGeneral) *
                100
              ).toFixed(0);

        return (
          <div key={colaborador.id}>
            {/* Nombre y cantidad */}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
                fontWeight: "600",
                color: darkMode ? "#fff" : "#111827",
              }}
            >
              <span>
                {index === 0 && "🥇 "}
                {index === 1 && "🥈 "}
                {index === 2 && "🥉 "}
                {colaborador.nombre}
              </span>

              <span>
                {colaborador.totalMudanzas} mudanzas ({porcentajeTotal}%)
              </span>
            </div>

            {/* Barra */}

            <div
              style={{
                width: "100%",
                height: "16px",
                background: darkMode
                  ? "#334155"
                  : "#e5e7eb",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${porcentajeBarra}%`,
                  height: "100%",
                  borderRadius: "20px",
                  background:
                    index === 0
                      ? "#3b82f6"
                      : index === 1
                      ? "#60a5fa"
                      : index === 2
                      ? "#93c5fd"
                      : "#bfdbfe",

                  transition: "width .8s ease",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ColaboradorChart;