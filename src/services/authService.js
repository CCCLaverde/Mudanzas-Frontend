import axios from "axios";

const API_URL = "http://localhost:8080/auth";

export const iniciarSesion = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    username,
    password,
  });

  const { token, username: usuario, rol } = response.data;

  // Guardamos la información de autenticación
  localStorage.setItem("token", token);
  localStorage.setItem("username", usuario);
  localStorage.setItem("rol", rol);

  return response.data;
};

export const cerrarSesion = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("rol");
};

export const obtenerToken = () => {
  return localStorage.getItem("token");
};

export const obtenerUsuario = () => {
  return localStorage.getItem("username");
};

export const obtenerRol = () => {
  return localStorage.getItem("rol");
};

export const estaAutenticado = () => {
  return !!localStorage.getItem("token");
};