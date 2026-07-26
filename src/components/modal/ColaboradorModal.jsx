import { useEffect, useState } from "react";
import {
  obtenerColaboradores,
  crearColaborador,
  actualizarColaborador,
  activarColaborador,
  desactivarColaborador,
} from "../../services/colaboradorService";

import Modal from "./Modal";
import ColaboradorForm from "../colaboradores/ColaboradorForm";
import ColaboradorList from "../colaboradores/ColaboradorList";

function ColaboradorModal({
  darkMode,
  onClose,
}) {

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [colaboradores, setColaboradores] = useState([]);

  const [colaboradorEditar, setColaboradorEditar] = useState(null);

  // =====================================
  // CARGAR COLABORADORES
  // =====================================

  const cargarColaboradores = async () => {

    try {

      const data = await obtenerColaboradores();

      setColaboradores(data);

    } catch (error) {

      console.error("Error cargando colaboradores:", error);

    }

  };

  // =====================================
  // AL ABRIR EL MODAL
  // =====================================

  useEffect(() => {

    cargarColaboradores();

  }, []);

  // =====================================
  // GUARDAR (CREAR / EDITAR)
  // =====================================

  const handleGuardar = async (datos) => {

    try {

      if (datos.id) {

        await actualizarColaborador(datos.id, datos);

      } else {

        await crearColaborador(datos);

      }

      await cargarColaboradores();

      setMostrarFormulario(false);

      setColaboradorEditar(null);

    } catch (error) {

      console.error("Error guardando colaborador:", error);

    }

  };

  // =====================================
  // CANCELAR
  // =====================================

  const handleCancelar = () => {

    setMostrarFormulario(false);

    setColaboradorEditar(null);

  };

  // =====================================
  // EDITAR
  // =====================================

  const handleEditar = (colaborador) => {

    setColaboradorEditar(colaborador);

    setMostrarFormulario(true);

  };

  // =====================================
  // ACTIVAR
  // =====================================

  const handleActivar = async (colaborador) => {

    try {

      await activarColaborador(colaborador.id);

      await cargarColaboradores();

    } catch (error) {

      console.error(error);

    }

  };

  // =====================================
  // DESACTIVAR
  // =====================================

  const handleDesactivar = async (colaborador) => {

    try {

      await desactivarColaborador(colaborador.id);

      await cargarColaboradores();

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <Modal
      darkMode={darkMode}
      onClose={onClose}
    >

      <div
        style={{
          padding: "35px",
        }}
      >

        {/* ENCABEZADO */}

        <div
          style={{
            marginBottom: "30px",
          }}
        >

          <h2
            style={{
              margin: 0,
              fontSize: "28px",
            }}
          >
            👷 Administración de Colaboradores
          </h2>

          <p
            style={{
              marginTop: "8px",
              opacity: ".75",
            }}
          >
            Aquí podrás crear, editar, activar y desactivar colaboradores.
          </p>

        </div>

        {/* BOTÓN NUEVO */}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "25px",
          }}
        >

          <button
            onClick={() => {

              setColaboradorEditar(null);

              setMostrarFormulario(true);

            }}
            style={{
              padding: "12px 20px",
              background: "#0d6efd",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            ➕ Nuevo colaborador
          </button>

        </div>

        {/* FORMULARIO */}

        {mostrarFormulario && (

          <div
            style={{
              marginBottom: "35px",
            }}
          >

            <ColaboradorForm
              darkMode={darkMode}
              colaboradorEditar={colaboradorEditar}
              onGuardar={handleGuardar}
              onCancelar={handleCancelar}
            />

          </div>

        )}

        {/* LISTA */}

        <ColaboradorList
          colaboradores={colaboradores}
          darkMode={darkMode}
          onEditar={handleEditar}
          onActivar={handleActivar}
          onDesactivar={handleDesactivar}
        />

      </div>

    </Modal>

  );

}

export default ColaboradorModal;