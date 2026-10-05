import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

function Admi() {
  return (
    <>
      <Navbar />
      <main className="container-fluid p-4">
        <div className="mb-4">
          <h1 className="h3 fw-bold">
            <i className="bi bi-shield-check me-2"></i>
            Panel de administración
          </h1>
          <p className="text-secondary mb-0">
            Estado general del sistema de monitoreo de Tucumán.
          </p>
        </div>

        <div className="alert alert-success d-flex align-items-center mb-4" role="alert">
          <i className="bi bi-check-circle-fill me-2 fs-5"></i>
          <div>
            <strong>Sistema operativo.</strong> Última actualización: <strong>18:47:32</strong>
          </div>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-6 col-xl-3">
            <div className="card border-success h-100">
              <div className="card-body">
                <h6 className="text-secondary text-uppercase">
                  <i className="bi bi-check-circle me-1"></i>
                  Zonas normales
                </h6>
                <h2 className="display-4 fw-bold my-2">18</h2>
                <span className="badge text-bg-success">Sin riesgo actual</span>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-3">
            <div className="card border-warning h-100">
              <div className="card-body">
                <h6 className="text-secondary text-uppercase">
                  <i className="bi bi-exclamation-circle me-1"></i>
                  Precaución
                </h6>
                <h2 className="display-4 fw-bold my-2">5</h2>
                <span className="badge text-bg-warning">Monitoreo preventivo</span>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-3">
            <div className="card border-danger h-100">
              <div className="card-body">
                <h6 className="text-secondary text-uppercase">
                  <i className="bi bi-exclamation-triangle me-1"></i>
                  Riesgo
                </h6>
                <h2 className="display-4 fw-bold my-2">3</h2>
                <span className="badge text-bg-danger">Requiere atención</span>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-3">
            <div className="card border-dark h-100">
              <div className="card-body">
                <h6 className="text-secondary text-uppercase">
                  <i className="bi bi-shield-exclamation me-1"></i>
                  Emergencia
                </h6>
                <h2 className="display-4 fw-bold my-2">1</h2>
                <span className="badge text-bg-dark">Atención inmediata</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              <i className="bi bi-droplet-fill me-2"></i>
              Nivel de agua más crítico
            </h5>
            <h2 className="display-3 fw-bold">2.18 m</h2>
            <p className="text-secondary mb-2">
              <i className="bi bi-geo-alt me-1"></i>
              Estación E-014 · Río Marapa · Graneros
            </p>
            <div className="progress" role="progressbar" aria-label="Nivel de agua"
              aria-valuenow="87" aria-valuemin="0" aria-valuemax="100">
              <div className="progress-bar bg-danger">2.18 m</div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Admi
