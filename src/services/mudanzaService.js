
import api from "./api";

const API_URL = "/mudanzas";

// =======================================
// OBTENER MUDANZAS
// =======================================
export const obtenerMudanzas = async (filtros = {}) => {

  let url = API_URL;

  // =====================================
  // RANGO + COLABORADOR
  // =====================================
  if (
    filtros.fechaInicio &&
    filtros.fechaFin &&
    filtros.colaboradorId
  ) {

    url =
      `${API_URL}/rango-colaborador?` +
      `inicio=${filtros.fechaInicio}&` +
      `fin=${filtros.fechaFin}&` +
      `colaboradorId=${filtros.colaboradorId}`;

  }

  // =====================================
  // FECHA + COLABORADOR
  // =====================================
  else if (
    filtros.fechaInicio &&
    filtros.fechaInicio === filtros.fechaFin &&
    filtros.colaboradorId
  ) {

    url =
      `${API_URL}/fecha-colaborador?` +
      `fecha=${filtros.fechaInicio}&` +
      `colaboradorId=${filtros.colaboradorId}`;

  }

  // =====================================
  // SOLO COLABORADOR
  // =====================================
  else if (filtros.colaboradorId) {

    url = `${API_URL}/colaborador/${filtros.colaboradorId}`;

  }

  // =====================================
  // SOLO RANGO DE FECHAS
  // =====================================
  else if (
    filtros.fechaInicio &&
    filtros.fechaFin &&
    filtros.fechaInicio !== filtros.fechaFin
  ) {

    url =
      `${API_URL}/rango?` +
      `inicio=${filtros.fechaInicio}&` +
      `fin=${filtros.fechaFin}`;

  }

  // =====================================
  // SOLO UNA FECHA
  // =====================================
  else if (
    filtros.fechaInicio &&
    filtros.fechaInicio === filtros.fechaFin
  ) {

    url = `${API_URL}/fecha?fecha=${filtros.fechaInicio}`;

  }

  // =====================================
  // SOLO ESTADO
  // =====================================
  else if (filtros.estado) {

    url = `${API_URL}/estado?estado=${filtros.estado}`;

  }

  console.log("Consultando:", url);

  const response = await api.get(url);

  return response.data;
};

// =======================================
// CREAR
// =======================================
export const crearMudanza = async (mudanza) => {

  const response = await api.post(API_URL, mudanza);

  return response.data;
};

// =======================================
// ACTUALIZAR
// =======================================
export const actualizarMudanza = async (id, mudanza) => {

  const response = await api.put(`${API_URL}/${id}`, mudanza);

  return response.data;
};

// =======================================
// ELIMINAR
// =======================================
export const eliminarMudanza = async (id) => {

  await api.delete(`${API_URL}/${id}`);

};

