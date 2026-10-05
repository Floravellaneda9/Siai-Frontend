import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

function Configuracion() {
  return (
    <>
      <Navbar />
      <main className="container-fluid p-4">
        <div className="mb-4">
          <h1 className="h3 fw-bold">
            <i className="bi bi-gear me-2"></i>
            Configuración
          </h1>
          <p className="text-secondary mb-0">
            Configuración general del sistema SIAI.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <strong>
                  <i className="bi bi-speedometer me-1"></i>
                  Umbrales de alerta
                </strong>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">
                    <i className="bi bi-exclamation-circle me-1"></i>
                    Nivel de precaución
                  </label>
                  <div className="input-group">
                    <input type="number" className="form-control" defaultValue="1.20" step="0.01" />
                    <span className="input-group-text">metros</span>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    <i className="bi bi-exclamation-triangle me-1"></i>
                    Nivel de riesgo
                  </label>
                  <div className="input-group">
                    <input type="number" className="form-control" defaultValue="1.70" step="0.01" />
                    <span className="input-group-text">metros</span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    <i className="bi bi-exclamation-octagon me-1"></i>
                    Nivel crítico
                  </label>
                  <div className="input-group">
                    <input type="number" className="form-control" defaultValue="2.00" step="0.01" />
                    <span className="input-group-text">metros</span>
                  </div>
                </div>

                <button className="btn btn-primary">
                  <i className="bi bi-save me-1"></i>
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <strong>
                  <i className="bi bi-bell me-1"></i>
                  Notificaciones
                </strong>
              </div>
              <div className="card-body">
                <div className="form-check form-switch mb-3">
                  <input className="form-check-input" type="checkbox" defaultChecked id="notifWeb" />
                  <label className="form-check-label" htmlFor="notifWeb">
                    <i className="bi bi-globe me-1"></i>
                    Notificaciones web
                  </label>
                </div>

                <div className="form-check form-switch mb-3">
                  <input className="form-check-input" type="checkbox" defaultChecked id="notifEmail" />
                  <label className="form-check-label" htmlFor="notifEmail">
                    <i className="bi bi-envelope me-1"></i>
                    Correo electrónico
                  </label>
                </div>

                <div className="form-check form-switch mb-3">
                  <input className="form-check-input" type="checkbox" id="notifWhats" />
                  <label className="form-check-label" htmlFor="notifWhats">
                    <i className="bi bi-whatsapp me-1"></i>
                    WhatsApp
                  </label>
                </div>

                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" defaultChecked id="notifMobile" />
                  <label className="form-check-label" htmlFor="notifMobile">
                    <i className="bi bi-phone me-1"></i>
                    Notificaciones móviles
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <strong>
                  <i className="bi bi-info-circle me-1"></i>
                  Información del sistema
                </strong>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4 mb-3 mb-md-0">
                    <p className="text-secondary mb-1">
                      <i className="bi bi-hdd me-1"></i>
                      Sistema
                    </p>
                    <strong>SIAI Tucumán</strong>
                  </div>
                  <div className="col-md-4 mb-3 mb-md-0">
                    <p className="text-secondary mb-1">
                      <i className="bi bi-tag me-1"></i>
                      Versión
                    </p>
                    <strong>1.0.0</strong>
                  </div>
                  <div className="col-md-4">
                    <p className="text-secondary mb-1">
                      <i className="bi bi-activity me-1"></i>
                      Estado
                    </p>
                    <span className="badge text-bg-success">
                      <i className="bi bi-circle-fill me-1"></i>
                      Operativo
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Configuracion
