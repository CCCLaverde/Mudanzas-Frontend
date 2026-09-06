
import api from "./api";

const API_URL = "/estadisticas";

// ========================================
// ESTADÍSTICAS DE COLABORADORES
// ========================================

export const obtenerEstadisticasColaboradores = async (mes, anio) => {
  const response = await api.get(
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

// ========================================
// INGRESOS
// ========================================

export const obtenerIngresos = async (fechaInicio, fechaFin) => {
  const response = await api.get(
    `${API_URL}/ingresos`,
    {
      params: {
        fechaInicio,
        fechaFin,
      },
    }
  );

  return response.data;
};

