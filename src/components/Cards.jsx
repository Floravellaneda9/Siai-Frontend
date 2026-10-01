
function Card({ titulo, cantidad, texto, color }) {
  return (
    <div className="col-md-6 col-xl-3">
      <div className="card shadow-sm h-100">

        <div className="card-body">

          <h6 className="text-secondary">
            {titulo}
          </h6>

          <h2 className="fw-bold">
            {cantidad}
          </h2>

          <span className={`badge text-bg-${color}`}>
            {texto}
          </span>

        </div>

      </div>
    </div>
  );
}

function Cards({ estados = [] }) {
  return (
    <div className="row g-4">

      {estados.map((estado) => (
        <Card
          key={estado.titulo}
          titulo={estado.titulo}
          cantidad={estado.cantidad}
          texto={estado.texto}
          color={estado.color}
        />
      ))}

    </div>
  );
}

export default Cards;
