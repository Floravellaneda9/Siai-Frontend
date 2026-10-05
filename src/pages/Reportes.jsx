import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

function Reportes() {
  const reportes = [
    {
      titulo: 'Reporte de alertas',
      descripcion: 'Consulte las alertas generadas durante un período determinado.',
      icono: 'bi-exclamation-triangle',
      color: 'var(--danger)'
    },
    {
      titulo: 'Niveles de agua',
      descripcion: 'Evolución histórica de los niveles de los ríos.',
      icono: 'bi-water',
      color: 'var(--accent)'
    },
    {
      titulo: 'Precipitaciones',
      descripcion: 'Análisis de precipitaciones por zona.',
      icono: 'bi-cloud-rain',
      color: 'var(--accent)'
    }
  ]

  return (
    <>
      <Navbar />
      <main className="container-fluid p-4">
        <div className="mb-4">
          <h1 className="h3 fw-bold">
            <i className="bi bi-file-earmark-bar-graph me-2"></i>
            Reportes
          </h1>
          <p className="text-secondary mb-0">
            Generación y consulta de reportes del sistema.
          </p>
        </div>

        <div className="row g-4 mb-4">
          {reportes.map((reporte, index) => (
            <div className="col-md-6 col-xl-4" key={index}>
              <div className="card h-100">
                <div className="card-body text-center p-4">
                  <i className={`bi ${reporte.icono} fs-1 mb-3`}></i>
                  <h5 className="card-title">{reporte.titulo}</h5>
                  <p className="card-text text-secondary">
                    {reporte.descripcion}
                  </p>
                  <button className="btn btn-primary">
                    <i className="bi bi-file-earmark-pdf me-1"></i>
                    Generar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-header">
            <strong>
              <i className="bi bi-sliders me-1"></i>
              Generar reporte personalizado
            </strong>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">
                  <i className="bi bi-tag me-1"></i>
                  Tipo de reporte
                </label>
                <select className="form-select">
                  <option>Alertas</option>
                  <option>Mediciones</option>
                  <option>Precipitaciones</option>
                  <option>Estaciones</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label">
                  <i className="bi bi-calendar me-1"></i>
                  Desde
                </label>
                <input type="date" className="form-control" />
              </div>
              <div className="col-md-3">
                <label className="form-label">
                  <i className="bi bi-calendar me-1"></i>
                  Hasta
                </label>
                <input type="date" className="form-control" />
              </div>
              <div className="col-md-2 d-flex align-items-end">
                <button className="btn btn-success w-100">
                  <i className="bi bi-download me-1"></i>
                  Generar
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

export default Reportes
