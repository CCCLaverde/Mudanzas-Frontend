import { useEffect, useState } from "react";

import { obtenerEstadisticasColaboradores } from "../../services/estadisticaService";

import MesSelector from "./MesSelector";
import ColaboradorChart from "./ColaboradorRanking";

function EstadisticasColaborador({ darkMode }) {

  // ============================
  // Fecha actual
  // ============================

  const hoy = new Date();

  const [mes, setMes] = useState(hoy.getMonth() + 1);

  const [anio, setAnio] = useState(hoy.getFullYear());

  // ============================
  // Datos
  // ============================

  const [estadisticas, setEstadisticas] = useState([]);

  const [loading, setLoading] = useState(false);

  // ============================
  // Cargar estadísticas
  // ============================

  const cargarEstadisticas = async () => {

    try {

      setLoading(true);

      const data =
        await obtenerEstadisticasColaboradores(
          mes,
          anio
        );

      setEstadisticas(data);

    } catch (error) {

      console.error(
        "Error cargando estadísticas",
        error
      );

    } finally {

      setLoading(false);

    }

  };

  // ============================
  // Cuando cambia el mes
  // ============================

  useEffect(() => {

    cargarEstadisticas();

  }, [mes, anio]);

  // ============================
  // Render
  // ============================

  return (

    <div
      style={{
        background: darkMode
          ? "#1e293b"
          : "#fff",

        borderRadius: "18px",

        padding: "25px",

        marginTop: "25px",

        border: darkMode
          ? "1px solid #334155"
          : "1px solid #e5e7eb",

        boxShadow: darkMode
          ? "0 10px 25px rgba(0,0,0,.35)"
          : "0 10px 25px rgba(0,0,0,.08)",
      }}
    >

      <h2
        style={{
          marginTop: 0,
          marginBottom: "20px",
        }}
      >
        👷 Productividad por colaborador
      </h2>

      <MesSelector
        mes={mes}
        anio={anio}
        setMes={setMes}
        setAnio={setAnio}
        darkMode={darkMode}
      />

      <ColaboradorChart
    estadisticas={estadisticas}
    darkMode={darkMode}
/>

    </div>

  );

}

export default EstadisticasColaborador;