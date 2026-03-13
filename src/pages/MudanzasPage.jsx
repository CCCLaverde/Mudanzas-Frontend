import { useEffect, useState } from "react";
import MudanzaForm from "../components/MudanzaForm";
import MudanzaList from "../components/MudanzaList";
import MudanzaFilter from "../components/MudanzaFilter";
import { obtenerMudanzas } from "../services/mudanzaService";
import { eliminarMudanza } from "../services/mudanzaService";

function MudanzasPage() {

  const [mudanzas, setMudanzas] = useState([]);
  const [mudanzaEditar, setMudanzaEditar] = useState(null);
  const [mudanzasHoy, setMudanzasHoy] = useState([]);

  const handleEliminar = async (id) => {

  const confirmar = window.confirm("¿Seguro que quieres eliminar esta mudanza?");

  if (!confirmar) return;

  try {

    await eliminarMudanza(id);

    cargarMudanzas(); // refrescar lista

  } catch (error) {
    console.error("Error eliminando mudanza", error);
  }
};

  const cargarMudanzas = async () => {
    try {
      const data = await obtenerMudanzas();
      setMudanzas(data);
    } catch (error) {
      console.error("Error cargando mudanzas", error);
    }
  };

  const cargarMudanzasHoy = async () => {
  try {

    const hoy = new Date().toISOString().split("T")[0];

    const response = await fetch(
      `http://localhost:8080/mudanzas/fecha?fecha=${hoy}`
    );

    const data = await response.json();

    setMudanzasHoy(data);

  } catch (error) {
    console.error("Error cargando mudanzas de hoy", error);
  }
};

    useEffect(() => {
    cargarMudanzas();
    cargarMudanzasHoy();
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

              {mudanzasHoy.length > 0 && (
          <div
            style={{
              background: "#f0f8ff",
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "20px",
            }}
          >
            <h3>🚚 Mudanzas para hoy ({mudanzasHoy.length})</h3>

            <ul>
              {mudanzasHoy.map((m) => (
                <li key={m.id}>
                  <strong>{m.hora}</strong> — {m.lugarRecogida} → {m.lugarEntrega}
                </li>
              ))}
            </ul>
          </div>
        )}

      <h1>Gestión de Mudanzas</h1>

      <MudanzaForm
        onMudanzaCreada={cargarMudanzas}
        mudanzaEditar={mudanzaEditar}
        setMudanzaEditar={setMudanzaEditar}
      />
      <MudanzaFilter onFilter={handleFilter} />

      <MudanzaList
        mudanzas={mudanzas}
        onEditar={setMudanzaEditar}
        onEliminar={handleEliminar}
      />

    </div>
  );
}

export default MudanzasPage;