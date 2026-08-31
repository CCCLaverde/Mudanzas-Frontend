import { useEffect, useState } from "react";
import { obtenerIngresos } from "../../services/estadisticaService";

function IngresosEstadistica({ darkMode }) {
  const [ingresos, setIngresos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Semana que estamos visualizando
  const [semanaOffset, setSemanaOffset] = useState(0);

  // =========================
  // COLORES
  // =========================

  const cardBackground = darkMode ? "#1e293b" : "#ffffff";
  const textColor = darkMode ? "#e2e8f0" : "#1f2937";
  const secondaryText = darkMode ? "#94a3b8" : "#6b7280";
  const borderColor = darkMode ? "#334155" : "#e5e7eb";
  const chartBackground = darkMode ? "#0f172a" : "#f8fafc";

  // =========================
  // FORMATO YYYY-MM-DD
  // =========================

  const formatearFechaAPI = (fecha) => {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");

    return `${anio}-${mes}-${dia}`;
  };

  // =========================
  // OBTENER RANGO DE SEMANA
  // =========================

  const obtenerRangoSemana = (offset = 0) => {
    const hoy = new Date();

    const diaSemana = hoy.getDay();

    const diferenciaLunes =
      diaSemana === 0 ? -6 : 1 - diaSemana;

    const lunes = new Date(hoy);

    lunes.setHours(0, 0, 0, 0);

    lunes.setDate(
      hoy.getDate() + diferenciaLunes + offset * 7
    );

    const domingo = new Date(lunes);

    domingo.setDate(lunes.getDate() + 6);

    return {
      inicio: formatearFechaAPI(lunes),
      fin: formatearFechaAPI(domingo),
      lunes,
      domingo,
    };
  };

  // =========================
  // TEXTO DE LA SEMANA
  // =========================

  const obtenerTextoSemana = () => {
    const { lunes, domingo } =
      obtenerRangoSemana(semanaOffset);

    const opciones = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };

    const inicio = lunes.toLocaleDateString(
      "es-CO",
      opciones
    );

    const fin = domingo.toLocaleDateString(
      "es-CO",
      opciones
    );

    return `${inicio} - ${fin}`;
  };

  // =========================
  // CARGAR INGRESOS
  // =========================

  const cargarIngresos = async () => {
    try {
      setLoading(true);
      setError("");

      const { inicio, fin } =
        obtenerRangoSemana(semanaOffset);

      const data = await obtenerIngresos(
        inicio,
        fin
      );

      setIngresos(data || []);
    } catch (error) {
      console.error(
        "Error cargando ingresos:",
        error
      );

      setError(
        "No fue posible cargar las estadísticas de ingresos."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // RECARGAR AL CAMBIAR SEMANA
  // =========================

  useEffect(() => {
    cargarIngresos();
  }, [semanaOffset]);

  // =========================
  // FORMATEAR DINERO
  // =========================

  const formatearPesos = (valor) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(Number(valor) || 0);
  };

  // =========================
  // CREAR LOS 7 DÍAS
  // =========================

  const obtenerDiasSemana = () => {
    const { lunes } =
      obtenerRangoSemana(semanaOffset);

    const dias = [];

    for (let i = 0; i < 7; i++) {
      const fecha = new Date(lunes);

      fecha.setDate(lunes.getDate() + i);

      dias.push({
        fecha: formatearFechaAPI(fecha),
        nombre: fecha.toLocaleDateString(
          "es-CO",
          { weekday: "short" }
        ),
        dia: fecha.getDate(),
        valor: 0,
      });
    }

    return dias;
  };

  // =========================
  // UNIR INGRESOS CON LOS 7 DÍAS
  // =========================

  const datosSemana = obtenerDiasSemana().map(
    (dia) => {
      const ingreso = ingresos.find(
        (item) => item.fecha === dia.fecha
      );

      return {
        ...dia,
        valor: ingreso
          ? Number(ingreso.totalIngresos) || 0
          : 0,
      };
    }
  );

  // =========================
  // TOTAL INGRESOS
  // =========================

  const totalIngresos = datosSemana.reduce(
    (total, dia) => total + dia.valor,
    0
  );

  // =========================
  // PROMEDIO DIARIO
  // =========================

  const promedioDiario =
    totalIngresos / 7;

  // =========================
  // MAYOR INGRESO
  // =========================

  const mayorIngreso = datosSemana.reduce(
    (mayor, dia) =>
      dia.valor > mayor.valor
        ? dia
        : mayor,
    {
      valor: 0,
      nombre: "",
      dia: "",
    }
  );

  // =========================
  // ALTURA DE LAS BARRAS
  // =========================

  const maxIngreso = Math.max(
    ...datosSemana.map((dia) => dia.valor),
    1
  );

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div
        style={{
          padding: "30px",
          textAlign: "center",
          color: textColor,
        }}
      >
        Cargando estadísticas de ingresos...
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div
        style={{
          padding: "20px",
          borderRadius: "12px",
          background: darkMode
            ? "#450a0a"
            : "#fef2f2",
          border: "1px solid #ef4444",
          color: darkMode
            ? "#fecaca"
            : "#b91c1c",
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        color: textColor,
      }}
    >
      {/* =========================
          TÍTULO
      ========================= */}

      <h2
        style={{
          marginBottom: "20px",
          color: textColor,
        }}
      >
        💰 Estadísticas de ingresos
      </h2>

      {/* =========================
          NAVEGACIÓN DE SEMANA
      ========================= */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
          gap: "10px",
        }}
      >
        <button
          onClick={() =>
            setSemanaOffset(
              (prev) => prev - 1
            )
          }
          style={{
            width: "45px",
            height: "40px",
            borderRadius: "8px",
            border: `1px solid ${borderColor}`,
            background: cardBackground,
            color: textColor,
            cursor: "pointer",
            fontSize: "20px",
          }}
        >
          ←
        </button>

        <div
          style={{
            textAlign: "center",
          }}
        >
          <strong
            style={{
              display: "block",
              fontSize: "17px",
              color: textColor,
            }}
          >
            📅{" "}
            {semanaOffset === 0
              ? "Esta semana"
              : semanaOffset === -1
              ? "Semana anterior"
              : semanaOffset === 1
              ? "Semana siguiente"
              : `Semana ${
                  semanaOffset > 0
                    ? `+${semanaOffset}`
                    : semanaOffset
                }`}
          </strong>

          <span
            style={{
              color: secondaryText,
              fontSize: "14px",
            }}
          >
            {obtenerTextoSemana()}
          </span>
        </div>

        <button
          onClick={() =>
            setSemanaOffset(
              (prev) => prev + 1
            )
          }
          style={{
            width: "45px",
            height: "40px",
            borderRadius: "8px",
            border: `1px solid ${borderColor}`,
            background: cardBackground,
            color: textColor,
            cursor: "pointer",
            fontSize: "20px",
          }}
        >
          →
        </button>
      </div>

      {/* =========================
          RESUMEN
      ========================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        {/* TOTAL */}

        <div
          style={{
            background: cardBackground,
            border: `1px solid ${borderColor}`,
            borderRadius: "14px",
            padding: "20px",
            boxShadow: darkMode
              ? "0 4px 12px rgba(0,0,0,0.25)"
              : "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <p
            style={{
              margin: 0,
              color: secondaryText,
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            💵 Total semanal
          </p>

          <h2
            style={{
              margin: "8px 0 0",
              color: "#198754",
              fontSize: "25px",
            }}
          >
            {formatearPesos(totalIngresos)}
          </h2>
        </div>

        {/* PROMEDIO */}

        <div
          style={{
            background: cardBackground,
            border: `1px solid ${borderColor}`,
            borderRadius: "14px",
            padding: "20px",
            boxShadow: darkMode
              ? "0 4px 12px rgba(0,0,0,0.25)"
              : "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <p
            style={{
              margin: 0,
              color: secondaryText,
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            📊 Promedio diario
          </p>

          <h2
            style={{
              margin: "8px 0 0",
              color: "#0d6efd",
              fontSize: "25px",
            }}
          >
            {formatearPesos(
              promedioDiario
            )}
          </h2>
        </div>

        {/* MEJOR DÍA */}

        <div
          style={{
            background: cardBackground,
            border: `1px solid ${borderColor}`,
            borderRadius: "14px",
            padding: "20px",
            boxShadow: darkMode
              ? "0 4px 12px rgba(0,0,0,0.25)"
              : "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <p
            style={{
              margin: 0,
              color: secondaryText,
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            🏆 Mejor día
          </p>

          <h2
            style={{
              margin: "8px 0 0",
              color: "#f59e0b",
              fontSize: "18px",
            }}
          >
            {mayorIngreso.valor > 0
              ? `${mayorIngreso.nombre} ${mayorIngreso.dia}`
              : "Sin ingresos"}
          </h2>

          <p
            style={{
              margin: "5px 0 0",
              color: secondaryText,
              fontSize: "14px",
            }}
          >
            {mayorIngreso.valor > 0
              ? formatearPesos(
                  mayorIngreso.valor
                )
              : "—"}
          </p>
        </div>
      </div>

      {/* =========================
          GRÁFICO
      ========================= */}

      <div
        style={{
          background: cardBackground,
          border: `1px solid ${borderColor}`,
          borderRadius: "14px",
          padding: "25px",
          boxShadow: darkMode
            ? "0 4px 12px rgba(0,0,0,0.25)"
            : "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: "25px",
            color: textColor,
          }}
        >
          📊 Ingresos por día
        </h3>

        <div
          style={{
            height: "300px",
            background: chartBackground,
            borderRadius: "12px",
            padding: "20px 15px 10px",
            display: "flex",
            alignItems: "flex-end",
            gap: "12px",
            border: `1px solid ${borderColor}`,
          }}
        >
          {datosSemana.map((dia) => {
            const altura =
              dia.valor === 0
                ? 4
                : Math.max(
                    (dia.valor /
                      maxIngreso) *
                      220,
                    8
                  );

            return (
              <div
                key={dia.fecha}
                style={{
                  flex: 1,
                  height: "100%",
                  display: "flex",
                  flexDirection:
                    "column",
                  justifyContent:
                    "flex-end",
                  alignItems:
                    "center",
                  gap: "8px",
                }}
              >
                {/* VALOR */}

                <span
                  style={{
                    fontSize: "11px",
                    color:
                      dia.valor > 0
                        ? "#198754"
                        : secondaryText,
                    fontWeight:
                      dia.valor > 0
                        ? "bold"
                        : "normal",
                    textAlign: "center",
                    whiteSpace:
                      "nowrap",
                  }}
                >
                  {dia.valor > 0
                    ? formatearPesos(
                        dia.valor
                      )
                    : "$0"}
                </span>

                {/* BARRA */}

                <div
                  title={`${dia.nombre} ${dia.dia}: ${formatearPesos(
                    dia.valor
                  )}`}
                  style={{
                    width: "100%",
                    maxWidth: "55px",
                    height: `${altura}px`,
                    minHeight: "4px",
                    borderRadius:
                      "7px 7px 3px 3px",
                    background:
                      dia.valor > 0
                        ? "#198754"
                        : darkMode
                        ? "#334155"
                        : "#d1d5db",
                    transition:
                      "height 0.3s ease",
                  }}
                />

                {/* DÍA */}

                <div
                  style={{
                    textAlign:
                      "center",
                    color:
                      textColor,
                    fontSize: "12px",
                    minHeight: "32px",
                  }}
                >
                  <strong
                    style={{
                      display:
                        "block",
                      textTransform:
                        "capitalize",
                    }}
                  >
                    {dia.nombre}
                  </strong>

                  <span
                    style={{
                      color:
                        secondaryText,
                    }}
                  >
                    {dia.dia}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <p
          style={{
            marginTop: "15px",
            marginBottom: 0,
            color: secondaryText,
            fontSize: "13px",
          }}
        >
          💡 Solo se cuentan las mudanzas cuyo
          estado de pago es <strong>PAGADO</strong>.
        </p>
      </div>
    </div>
  );
}

export default IngresosEstadistica;
