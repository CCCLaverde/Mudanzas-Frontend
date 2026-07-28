const meses = [
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

function MesSelector({
  mes,
  anio,
  setMes,
  setAnio,
  darkMode,
}) {

  // ============================
  // Mes anterior
  // ============================

  const mesAnterior = () => {

    if (mes === 1) {

      setMes(12);
      setAnio((prev) => prev - 1);

    } else {

      setMes((prev) => prev - 1);

    }

  };

  // ============================
  // Mes siguiente
  // ============================

  const mesSiguiente = () => {

    if (mes === 12) {

      setMes(1);
      setAnio((prev) => prev + 1);

    } else {

      setMes((prev) => prev + 1);

    }

  };

  // ============================

  const buttonStyle = {
    width: "42px",
    height: "42px",

    borderRadius: "50%",

    border: "none",

    cursor: "pointer",

    fontSize: "20px",

    background: darkMode
      ? "#334155"
      : "#e2e8f0",

    color: darkMode
      ? "white"
      : "#111827",

    transition: ".25s",
  };

  return (

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        gap: "20px",

        marginBottom: "30px",
      }}
    >

      <button
        onClick={mesAnterior}
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        ◀
      </button>

      <h3
        style={{
          margin: 0,

          minWidth: "190px",

          textAlign: "center",

          color: darkMode
            ? "#fff"
            : "#111827",
        }}
      >
        {meses[mes - 1]} {anio}
      </h3>

      <button
        onClick={mesSiguiente}
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        ▶
      </button>

    </div>

  );

}

export default MesSelector;