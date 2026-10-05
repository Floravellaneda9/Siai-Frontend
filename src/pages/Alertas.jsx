import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

import { Link } from 'react-router-dom'

function Alertas() {
  return (
    <>
      <Navbar />
      <main className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div>
            <h1 className="h3 fw-bold">
              <i className="bi bi-exclamation-triangle me-2"></i>
              Alertas
            </h1>
            <p className="text-secondary mb-0">
              Alertas generadas por el sistema de monitoreo.
            </p>
          </div>
          <Link className="btn btn-primary" to="/agregar-alerta">
            <i className="bi bi-plus-lg me-1"></i>
            Nueva alerta
          </Link>
        </div>

        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card border-danger h-100">
              <div className="card-body">
                <span className="badge text-bg-danger mb-2">
                  <i className="bi bi-exclamation-octagon me-1"></i>
                  ALERTA ROJA
                </span>
                <h5 className="card-title">
                  Nivel de agua crítico
                </h5>
                <p className="card-text text-secondary">
                  La estación E-014 registró un nivel de agua de
                  <strong> 2.18 metros</strong>.
                </p>
                <p className="text-secondary mb-3">
                  <i className="bi bi-geo-alt me-1"></i>
                  Río Marapa · Graneros
                </p>
                <button className="btn btn-outline-danger">
                  <i className="bi bi-eye me-1"></i>
                  Ver detalles
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card border-warning h-100">
              <div className="card-body">
                <span className="badge text-bg-warning mb-2">
                  <i className="bi bi-exclamation-triangle me-1"></i>
                  ALERTA NARANJA
                </span>
                <h5 className="card-title">
                  Precipitaciones intensas
                </h5>
                <p className="card-text text-secondary">
                  Se registraron
                  <strong> 72.1 mm</strong>
                  de precipitación.
                </p>
                <p className="text-secondary mb-3">
                  <i className="bi bi-geo-alt me-1"></i>
                  Río Lules
                </p>
                <button className="btn btn-outline-warning">
                  <i className="bi bi-eye me-1"></i>
                  Ver detalles
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Alertas
