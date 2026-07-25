import Modal from "./Modal";
import MudanzaForm from "../mudanzas/MudanzaForm";

function MudanzaModal({
  darkMode,
  onClose,
  onMudanzaCreada,
  mudanzaEditar,
  setMudanzaEditar,
}) {

  const handleGuardado = () => {
    onMudanzaCreada();
    onClose();
  };

  return (
    <Modal
      darkMode={darkMode}
      onClose={onClose}
    >
      <MudanzaForm
        darkMode={darkMode}
        onMudanzaCreada={handleGuardado}
        mudanzaEditar={mudanzaEditar}
        setMudanzaEditar={setMudanzaEditar}
      />
    </Modal>
  );
}

export default MudanzaModal;