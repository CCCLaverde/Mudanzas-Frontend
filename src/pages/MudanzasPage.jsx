import { useEffect, useState, useRef } from "react";

import Dashboard from "../components/Dashboard";
import MudanzaList from "../components/MudanzaList";
import MudanzaFilter from "../components/MudanzaFilter";

import MudanzaModal from "../components/modal/MudanzaModal";
import ColaboradorModal from "../components/modal/ColaboradorModal";
import TopToolbar from "../components/layout/TopToolbar";

import {
  obtenerMudanzas,
  eliminarMudanza,
} from "../services/mudanzaService";

function MudanzasPage({ darkMode, setDarkMode }) {

  const [todasMudanzas, setTodasMudanzas] = useState([]);
  const [mudanzas, setMudanzas] = useState([]);
  const [mudanzasHoy, setMudanzasHoy] = useState([]);

  const [mudanzaEditar, setMudanzaEditar] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarColaboradores, setMostrarColaboradores] = useState(false);

  const listaRef = useRef(null);

  const backgroundColor = darkMode ? "#0f172a" : "#f4f6fb";
  const textColor = darkMode ? "#e2e8f0" : "#333";

  // ==========================
  // CARGAR TODAS
  // ==========================

  const cargarMudanzas = async () => {
    try {
      const data = await obtenerMudanzas();

      setTodasMudanzas(data);
      setMudanzas(data);

    } catch (error) {
      console.error(error);
    }
  };

  // ==========================
  // MUDANZAS DE HOY
  // ==========================

  const cargarMudanzasHoy = async () => {

    try {

      const ahora = new Date();

      const hoy =
        ahora.getFullYear() +
        "-" +
        String(ahora.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(ahora.getDate()).padStart(2, "0");

      const response = await fetch(
        `http://localhost:8080/mudanzas/fecha?fecha=${hoy}`
      );

      const data = await response.json();

      setMudanzasHoy(data);

    } catch (error) {
      console.error(error);
    }

  };

  // ==========================
  // ELIMINAR
  // ==========================

  const handleEliminar = async (id) => {

    if (!window.confirm("¿Seguro que deseas eliminar esta mudanza?")) return;

    try {

      await eliminarMudanza(id);

      cargarMudanzas();
      cargarMudanzasHoy();

    } catch (error) {
      console.error(error);
    }

  };

  // ==========================
  // EDITAR
  // ==========================

  const handleEditar = (mudanza) => {

    setMudanzaEditar(mudanza);

    setMostrarModal(true);

  };

  // ==========================
  // SCROLL LISTA
  // ==========================

  const irALista = () => {

    setTimeout(() => {

      listaRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    }, 100);

  };

  // ==========================
  // FILTROS
  // ==========================

  const handleFilter = async (filters) => {

    try {

      const data = await obtenerMudanzas(filters);

      setMudanzas(data);

      irALista();

    } catch (error) {
      console.error(error);
    }

  };

  // ==========================

  useEffect(() => {

    cargarMudanzas();
    cargarMudanzasHoy();

  }, []);

  return (

    <div
      style={{
        background: backgroundColor,
        minHeight: "100vh",
        padding: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        borderRadius: "24px",
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "1600px",
          borderRadius: "24px",
          padding: "35px",
          background: darkMode
            ? "rgba(30,41,59,.95)"
            : "#fff",
          border: darkMode
            ? "1px solid #334155"
            : "1px solid #dbe4f0",
          boxShadow: darkMode
            ? "0 15px 35px rgba(0,0,0,.45)"
            : "0 15px 40px rgba(0,0,0,.08)",
          color: textColor,
        }}
      >

    <TopToolbar
  darkMode={darkMode}
  setDarkMode={setDarkMode}
  onNuevaMudanza={() => {
    setMudanzaEditar(null);
    setMostrarModal(true);
  }}
  onColaboradores={() => {
    setMostrarColaboradores(true);
  }}
/>
      
        {/* DASHBOARD */}

        <Dashboard
          mudanzas={todasMudanzas}
          mudanzasHoy={mudanzasHoy}
          darkMode={darkMode}
          onSeleccionarFiltro={handleFilter}
        />

        {/* FILTRO */}

        <MudanzaFilter
          darkMode={darkMode}
          onFilter={handleFilter}
        />

        {/* LISTA */}

        <div ref={listaRef}></div>

        <MudanzaList
          mudanzas={mudanzas}
          darkMode={darkMode}
          onEditar={handleEditar}
          onEliminar={handleEliminar}
        />

      </div>

      {/* MODAL */}

      {mostrarModal && (

        <MudanzaModal
          darkMode={darkMode}
          mudanzaEditar={mudanzaEditar}
          setMudanzaEditar={setMudanzaEditar}
          onClose={() => {

            setMostrarModal(false);

            setMudanzaEditar(null);

          }}
          onMudanzaCreada={() => {

            cargarMudanzas();

            cargarMudanzasHoy();

            setMostrarModal(false);

            setMudanzaEditar(null);

          }}
        />

      )}

          {/* MODAL COLABORADORES */}
        {mostrarColaboradores && (
      <ColaboradorModal
        darkMode={darkMode}
        onClose={() => setMostrarColaboradores(false)}
      />
    )}

    </div>

      

  );

}

export default MudanzasPage;