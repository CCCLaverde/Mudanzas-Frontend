import { useState } from "react";
import MudanzasPage from "./pages/MudanzasPage";

function App() {

  const [darkMode, setDarkMode] = useState(false);

  const backgroundColor = darkMode ? "#020617" : "#f4f6fb";
  const headerColor = darkMode ? "#0f172a" : "#ffffff";
  const textColor = darkMode ? "#e2e8f0" : "#0d6efd";
  const subTextColor = darkMode ? "#94a3b8" : "#6c757d";
  const borderColor = darkMode ? "#334155" : "#dbe3ef";

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: backgroundColor,
        fontFamily: "Arial, sans-serif",
        transition: "all .3s ease",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          padding: "30px 40px",
          borderBottom: `1px solid ${borderColor}`,
          background: headerColor,
          boxShadow: darkMode
            ? "0 2px 15px rgba(0,0,0,.45)"
            : "0 2px 10px rgba(0,0,0,.05)",
          transition: "all .3s ease",
        }}
      >
        <h1
          style={{
            margin: 0,
            textAlign: "center",
            fontSize: "2.3rem",
            color: textColor,
            letterSpacing: "1px",
            fontWeight: "700",
          }}
        >
          🚚 Sistema de Gestión de Mudanzas
        </h1>

        <p
          style={{
            marginTop: "8px",
            textAlign: "center",
            color: subTextColor,
            fontSize: "15px",
          }}
        >
          Gestión de clientes, colaboradores y programación de servicios
        </p>
      </header>

      {/* CONTENIDO */}
      <main
        style={{
          padding: "35px",
        }}
      >
        
        <MudanzasPage
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      </main>
    </div>
  );
}

export default App;