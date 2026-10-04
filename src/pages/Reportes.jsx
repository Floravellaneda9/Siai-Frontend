import navbar from "../components/Navbar";
import footer from "../components/Footer";

function Reportes() {
  const Reportes = [
    {
      zona: "San Miguel De Tucumán",
      tipo: "Inundación",
      descripcion:
        "Acumulacion de agua en la calle sarmiento y salta, dificultad para cruzar las avenidas",
      fecha: "2023-06-15",
    },
    {
      zona: "Yerba Buena",
      tipo: "desborde del canal",
      descripcion: "El canal de horco molle esta desbordado",
      fecha: "2023-05-15",
    },
  ];

  return (
    <>
      <navbar />

      <main className="bg-light">
        <section className="container py-5">
          <div className="mb-4">
            <h1 className="h2">Reportes ciudadanos</h1>

            <p className="text-secondary">
              Informa situaciones relacionadas con inundaciones para ayudar al
              monitoreo de la ciudad.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-lg-5">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h2 className="h5 mb-4">
                    <i className="bi bi-file-earmark-plus me-2"></i>
                    Nuevo reporte
                  </h2>

                  <form>
                    <div className="mb-3">
                      <label htmlFor="zona" className="form-label">
                        Zona
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="zona"
                        placeholder="Ingrese la zona afectada"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="tipo" className="form-label">
                        Tipo de reporte
                      </label>

                      <select className="form-select" id="tipo">
                        <option>Seleccione un tipo de reporte</option>
                        <option>Inundación</option>
                        <option>Desborde</option>
                        <option>Acumulación de agua</option>
                        <option>Otro</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="descripcion" className="form-label">
                        Descripción
                      </label>

                      <textarea
                        className="form-control"
                        id="descripcion"
                        rows="4"
                        placeholder="Describi lo que esta ocurriendo"
                      ></textarea>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="foto" className="form-label">
                        Foto
                      </label>

                      <input
                        type="file"
                        className="form-control"
                        id="foto"
                        accept="image/*"
                      />
                    </div>

                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary">
                        <i className="bi bi-file-earmark-plus"></i>
                        Enviar reporte
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h2 className="h5 mb-4">
                    <i className="bi bi-list-ul me-2"></i>
                    Reportes Recientes
                  </h2>

                  {Reportes.map((reporte, index) => (
                    <div className="border rounded p-3 mb-3" key={index}>
                      <div className="d-flex justify-content-between">
                        <h3 className="h6 mb-1">{reporte.zona}</h3>

                        <span className="badge text-bg-warning">
                          {reporte.tipo}
                        </span>
                      </div>

                      <p className="text-secondary mb-2">
                        {reporte.descripcion}
                      </p>

                      <small className="text-muted">
                        <i className="bi bi-calendar3 me-1"></i>
                        {reporte.fecha}
                      </small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer />
    </>
  );
}

export default Reportes;
