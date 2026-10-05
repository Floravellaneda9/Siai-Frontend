function Cards({ estados = [] }) {
  return (
    <div className="row g-4">
      {estados.map((estado) => (
        <div className="col-md-6 col-xl-3" key={estado.titulo}>
          <div className="card shadow-sm h-100">
            {estado.imagen && (
              <img
                src={estado.imagen}
                className="card-img-top object-fit-cover"
                alt={estado.titulo}
                height="150"
              />
            )}
            <div className="card-body">
              <h6 className="text-secondary">{estado.titulo}</h6>
              <h2 className="fw-bold">{estado.cantidad}</h2>
              <span className={`badge text-bg-${estado.color}`}>{estado.texto}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;
