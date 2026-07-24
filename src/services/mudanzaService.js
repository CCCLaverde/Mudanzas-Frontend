const API_URL = "http://localhost:8080/mudanzas";

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

  // =====================================
  // TODAS
  // =====================================
  else {

    url = API_URL;

  }

  console.log("Consultando:", url);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Error al obtener mudanzas");
  }

  return await response.json();
};

// =======================================
// CREAR
// =======================================
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

// =======================================
// ACTUALIZAR
// =======================================
export const actualizarMudanza = async (id, mudanza) => {

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mudanza),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar mudanza");
  }

  return await response.json();
};

// =======================================
// ELIMINAR
// =======================================
export const eliminarMudanza = async (id) => {

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar mudanza");
  }

};