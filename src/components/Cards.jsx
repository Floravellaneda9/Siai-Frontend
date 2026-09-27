
function Cards() {
  const estados = [
    {
      titulo: "Zonas normales",
      cantidad: 18,
      texto: "Sin riesgo actual",
      color: "success",
    },
    {
      titulo: "Precaución",
      cantidad: 5,
      texto: "Monitoreo preventivo",
      color: "warning",
    },
    {
      titulo: "Riesgo",
      cantidad: 3,
      texto: "Requiere atención",
      color: "danger",
    },
    {
      titulo: "Emergencia",
      cantidad: 1,
      texto: "Atención inmediata",
      color: "dark",
    },
  ];

  return (
    <div className="row g-4">

      {estados.map((estado) => (
        <div
          className="col-md-6 col-xl-3"
          key={estado.titulo}
        >
          <div className="card shadow-sm h-100">

            <div className="card-body">

              <h6 className="text-secondary">
                {estado.titulo}
              </h6>

              <h2 className="fw-bold">
                {estado.cantidad}
              </h2>

              <span className={`badge text-bg-${estado.color}`}>
                {estado.texto}
              </span>

            </div>

          </div>
        </div>
      ))}

    </div>
  );
}

export default Cards;

