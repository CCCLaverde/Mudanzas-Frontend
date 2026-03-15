import { useEffect, useState } from "react";
import MudanzaForm from "../components/MudanzaForm";
import MudanzaList from "../components/MudanzaList";
import MudanzaFilter from "../components/MudanzaFilter";
import { obtenerMudanzas, eliminarMudanza } from "../services/mudanzaService";

function MudanzasPage() {

  const [mudanzas, setMudanzas] = useState([]);
  const [mudanzaEditar, setMudanzaEditar] = useState(null);
  const [mudanzasHoy, setMudanzasHoy] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const backgroundColor = darkMode ? "#0f172a" : "#f4f6fb";
  const cardColor = darkMode ? "#1e293b" : "#ffffff";
  const textColor = darkMode ? "#e2e8f0" : "#333";

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

  const handleEliminar = async (id) => {

    const confirmar = window.confirm("¿Seguro que quieres eliminar esta mudanza?");
    if (!confirmar) return;

    try {

      await eliminarMudanza(id);

      cargarMudanzas();
      cargarMudanzasHoy();

    } catch (error) {
      console.error("Error eliminando mudanza", error);
    }
  };

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
        transition: "all 0.3s ease",
      }}
    >

      {/* CONTENEDOR PRINCIPAL CON NEON */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          borderRadius: "20px",
          padding: "30px",
          background: cardColor,
          border: darkMode
            ? "1px solid rgba(56,189,248,0.4)"
            : "1px solid #e5e7eb",

          boxShadow: darkMode
            ? "0 0 8px #38bdf8, 0 0 20px #38bdf8, 0 0 40px rgba(56,189,248,0.6)"
            : "0 0 15px rgba(0,170,255,0.15)",

          transition: "all 0.3s ease",
          color: textColor,
          borderRadius: "12px",
        }}
      >

        {/* BOTON MODO OSCURO */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "15px"
          }}
        >
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              border: "none",
              background: darkMode ? "#38bdf8" : "#111",
              color: "white",
              cursor: "pointer"
            }}
          >
            {darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
          </button>
        </div>

        {/* BANNER MUDANZAS HOY */}
        <div
          style={{
            background: darkMode ? "#020617" : "#f9fafb",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "25px",
            border: darkMode ? "1px solid #334155" : "1px solid #e5e7eb",
            boxShadow: "0 0 10px rgba(0,170,255,0.15)"
          }}
        >

          <h3 style={{ marginBottom: "15px" }}>
            🚚 Mudanzas de Hoy ({mudanzasHoy.length})
          </h3>

          {mudanzasHoy.length === 0 ? (
            <p>No hay mudanzas programadas hoy.</p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "10px"
              }}
            >

              {mudanzasHoy.map((m) => (
                <div
                  key={m.id}
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    background: darkMode ? "#020617" : "#ffffff",
                    border: darkMode ? "1px solid #334155" : "1px solid #eee"
                  }}
                >

                  <strong>{m.hora}</strong>

                  <p style={{ margin: "4px 0" }}>
                    {m.lugarRecogida}
                  </p>

                  <p style={{ margin: 0 }}>
                    → {m.lugarEntrega}
                  </p>

                </div>
              ))}

            </div>
          )}

        </div>

        <MudanzaForm
          darkMode={darkMode}
          onMudanzaCreada={() => {
            cargarMudanzas();
            cargarMudanzasHoy();
          }}
          mudanzaEditar={mudanzaEditar}
          setMudanzaEditar={setMudanzaEditar}
        />

        <MudanzaFilter
          darkMode={darkMode}
          onFilter={handleFilter}
        />

        <MudanzaList
          mudanzas={mudanzas}
          darkMode={darkMode}
          onEditar={setMudanzaEditar}
          onEliminar={handleEliminar}
        />

      </div>

    </div>
  );
}

export default MudanzasPage;