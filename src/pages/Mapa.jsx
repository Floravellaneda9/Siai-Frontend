import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

function Mapa() {
  return (
    <>
      <Navbar />
      <main className="container-fluid p-4">
        <div className="mb-4">
          <h1 className="h3 fw-bold">
            <i className="bi bi-map me-2"></i>
            Mapa de riesgo
          </h1>
          <p className="text-secondary mb-0">
            Visualización de las estaciones y zonas de riesgo de la provincia de Tucumán.
          </p>
        </div>

        {/* Mapa */}
        <div className="card mb-4">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <strong>
                <i className="bi bi-geo-alt me-1"></i>
                Mapa de monitoreo
              </strong>
              <span className="badge text-bg-success">
                <i className="bi bi-circle-fill me-1"></i>
                Sistema activo
              </span>
            </div>
          </div>
          <div className="card-body">
            <div className="bg-secondary-subtle rounded d-flex align-items-center justify-content-center">
              <div className="text-center">
                <i className="bi bi-geo-alt fs-1"></i>
                <h4 className="mt-3">Mapa interactivo</h4>
                <p className="text-secondary mb-0">
                  Aquí se integrará Leaflet para mostrar el mapa de Tucumán.
                </p>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <strong className="me-3">
              <i className="bi bi-info-circle me-1"></i>
              Referencias:
            </strong>
            <span className="badge text-bg-success me-2">Normal</span>
            <span className="badge text-bg-warning me-2">Precaución</span>
            <span className="badge text-bg-danger me-2">Riesgo</span>
            <span className="badge text-bg-dark">Emergencia</span>
          </div>
        </div>

        {/* Resumen de zonas */}
        <div className="row g-4">
          <div className="col-md-6 col-xl-3">
            <div className="card border-success h-100">
              <div className="card-body">
                <h6 className="text-secondary text-uppercase">
                  <i className="bi bi-check-circle me-1"></i>
                  Zonas normales
                </h6>
                <h2 className="display-4 fw-bold my-2">18</h2>
                <span className="badge text-bg-success">Normal</span>
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
                <span className="badge text-bg-warning">Precaución</span>
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
                <span className="badge text-bg-danger">Riesgo</span>
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
                <span className="badge text-bg-dark">Emergencia</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Mapa
