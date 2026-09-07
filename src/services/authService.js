import api from "./api";

export const iniciarSesion = async (username, password) => {
  const response = await api.post("/auth/login", {
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