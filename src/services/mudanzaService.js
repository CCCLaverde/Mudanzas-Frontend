const API_URL = "http://localhost:8080/mudanzas";

// 🔹 Obtener todas las mudanzas (con filtros opcionales)
export const obtenerMudanzas = async (filtros = {}) => {
  const queryParams = new URLSearchParams(filtros).toString();

  const response = await fetch(`${API_URL}?${queryParams}`);

  if (!response.ok) {
    throw new Error("Error al obtener mudanzas");
  }

  return await response.json();
};

// 🔹 Crear nueva mudanza
export const crearMudanza = async (mudanza) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mudanza),
  });

  if (!response.ok) {
    throw new Error("Error al crear mudanza");
  }

  return await response.json();
};