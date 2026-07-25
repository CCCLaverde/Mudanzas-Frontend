import { useEffect } from "react";

function Modal({
  children,
  onClose,
  darkMode,
}) {

  // Cerrar con ESC
  useEffect(() => {

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Evitar scroll del fondo
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };

  }, [onClose]);

  return (

    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,

        background: "rgba(0,0,0,.45)",

        backdropFilter: "blur(6px)",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        padding: "30px",

        zIndex: 9999,
      }}
    >

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "900px",
          maxHeight: "90vh",

          overflowY: "auto",

          borderRadius: "18px",

          background: darkMode
            ? "#1e293b"
            : "#ffffff",

          border: `1px solid ${
            darkMode
              ? "#334155"
              : "#e5e7eb"
          }`,

          boxShadow: "0 25px 60px rgba(0,0,0,.35)",

          position: "relative",
        }}
      >

        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "18px",
            right: "18px",

            width: "40px",
            height: "40px",

            borderRadius: "50%",

            border: "none",

            cursor: "pointer",

            fontSize: "18px",

            background: darkMode
              ? "#334155"
              : "#f3f4f6",

            color: darkMode
              ? "#fff"
              : "#111827",

            transition: ".2s",
          }}
        >
          ✕
        </button>

        {children}

      </div>

    </div>

  );

}

export default Modal;