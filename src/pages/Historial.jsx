import Swal from 'sweetalert2'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

const EVENTOS = [
  {
    id: 1,
    tipo: 'ALERTA',
    badgeColor: 'danger',
    icono: 'bi-exclamation-octagon',
    titulo: 'Nivel crítico',
    descripcion: 'La estación E-014 superó el nivel crítico.',
    hora: '18:45'
  },
  {
    id: 2,
    tipo: 'ADVERTENCIA',
    badgeColor: 'warning',
    icono: 'bi-exclamation-triangle',
    titulo: 'Precipitaciones intensas',
    descripcion: 'Se registraron 72.1 mm de lluvia.',
    hora: '18:32'
  },
  {
    id: 3,
    tipo: 'INFORMACIÓN',
    badgeColor: 'info',
    icono: 'bi-info-circle',
    titulo: 'Estación actualizada',
    descripcion: 'La estación E-008 envió una nueva medición.',
    hora: '18:20'
  },
  {
    id: 4,
    tipo: 'SISTEMA',
    badgeColor: 'success',
    icono: 'bi-check-circle',
    titulo: 'Sistema operativo',
    descripcion: 'Todos los servicios se encuentran funcionando.',
    hora: '18:00'
  }
]

const ICONO_POR_TIPO = {
  ADVERTENCIA: 'warning',
  'INFORMACIÓN': 'info',
  SISTEMA: 'success'
}


const ICONO_HTML_ALERTA =
  '<i class="bi bi-exclamation-octagon-fill" style="font-size:3.5rem;color:#dc3545"></i>'


const escapar = (txt) =>
  String(txt).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]))

function Historial() {

  function verEvento(evento) {
    Swal.fire({
      ...(evento.tipo === 'ALERTA'
        ? { iconHtml: ICONO_HTML_ALERTA, customClass: { icon: 'swal-sin-borde' } }
        : { icon: ICONO_POR_TIPO[evento.tipo] || 'info' }),
      titleText: evento.titulo,
      html: `
        <div class="text-start">
          <p class="mb-1"><strong>Tipo:</strong> ${escapar(evento.tipo)}</p>
          <p class="mb-1"><strong>Hora:</strong> ${escapar(evento.hora)}</p>
          <p class="mb-0"><strong>Detalle:</strong> ${escapar(evento.descripcion)}</p>
        </div>
      `,
      confirmButtonText: 'Cerrar'
    })
  }

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
            {EVENTOS.map((evento) => (
              <div
                className="list-group-item list-group-item-action"
                key={evento.id}
                role="button"
                tabIndex={0}
                style={{ cursor: 'pointer' }}
                onClick={() => verEvento(evento)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    verEvento(evento)
                  }
                }}
              >
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