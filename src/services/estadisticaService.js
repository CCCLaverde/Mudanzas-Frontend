import axios from "axios";

const API_URL = "http://localhost:8080/estadisticas";

// ========================================
// ESTADÍSTICAS DE COLABORADORES
// ========================================

export const obtenerEstadisticasColaboradores = async (mes, anio) => {

  const response = await axios.get(
    `${API_URL}/colaboradores`,
    {
      params: {
        mes,
        anio,
      },
    }
  );

  return response.data;
};