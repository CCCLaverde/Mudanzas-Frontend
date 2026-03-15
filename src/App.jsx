import MudanzasPage from "./pages/MudanzasPage";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6fb",
        fontFamily: "Arial, sans-serif",
        padding: "30px 20px"
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "2.2rem",
            color: "#333",
            letterSpacing: "1px"
          }}
        >
          🚚 Sistema de Mudanzas
        </h1>

        <MudanzasPage />
      </div>
    </div>
  );
}

export default App;