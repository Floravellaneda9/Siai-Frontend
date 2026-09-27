function Presentacion() {
  return (
    <section className="container py-5">
      <div className="border rounded shadow-sm p-4 bg-white">
        <h2 className="text-primary text-center">
          ¿Quiénes somos?
        </h2>

        <p className="lead text-center">
          Somos <strong>SIAI Tucumán</strong>, un sistema de monitoreo
          y alerta temprana creado para proteger a la comunidad frente
          a los riesgos de inundaciones.
          Nuestra misión es cuidar vidas y bienes mediante información
          confiable y actualizada.
        </p>

        <hr />

        <h2 className="text-success text-center">
          ¿Qué hacemos?
        </h2>

        <div className="row text-center mt-4">
          <div className="col-md-3">
            <i className="bi bi-bar-chart-fill fs-1 text-success"></i>
            <p>Monitoreamos estaciones hidrológicas</p>
          </div>

          <div className="col-md-3">
            <i className="bi bi-exclamation-triangle-fill fs-1 text-warning"></i>
            <p>Emitimos alertas preventivas</p>
          </div>

          <div className="col-md-3">
            <i className="bi bi-geo-alt-fill fs-1 text-danger"></i>
            <p>Identificamos zonas vulnerables</p>
          </div>

          <div className="col-md-3">
            <i className="bi bi-people-fill fs-1 text-info"></i>
            <p>Promovemos participación ciudadana</p>
          </div>
        </div>

        <hr />

        <h2 className="text-info text-center">
          ¿Cómo funciona?
        </h2>

        <p className="text-center">
          La página funciona como un tablero interactivo que muestra
          el estado general de Tucumán, reporta niveles de agua en
          tiempo real y brinda recomendaciones prácticas.
        </p>
      </div>
    </section>
  );
}

export default Presentacion;