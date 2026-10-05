import Navbar from "../components/Navbar";
import footer from "../components/Footer";

function configuracion() {
  return (
    <>
      <Navbar />
      <main className="bg-light">
        <section className="container py-5">
          <div className="mb-4">
            <h1 className="h2">Configuración</h1>

            <p className="text-secondary">
              configura las preferencias del sistema
            </p>
          </div>

          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h2 className="h5">
                    <i className="bi bi-bell me-2"></i>
                    Notificaciones
                  </h2>

                  <hr />

                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="alertas"
                    />

                    <label className="form-check-label" htmlFor="alertas">
                      Recibir alertas de inundaciones
                    </label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="emergencias"
                    />
                    <label className="form-check-label" htmlFor="emergencias">
                      Recibir avisos de emergencias
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h2 className="h5">
                    <i className="bi bi-person me-2"></i>
                    Actualizacion 
                  </h2>

                  <hr />

                  <label htmlFor="actualizacion" className="form-label">
                    Frecuencia de actualizacion de datos
                  </label>

                  <select className="form-select" id="actualizacion">
                    <option> cada 1 minutos</option>
                    <option> cada 5 minutos</option>
                    <option> cada 10 minutos</option>
                    <option> cada 30 minutos</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 d-flex justify-content-end">
            <button className="btn btn-primary">Guardar cambios</button>
          </div>
        </section>
      </main>

      <footer />
    </>
  );
}

export default configuracion;
