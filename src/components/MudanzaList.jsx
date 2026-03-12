function MudanzaList({ mudanzas }) {
  if (!mudanzas || mudanzas.length === 0) {
    return <p>No hay mudanzas registradas.</p>;
  }

  return (
    <ul>
      {mudanzas.map((m) => (
        <li key={m.id}>
          <strong>{m.fecha}</strong> - {m.lugarRecogida} → {m.lugarEntrega} ({m.estado})
          <br />
          <em>{m.descripcion}</em>
        </li>
      ))}
    </ul>
  );
}

export default MudanzaList;