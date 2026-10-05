import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

function Historial() {
  const eventos = [
    {
      tipo: 'ALERTA',
      badgeColor: 'danger',
      icono: 'bi-exclamation-octagon',
      titulo: 'Nivel crítico',
      descripcion: 'La estación E-014 superó el nivel crítico.',
      hora: '18:45'
    },
    {
      tipo: 'ADVERTENCIA',
      badgeColor: 'warning',
      icono: 'bi-exclamation-triangle',
      titulo: 'Precipitaciones intensas',
      descripcion: 'Se registraron 72.1 mm de lluvia.',
      hora: '18:32'
    },
    {
      tipo: 'INFORMACIÓN',
      badgeColor: 'info',
      icono: 'bi-info-circle',
      titulo: 'Estación actualizada',
      descripcion: 'La estación E-008 envió una nueva medición.',
      hora: '18:20'
    },
    {
      tipo: 'SISTEMA',
      badgeColor: 'success',
      icono: 'bi-check-circle',
      titulo: 'Sistema operativo',
      descripcion: 'Todos los servicios se encuentran funcionando.',
      hora: '18:00'
    }
  ]

  return (
    <>
      <Navbar />
      <main className="container-fluid p-4">
        <div className="mb-4">
          <h1 className="h3 fw-bold">
            <i className="bi bi-clock-history me-2"></i>
            Historial
          </h1>
          <p className="text-secondary mb-0">
            Registro histórico de eventos del sistema.
          </p>
        </div>

        <div className="card">
          <div className="card-header">
            <strong>
              <i className="bi bi-list-ul me-1"></i>
              Eventos recientes
            </strong>
          </div>
          <div className="list-group list-group-flush">
            {eventos.map((evento, index) => (
              <div className="list-group-item" key={index}>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <span className={`badge text-bg-${evento.badgeColor}`}>
                      <i className={`bi ${evento.icono} me-1`}></i>
                      {evento.tipo}
                    </span>
                    <strong className="ms-2">{evento.titulo}</strong>
                  </div>
                  <small className="text-secondary">{evento.hora}</small>
                </div>
                <p className="mb-0 mt-2 text-secondary">
                  {evento.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Historial
