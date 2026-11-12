import { useMemo, useState } from 'react'
import Swal from 'sweetalert2'
import PageHeader from '../components/layout/PageHeader.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'
import { escaparHtml as escapar } from '../utils/html.js'

const EVENTOS = [
  { id: 1, tipo: 'ALERTA', badgeColor: 'danger', icono: 'bi-exclamation-octagon', titulo: 'Nivel crítico', descripcion: 'La estación E-014 superó el nivel crítico.', hora: '18:45', origen: 'E-014 · Río Marapa' },
  { id: 2, tipo: 'ADVERTENCIA', badgeColor: 'warning', icono: 'bi-exclamation-triangle', titulo: 'Precipitaciones intensas', descripcion: 'Se registraron 72.1 mm de lluvia.', hora: '18:32', origen: 'E-008 · Río Lules' },
  { id: 3, tipo: 'INFORMACIÓN', badgeColor: 'info', icono: 'bi-info-circle', titulo: 'Estación actualizada', descripcion: 'La estación E-008 envió una nueva medición.', hora: '18:20', origen: 'E-008 · Río Lules' },
  { id: 4, tipo: 'SISTEMA', badgeColor: 'success', icono: 'bi-check-circle', titulo: 'Sistema operativo', descripcion: 'Todos los servicios se encuentran funcionando.', hora: '18:00', origen: 'Plataforma' }
]

const ICONO_POR_TIPO = { ADVERTENCIA: 'warning', 'INFORMACIÓN': 'info', SISTEMA: 'success' }
const ICONO_HTML_ALERTA = '<i class="bi bi-exclamation-octagon-fill" style="font-size:3.5rem;color:#dc3545"></i>'
function Historial() {
  const [filtro, setFiltro] = useState('TODOS')
  const tipos = ['TODOS', 'ALERTA', 'ADVERTENCIA', 'INFORMACIÓN', 'SISTEMA']

  const filtrados = useMemo(() => filtro === 'TODOS' ? EVENTOS : EVENTOS.filter(e => e.tipo === filtro), [filtro])

  function verEvento(evento) {
    Swal.fire({
      ...(evento.tipo === 'ALERTA'
        ? { iconHtml: ICONO_HTML_ALERTA, customClass: { icon: 'swal-sin-borde' } }
        : { icon: ICONO_POR_TIPO[evento.tipo] || 'info' }),
      titleText: evento.titulo,
      html: `<div class="text-start"><p class="mb-1"><strong>Tipo:</strong> ${escapar(evento.tipo)}</p><p class="mb-1"><strong>Hora:</strong> ${escapar(evento.hora)}</p><p class="mb-1"><strong>Origen:</strong> ${escapar(evento.origen || '—')}</p><p class="mb-0"><strong>Detalle:</strong> ${escapar(evento.descripcion)}</p></div>`,
      confirmButtonText: 'Cerrar'
    })
  }

  return (
    <div>
      <PageHeader icon="bi-clock-history" eyebrow="Trazabilidad" title="Historial de eventos" subtitle="Registro cronológico de alertas, avisos operativos y actividad relevante del sistema." />
      <SectionCard
        title="Línea de eventos"
        subtitle={`${filtrados.length} eventos mostrados`}
        icon="bi-activity"
        actions={<div className="d-flex flex-wrap gap-1">{tipos.map(t => <button key={t} className={`btn btn-sm ${filtro===t?'btn-primary':'btn-outline-secondary'}`} onClick={() => setFiltro(t)}>{t === 'TODOS' ? 'Todos' : t}</button>)}</div>}
        noBodyPadding
      >
        <div className="list-group list-group-flush">
          {filtrados.map((evento) => (
            <div
              className="list-group-item list-group-item-action py-3 py-lg-4 px-4"
              key={evento.id}
              role="button"
              tabIndex={0}
              style={{ cursor: 'pointer' }}
              onClick={() => verEvento(evento)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); verEvento(evento) } }}
            >
              <div className="d-flex gap-3 align-items-start">
                <div className={`rounded-4 d-inline-flex align-items-center justify-content-center flex-shrink-0 bg-${evento.badgeColor}-subtle text-${evento.badgeColor}`} style={{ width: 44, height: 44 }}>
                  <i className={`bi ${evento.icono} fs-5`}></i>
                </div>
                <div className="flex-grow-1 min-w-0">
                  <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">
                    <div className="min-w-0">
                      <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
                        <span className={`badge text-bg-${evento.badgeColor}`}>{evento.tipo}</span>
                        <span className="fw-semibold" style={{ color: 'var(--siai-text-strong)' }}>{evento.titulo}</span>
                      </div>
                      <p className="mb-2 text-secondary">{evento.descripcion}</p>
                      <span className="text-secondary small"><i className="bi bi-geo-alt me-1"></i>{evento.origen}</span>
                    </div>
                    <span className="text-secondary small text-nowrap px-2 py-1 rounded-pill" style={{ background: 'var(--siai-surface-alt)', border: '1px solid var(--siai-divider)' }}><i className="bi bi-clock me-1"></i>{evento.hora}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}

export default Historial