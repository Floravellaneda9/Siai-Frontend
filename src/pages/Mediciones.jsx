import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

function Mediciones() {
  const mediciones = [
    {
      fecha: '16/09/2026 18:47',
      estacion: 'E-014',
      nivel: '2.18 m',
      nivelColor: 'var(--danger)',
      precipitacion: '112.8 mm',
      humedad: '86%',
      temperatura: '19.2 °C',
      estado: 'Crítico',
      badgeColor: 'danger'
    },
    {
      fecha: '16/09/2026 18:46',
      estacion: 'E-008',
      nivel: '1.78 m',
      nivelColor: 'var(--warning)',
      precipitacion: '72.1 mm',
      humedad: '82%',
      temperatura: '19.8 °C',
      estado: 'Riesgo',
      badgeColor: 'warning'
    },
    {
      fecha: '16/09/2026 18:45',
      estacion: 'E-004',
      nivel: '1.42 m',
      nivelColor: 'var(--warning)',
      precipitacion: '48.7 mm',
      humedad: '78%',
      temperatura: '20.1 °C',
      estado: 'Precaución',
      badgeColor: 'warning'
    },
    {
      fecha: '16/09/2026 18:44',
      estacion: 'E-001',
      nivel: '0.82 m',
      nivelColor: 'var(--success)',
      precipitacion: '12.4 mm',
      humedad: '71%',
      temperatura: '21.4 °C',
      estado: 'Normal',
      badgeColor: 'success'
    }
  ]

  return (
    <>
      <Navbar />
      <main className="container-fluid p-4">
        <div className="mb-4">
          <h1 className="h3 fw-bold">
            <i className="bi bi-graph-up me-2"></i>
            Mediciones
          </h1>
          <p className="text-secondary mb-0">
            Datos registrados por las estaciones de monitoreo.
          </p>
        </div>

        {/* Filtros */}
        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">
                  <i className="bi bi-broadcast me-1"></i>
                  Estación
                </label>
                <select className="form-select">
                  <option>Todas</option>
                  <option>E-001</option>
                  <option>E-004</option>
                  <option>E-008</option>
                  <option>E-014</option>
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
                <button className="btn btn-primary w-100">
                  <i className="bi bi-search me-1"></i>
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de mediciones */}
        <div className="card">
          <div className="card-header">
            <strong>
              <i className="bi bi-table me-1"></i>
              Últimas mediciones
            </strong>
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Estación</th>
                  <th>Nivel</th>
                  <th>Precipitación</th>
                  <th>Humedad</th>
                  <th>Temperatura</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {mediciones.map((medicion, index) => (
                  <tr key={index}>
                    <td>{medicion.fecha}</td>
                    <td>{medicion.estacion}</td>
                    <td><strong>{medicion.nivel}</strong></td>
                    <td>{medicion.precipitacion}</td>
                    <td>{medicion.humedad}</td>
                    <td>{medicion.temperatura}</td>
                    <td><span className={`badge text-bg-${medicion.badgeColor}`}>{medicion.estado}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Mediciones
