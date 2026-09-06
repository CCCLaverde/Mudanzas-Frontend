import api from "./api";

const API_URL = "/colaboradores";

// =========================
// OBTENER
// =========================

export const obtenerColaboradores = async () => {
  const response = await api.get(API_URL);
  return response.data;
};

export const obtenerColaboradoresActivos = async () => {
  const response = await api.get(`${API_URL}/estado/ACTIVO`);
  return response.data;
};

export const obtenerColaboradoresInactivos = async () => {
  const response = await api.get(`${API_URL}/estado/INACTIVO`);
  return response.data;
};

export const obtenerColaboradorPorId = async (id) => {
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
};

// =========================
// BUSCAR
// =========================

export const buscarColaboradores = async (nombre) => {
  const response = await api.get(`${API_URL}/buscar`, {
    params: { nombre },
  });

  return response.data;
};

// =========================
// CREAR
// =========================

export const crearColaborador = async (colaborador) => {
  const response = await api.post(API_URL, colaborador);
  return response.data;
};

// =========================
// ACTUALIZAR
// =========================

export const actualizarColaborador = async (id, colaborador) => {
  const response = await api.put(`${API_URL}/${id}`, colaborador);
  return response.data;
};

// =========================
// ESTADO
// =========================

export const activarColaborador = async (id) => {
  await api.put(`${API_URL}/${id}/activar`);
};

export const desactivarColaborador = async (id) => {
  await api.put(`${API_URL}/${id}/desactivar`);
};

