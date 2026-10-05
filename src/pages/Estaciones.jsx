import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

function Estaciones() {
  const estaciones = [
    {
      id: 'E-001',
      nombre: 'Río Salí',
      tipo: 'Estación hidrológica',
      nivel: '0.82 m',
      precipitacion: '12.4 mm',
      actualizacion: 'hace 2 minutos',
      estado: 'Activa',
      badgeColor: 'success',
      iconColor: 'var(--accent)',
      btnClass: 'btn-outline-primary'
    },
    {
      id: 'E-004',
      nombre: 'Arroyo Nueva Esperanza',
      tipo: 'Estación hidrológica',
      nivel: '1.42 m',
      precipitacion: '48.7 mm',
      actualizacion: 'hace 1 minuto',
      estado: 'Precaución',
      badgeColor: 'warning',
      iconColor: 'var(--accent)',
      btnClass: 'btn-outline-primary'
    },
    {
      id: 'E-008',
      nombre: 'Río Lules',
      tipo: 'Estación hidrológica',
      nivel: '1.78 m',
      precipitacion: '72.1 mm',
      actualizacion: 'hace 30 segundos',
      estado: 'Riesgo',
      badgeColor: 'danger',
      iconColor: 'var(--danger)',
      btnClass: 'btn-outline-danger'
    },
    {
      id: 'E-014',
      nombre: 'Río Marapa',
      tipo: 'Estación hidrológica',
      nivel: '2.18 m',
      precipitacion: '112.8 mm',
      actualizacion: 'hace 15 segundos',
      estado: 'Emergencia',
      badgeColor: 'dark',
      iconColor: 'var(--danger)',
      btnClass: 'btn-outline-danger'
    }
  ]

  return (
    <>
      <Navbar />
      <main className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div>
            <h1 className="h3 fw-bold">
              <i className="bi bi-broadcast me-2"></i>
              Estaciones
            </h1>
            <p className="text-secondary mb-0">
              Estaciones de monitoreo hidrológico de la provincia.
            </p>
          </div>
          <button className="btn btn-primary">
            <i className="bi bi-plus-lg me-1"></i>
            Nueva estación
          </button>
        </div>

        <div className="row g-4">
          {estaciones.map((estacion) => (
            <div className="col-md-6 col-xl-4" key={estacion.id}>
              <div className="card h-100">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <strong>{estacion.id}</strong>
                  <span className={`badge text-bg-${estacion.badgeColor}`}>{estacion.estado}</span>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{estacion.nombre}</h5>
                  <p className="text-secondary">{estacion.tipo}</p>
                  <hr />
                  <p className="mb-1">
                    <i className="bi bi-water me-2"></i>
                    Nivel: <strong>{estacion.nivel}</strong>
                  </p>
                  <p className="mb-1">
                    <i className="bi bi-cloud-rain me-2"></i>
                    Precipitación: <strong>{estacion.precipitacion}</strong>
                  </p>
                  <p className="mb-3">
                    <i className="bi bi-clock me-2"></i>
                    Actualización: {estacion.actualizacion}
                  </p>
                  <button className={`btn ${estacion.btnClass} w-100`}>
                    <i className="bi bi-eye me-1"></i>
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Estaciones
