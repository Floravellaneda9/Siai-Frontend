import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const eventos = [
  {
    id: 1,
    tipo: 'ALERTA',
    color: 'danger',
    titulo: 'Nivel crítico',
    hora: '18:45',
    descripcion: 'La estación E-014 superó el nivel crítico.',
  },
  {
    id: 2,
    tipo: 'ADVERTENCIA',
    color: 'warning',
    titulo: 'Precipitaciones intensas',
    hora: '18:32',
    descripcion: 'Se registraron 72.1 mm de lluvia.',
  },
  {
    id: 3,
    tipo: 'INFORMACIÓN',
    color: 'info',
    titulo: 'Estación actualizada',
    hora: '18:20',
    descripcion: 'La estación E-008 envió una nueva medición.',
  },
  {
    id: 4,
    tipo: 'SISTEMA',
    color: 'success',
    titulo: 'Sistema operativo',
    hora: '18:00',
    descripcion: 'Todos los servicios se encuentran funcionando.',
  },
]

function Historial() {
  return (
    <>
      <Navbar />
      <main className="bg-light">
        <div className="container-fluid p-4">
          <h1 className="h3">
            <i className="bi bi-clock-history me-2" aria-hidden="true"></i>
            Historial
          </h1>

          <p className="text-secondary">
            Registro histórico de eventos del sistema.
          </p>

          <div className="card shadow-sm">
            <div className="card-header">Eventos recientes</div>

            <div className="list-group list-group-flush">
              {eventos.map((evento) => (
                <div key={evento.id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <div>
                      <span className={`badge text-bg-${evento.color}`}>
                        {evento.tipo}
                      </span>
                      <strong className="ms-2">{evento.titulo}</strong>
                    </div>

                    <small>{evento.hora}</small>
                  </div>

                  <p className="mb-0 mt-2 text-secondary">
                    {evento.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Historial