import axios from "axios";

const API_URL = "http://localhost:8080/colaboradores";

export const obtenerColaboradoresActivos = async () => {
  const response = await axios.get(`${API_URL}/estado/ACTIVO`);
  return response.data;
};