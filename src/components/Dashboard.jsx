import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut, Bar } from "react-chartjs-2";



ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function Dashboard({ mudanzas, mudanzasHoy, darkMode }) {
  // =====================================
  // ESTADÍSTICAS
  // =====================================

  const total = mudanzas.length;

  const pendientes = mudanzas.filter(
    (m) => m.estado === "PENDIENTE"
  ).length;

  const enProceso = mudanzas.filter(
    (m) => m.estado === "EN_PROCESO"
  ).length;

  const finalizadas = mudanzas.filter(
    (m) => m.estado === "FINALIZADA"
  ).length;

  const canceladas = mudanzas.filter(
    (m) => m.estado === "CANCELADA"
  ).length;

  const hoy = mudanzasHoy.length;


   // =====================================
// MUDANZAS POR MES
// =====================================

const meses = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

const conteoMeses = Array(12).fill(0);

mudanzas.forEach((mudanza) => {
  const fecha = new Date(mudanza.fecha);

  const mes = fecha.getMonth(); // 0 - 11

  conteoMeses[mes]++;
});

const mudanzaMes = meses.map((mes, index) => ({
  mes,
  cantidad: conteoMeses[index],
}));


// =====================================
// DATOS GRÁFICO DE BARRAS
// =====================================

const barrasData = {
  labels: mudanzaMes.map((d) => d.mes),

  datasets: [
    {
      label: "Mudanzas",

      data: mudanzaMes.map((d) => d.cantidad),

      backgroundColor: "#3b82f6",

      borderRadius: 8,

      borderSkipped: false,
    },
  ],
};

const barrasOptions = {
  responsive: true,

  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: false,
    },
  },

  scales: {
    x: {
      grid: {
        display: false,
      },

      ticks: {
        color: darkMode ? "#cbd5e1" : "#475569",
      },
    },

    y: {
      beginAtZero: true,

      ticks: {
        stepSize: 1,
        color: darkMode ? "#cbd5e1" : "#475569",
      },

      grid: {
        color: darkMode ? "#334155" : "#e5e7eb",
      },
    },
  },
};


   //===================================


  const data = {
  labels: [
    "Pendientes",
    "En proceso",
    "Finalizadas",
    "Canceladas",
  ],
  datasets: [
    {
      data: [
        pendientes,
        enProceso,
        finalizadas,
        canceladas,
      ],
      backgroundColor: [
        "#f59e0b",
        "#8b5cf6",
        "#10b981",
        "#ef4444",
      ],
      borderWidth: 0,
      hoverOffset: 12,
    },
  ],
};
// =====================================
const options = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      position: "bottom",

      labels: {
        color: darkMode ? "#ffffff" : "#111827",
        padding: 20,
        font: {
          size: 14,
        },
      },
    },

    tooltip: {
      enabled: true,
    },
  },

  cutout: "68%",
};

  // =====================================
  // TARJETA
  // =====================================

  const Card = ({ icono, titulo, valor, color }) => (
    <div
      style={{
        cursor: "pointer",
        overflow: "hidden",

        background: darkMode
          ? "linear-gradient(145deg,#1e293b,#0f172a)"
          : "linear-gradient(145deg,#ffffff,#f8fbff)",

        border: `1px solid ${
          darkMode ? "#334155" : "#dbe4f0"
        }`,

        borderRadius: "18px",

        boxShadow: darkMode
          ? "0 10px 25px rgba(0,0,0,.35)"
          : "0 10px 25px rgba(0,0,0,.08)",

        transition: "all .25s ease",
      }}

      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-6px)";

        e.currentTarget.style.boxShadow =
          darkMode
            ? "0 18px 35px rgba(0,0,0,.45)"
            : "0 18px 35px rgba(0,0,0,.15)";
      }}

      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0)";

        e.currentTarget.style.boxShadow =
          darkMode
            ? "0 10px 25px rgba(0,0,0,.35)"
            : "0 10px 25px rgba(0,0,0,.08)";
      }}
    >

      {/* Barra superior */}
      <div
        style={{
          height: "6px",
          background: color,
        }}
      />

      <div
        style={{
          padding: "22px",
        }}
      >
        <div
          style={{
            fontSize: "34px",
            marginBottom: "18px",
          }}
        >
          {icono}
        </div>

        <div
          style={{
            fontSize: "15px",
            color: darkMode
              ? "#94a3b8"
              : "#64748b",

            marginBottom: "10px",
          }}
        >
          {titulo}
        </div>

        <div
          style={{
            fontSize: "48px",
            fontWeight: "700",
            color: darkMode
              ? "#ffffff"
              : "#0f172a",
          }}
        >
          {valor}
        </div>
      </div>
    </div>
  );

  

  // =====================================
  // VISTA
  // =====================================

  return (
  <div
    style={{
      marginBottom: "45px",
    }}
  >
    {/* ===========================
        ENCABEZADO
    ============================ */}

    <div
      style={{
        marginBottom: "25px",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "30px",
          color: darkMode ? "#ffffff" : "#0f172a",
        }}
      >
        📊 Panel de Control
      </h2>

      <p
        style={{
          marginTop: "8px",
          color: darkMode ? "#94a3b8" : "#64748b",
        }}
      >
        Resumen general de la operación del sistema.
      </p>
    </div>

    {/* ===========================
          TARJETAS KPI
    ============================ */}

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          window.innerWidth > 1450
            ? "repeat(6,1fr)"
            : "repeat(auto-fit,minmax(220px,1fr))",

        gap: "15px",
      }}
    >
      <Card
        icono="🚚"
        titulo="Total de Mudanzas"
        valor={total}
        color="#3b82f6"
      />

      <Card
        icono="📅"
        titulo="Programadas Hoy"
        valor={hoy}
        color="#06b6d4"
      />

      <Card
        icono="⏳"
        titulo="Pendientes"
        valor={pendientes}
        color="#f59e0b"
      />

      <Card
        icono="🚛"
        titulo="En Proceso"
        valor={enProceso}
        color="#8b5cf6"
      />

      <Card
        icono="✅"
        titulo="Finalizadas"
        valor={finalizadas}
        color="#10b981"
      />

      <Card
        icono="❌"
        titulo="Canceladas"
        valor={canceladas}
        color="#ef4444"
      />
    </div>

    {/* ===========================
          GRÁFICOS
    ============================ */}

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(500px,1fr))",
        gap: "25px",
        marginTop: "35px",
      }}
    >

      {/* DONA */}

      <div
        style={{
          background: darkMode
            ? "#1e293b"
            : "#ffffff",

          border: `1px solid ${
            darkMode ? "#334155" : "#e5e7eb"
          }`,

          borderRadius: "18px",

          padding: "25px",

          boxShadow: darkMode
            ? "0 10px 25px rgba(0,0,0,.35)"
            : "0 10px 25px rgba(0,0,0,.08)",
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: "25px",
            color: darkMode ? "#fff" : "#111827",
          }}
        >
            Estado de las Mudanzas
        </h3>

        <div
          style={{
            height: "380px",
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </div>
      </div>

      {/* BARRAS */}

      <div
        style={{
          background: darkMode
            ? "#1e293b"
            : "#ffffff",

          border: `1px solid ${
            darkMode ? "#334155" : "#e5e7eb"
          }`,

          borderRadius: "18px",

          padding: "25px",

          boxShadow: darkMode
            ? "0 10px 25px rgba(0,0,0,.35)"
            : "0 10px 25px rgba(0,0,0,.08)",
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: "25px",
            color: darkMode ? "#fff" : "#111827",
          }}
        >
          📈 Mudanzas por Mes
        </h3>

        <div
          style={{
            height: "380px",
          }}
        >
             <Bar
    data={barrasData}
    options={barrasOptions}
  />
          {/* Aquí irá el gráfico de barras */}
          <div
>
</div>
        </div>
      </div>

    </div>

  </div>
)}

export default Dashboard;