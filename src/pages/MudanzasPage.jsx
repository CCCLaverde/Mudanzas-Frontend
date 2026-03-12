import { useEffect, useState } from "react";
import MudanzaForm from "../components/MudanzaForm";
import MudanzaList from "../components/MudanzaList";
import MudanzaFilter from "../components/MudanzaFilter";
import { obtenerMudanzas } from "../services/mudanzaService";

function MudanzasPage() {

  const [mudanzas, setMudanzas] = useState([]);

  const cargarMudanzas = async () => {
    try {
      const data = await obtenerMudanzas();
      setMudanzas(data);
    } catch (error) {
      console.error("Error cargando mudanzas", error);
    }
  };

  useEffect(() => {
    cargarMudanzas();
  }, []);

const handleFilter = async (filters) => {
  try {

    let url = "http://localhost:8080/mudanzas";

    if (filters.fecha) {
      url = `http://localhost:8080/mudanzas/fecha?fecha=${filters.fecha}`;
    }

    if (filters.estado) {
      url = `http://localhost:8080/mudanzas/estado?estado=${filters.estado}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    setMudanzas(data);

  } catch (error) {
    console.error("Error filtrando mudanzas", error);
  }
};

  return (
    <div>

      <h1>Gestión de Mudanzas</h1>

      <MudanzaForm onMudanzaCreada={cargarMudanzas} />

      <MudanzaFilter onFilter={handleFilter} />

      <MudanzaList mudanzas={mudanzas} />

    </div>
  );
}

export default MudanzasPage;