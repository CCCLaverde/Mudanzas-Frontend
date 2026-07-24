import React, { useState } from "react";

function CalendarioMudanzas({
  mudanzas,
  darkMode,
  onSeleccionarFiltro,
}) {
  
  const [fechaActual, setFechaActual] = useState(new Date());
  const hoy = new Date();
  const año = fechaActual.getFullYear();
  const mes = fechaActual.getMonth();

  const primerDia = new Date(año, mes, 1);
  const ultimoDia = new Date(año, mes + 1, 0);

  const diasMes = ultimoDia.getDate();
  const inicioSemana = primerDia.getDay();

  const calendario = [];

  for (let i = 0; i < inicioSemana; i++) {
    calendario.push(null);
  }

  for (let i = 1; i <= diasMes; i++) {
    calendario.push(i);
  }

  const nombresMeses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

// =============================
  const mesAnterior = () => {
  setFechaActual(
    new Date(año, mes - 1, 1)
    );
  };

  const mesSiguiente = () => {
    setFechaActual(
      new Date(año, mes + 1, 1)
    );
  };

  // =============================
  // MUDANZAS DEL DÍA
  // =============================

  const obtenerMudanzasDia = (dia) => {
  return mudanzas.filter((m) => {

    const [anio, mesMudanza, diaMudanza] =
      m.fecha.split("-").map(Number);

    return (
      diaMudanza === dia &&
      mesMudanza - 1 === mes &&
      anio === año
    );

  });
};

  // =============================
  // COLOR DEL ESTADO
  // =============================

  const colorEstado = (estado) => {
    switch (estado) {
      case "PENDIENTE":
        return "#f59e0b";

      case "EN_PROCESO":
        return "#3b82f6";

      case "FINALIZADA":
        return "#10b981";

      case "CANCELADA":
        return "#ef4444";

      default:
        return "#64748b";
    }
  };

  const irHoy = () => {
  setFechaActual(new Date());
};

const botonCalendario = {
  border: "none",
  cursor: "pointer",
  padding: "8px 12px",
  borderRadius: "10px",
  fontSize: "18px",
  background: darkMode ? "#334155" : "#e5e7eb",
  color: darkMode ? "#fff" : "#111827",
  transition: ".2s",
};

  return (
    <div
      style={{
        marginTop: "35px",
        background: darkMode ? "#1e293b" : "#ffffff",
        borderRadius: "18px",
        padding: "25px",
        border: `1px solid ${darkMode ? "#334155" : "#e5e7eb"}`,
        boxShadow: darkMode
          ? "0 10px 25px rgba(0,0,0,.35)"
          : "0 10px 25px rgba(0,0,0,.08)",
      }}
    >
      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    flexWrap: "wrap",
    gap: "15px",
  }}
>
  {/* Lado izquierdo */}
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
    }}
  >
    <button
      onClick={mesAnterior}
      style={botonCalendario}
    >
      ◀
    </button>

    <button
      onClick={irHoy}
      style={{
        ...botonCalendario,
        fontWeight: "600",
        padding: "8px 16px",
      }}
    >
      Hoy
    </button>

    <button
      onClick={mesSiguiente}
      style={botonCalendario}
    >
      ▶
    </button>
  </div>

  {/* Centro */}
  <h3
    style={{
      margin: 0,
      color: darkMode ? "#fff" : "#111827",
      fontSize: "26px",
    }}
  >
    📅 {nombresMeses[mes]} {año}
  </h3>
</div>
    

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7,1fr)",
          gap: "10px",
        }}
      >
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((dia) => (
          <div
            key={dia}
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: darkMode ? "#cbd5e1" : "#475569",
            }}
          >
            {dia}
          </div>
        ))}

        {calendario.map((dia, index) => {
          if (dia === null) {
            return <div key={index}></div>;
          }

          const eventos = obtenerMudanzasDia(dia);

          const esHoy =
            dia === hoy.getDate() &&
            mes === hoy.getMonth() &&
            año === hoy.getFullYear();

          return (
            <div
              key={index}
              style={{
                minHeight: "130px",
                borderRadius: "12px",
                border: `1px solid ${
                  darkMode ? "#334155" : "#e5e7eb"
                }`,
                padding: "8px",
                display: "flex",
                flexDirection: "column",
                background: esHoy
                  ? "#2563eb22"
                  : darkMode
                  ? "#0f172a"
                  : "#fafafa",
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  marginBottom: "6px",
                  color: esHoy
                    ? "#3b82f6"
                    : darkMode
                    ? "#fff"
                    : "#111827",
                }}
              >
                {dia}
              </div>

              {eventos.slice(0, 3).map((mudanza) => (
              <div
                key={mudanza.id}
                onClick={() =>
                  onSeleccionarFiltro({
                    fechaInicio: mudanza.fecha,
                    fechaFin: mudanza.fecha,
                  })
                }
                style={{
                  marginBottom: "4px",
                  padding: "4px 6px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  cursor: "pointer",
                  background: colorEstado(mudanza.estado),
                  color: "white",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {mudanza.hora.substring(0, 5)} - {mudanza.nombreCliente}
              </div>
            ))}

            {eventos.length > 3 && (
              <div
                style={{
                  marginTop: "4px",
                  fontSize: "11px",
                  fontWeight: "bold",
                  color: "#3b82f6",
                }}
              >
                +{eventos.length - 3} más...
              </div>
)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarioMudanzas;