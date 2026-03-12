import { useState } from "react";

function MudanzaFilter({ onFilter }) {

  const [fecha, setFecha] = useState("");
  const [estado, setEstado] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onFilter({
      fecha,
      estado
    });
  };

  return (
    <form onSubmit={handleSubmit}>

      <h3>Filtrar Mudanzas</h3>

      <div>
        <label>Fecha</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
      </div>

      <div>
        <label>Estado</label>
      <select
  value={estado}
  onChange={(e) => setEstado(e.target.value)}
>
  <option value="">Todos</option>
  <option value="PENDIENTE">Pendiente</option>
  <option value="EN_PROCESO">En proceso</option>
  <option value="FINALIZADA">Finalizada</option>
  <option value="CANCELADA">Cancelada</option>
</select>
      </div>

      <button type="submit">Buscar</button>

    </form>
  );
}

export default MudanzaFilter;