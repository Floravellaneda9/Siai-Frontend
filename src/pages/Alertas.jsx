import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { emergencia } from '../components/alertas.jsx'
import PageHeader from '../components/layout/PageHeader.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'
import StatCard from '../components/ui/StatCard.jsx'
import StatusBadge from '../components/ui/StatusBadge.jsx'
import { escaparHtml as escapar } from '../utils/html.js'

const ALERTAS = [
  {
    id: 1,
    nivel: 'NEGRA',
    badge: 'dark',
    icono: 'bi-shield-exclamation',
    borde: 'border-dark',
    btn: 'btn-outline-dark',
    titulo: 'Emergencia hídrica',
    descripcion: 'La estación E-021 registró un nivel de agua de',
    dato: '2.18 m',
    ubicacion: 'Río Marapa · Graneros',
    estacion: 'E-021',
    hora: '18:45',
    recomendacion: 'Emergencia. Se requiere acción inmediata, notificación a Defensa Civil y evacuación preventiva si corresponde.',
    iconoHtml: '<i class="bi bi-exclamation-octagon-fill" style="font-size:3.5rem;color:#212529"></i>'
  },
  {
    id: 2,
    nivel: 'ROJA',
    badge: 'danger',
    icono: 'bi-exclamation-octagon',
    borde: 'border-danger',
    btn: 'btn-outline-danger',
    titulo: 'Zona en riesgo',
    descripcion: 'La estación E-008 registró un nivel de agua de',
    dato: '1.78 m',
    ubicacion: 'Río Lules · Lules',
    estacion: 'E-008',
    hora: '18:32',
    recomendacion: 'Zona en riesgo. Se requiere atención prioritaria y seguimiento continuo.',
    iconoHtml: '<i class="bi bi-exclamation-octagon-fill" style="font-size:3.5rem;color:#dc3545"></i>'
  },
  {
    id: 3,
    nivel: 'AMARILLA',
    badge: 'warning',
    icono: 'bi-exclamation-triangle',
    borde: 'border-warning',
    btn: 'btn-outline-warning',
    titulo: 'Zona en precaución',
    descripcion: 'La estación E-004 registró un nivel de agua de',
    dato: '1.42 m',
    ubicacion: 'Arroyo Nueva Esperanza · Yerba Buena',
    estacion: 'E-004',
    hora: '18:20',
    recomendacion: 'Zona en precaución. Se recomienda monitoreo preventivo y atención a posibles cambios.',
    iconoHtml: '<i class="bi bi-exclamation-triangle-fill" style="font-size:3.5rem;color:#f59e0b"></i>'
  }
]

function Alertas() {
  const [filtro, setFiltro] = useState('TODAS')

  useEffect(() => {
    try {
      if (sessionStorage.getItem('siai-aviso-alertas')) return
      sessionStorage.setItem('siai-aviso-alertas', '1')
    } catch (error) {
      console.warn('No se pudo acceder al aviso de alertas en sessionStorage.', error)
    }
    const rojas = ALERTAS.filter((a) => a.nivel === 'ROJA')
    if (rojas.length > 0) {
      emergencia('Alertas rojas activas', `Hay ${rojas.length} alerta(s) roja(s) vigente(s): ${rojas.map((a) => a.titulo).join(', ')}.`)
    }
  }, [])

  const filtradas = useMemo(() => filtro === 'TODAS' ? ALERTAS : ALERTAS.filter(a => a.nivel === filtro), [filtro])
  const conteo = {
    NEGRA: ALERTAS.filter(a=>a.nivel==='NEGRA').length,
    ROJA: ALERTAS.filter(a=>a.nivel==='ROJA').length,
    AMARILLA: ALERTAS.filter(a=>a.nivel==='AMARILLA').length,
  }

  function verDetalles(alerta) {
    Swal.fire({
      iconHtml: alerta.iconoHtml,
      customClass: { icon: 'swal-sin-borde' },
      titleText: `ALERTA ${alerta.nivel} · ${alerta.titulo}`,
      html: `<div class="text-start"><p class="mb-1"><strong>Estación:</strong> ${escapar(alerta.estacion)}</p><p class="mb-1"><strong>Ubicación:</strong> ${escapar(alerta.ubicacion)}</p><p class="mb-1"><strong>Hora:</strong> ${escapar(alerta.hora || '—')}</p><p class="mb-3"><strong>Detalle:</strong> ${escapar(alerta.descripcion)} ${escapar(alerta.dato)}.</p><p class="text-secondary mb-0">${escapar(alerta.recomendacion)}</p></div>`,
      confirmButtonText: 'Cerrar'
    })
  }

  return (
    <div>
      <PageHeader icon="bi-exclamation-triangle" eyebrow="Operación" title="Centro de alertas" subtitle="Supervisión, priorización y gestión de alertas activas emitidas por la red de monitoreo." actions={<Link className="btn btn-primary" to="/agregar-alerta"><i className="bi bi-plus-lg me-1"></i>Nueva alerta</Link>} />

      <div className="row g-3 mb-4">
        <div className="col-6 col-xl-3"><StatCard label="Alertas negras" value={conteo.NEGRA} icon="bi-shield-exclamation" tone="dark" meta="Emergencia crítica" /></div>
        <div className="col-6 col-xl-3"><StatCard label="Alertas rojas" value={conteo.ROJA} icon="bi-exclamation-octagon" tone="danger" meta="Riesgo alto" /></div>
        <div className="col-6 col-xl-3"><StatCard label="Alertas amarillas" value={conteo.AMARILLA} icon="bi-exclamation-triangle" tone="warning" meta="Precaución" /></div>
        <div className="col-6 col-xl-3"><StatCard label="Total activas" value={ALERTAS.length} icon="bi-bell" tone="primary" meta="En seguimiento" /></div>
      </div>

      <SectionCard
        title="Alertas activas"
        subtitle={`${filtradas.length} alertas visibles`}
        icon="bi-bell"
        actions={<div className="btn-group btn-group-sm" role="group" aria-label="Filtrar alertas">{['TODAS','NEGRA','ROJA','AMARILLA'].map(n => <button key={n} className={`btn ${filtro===n?'btn-primary':'btn-outline-secondary'}`} onClick={() => setFiltro(n)}>{n==='TODAS'?'Todas':n}</button>)}</div>}
      >
        <div className="row g-3">
          {filtradas.map((alerta) => (
            <div className="col-xl-6" key={alerta.id}>
              <div className={`card h-100 ${alerta.borde} border-opacity-75`} style={{ borderLeftWidth: 4 }}>
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      <StatusBadge status={alerta.nivel} tone={alerta.badge}><i className={`bi ${alerta.icono} me-1`}></i>ALERTA {alerta.nivel}</StatusBadge>
                      <span className="text-secondary small"><i className="bi bi-clock me-1"></i>{alerta.hora}</span>
                    </div>
                  </div>
                  <h3 className="h5 fw-bold mb-2">{alerta.titulo}</h3>
                  <p className="text-secondary mb-3">{alerta.descripcion} <strong style={{ color: 'var(--siai-text-strong)' }}>{alerta.dato}</strong>.</p>
                  <div className="d-flex flex-wrap gap-3 small text-secondary mb-4 p-3 rounded-3" style={{ background: 'var(--siai-surface-alt)', border: '1px solid var(--siai-divider)' }}>
                    <span><i className="bi bi-broadcast me-1"></i>{alerta.estacion}</span>
                    <span><i className="bi bi-geo-alt me-1"></i>{alerta.ubicacion}</span>
                  </div>
                  <button className={`btn btn-sm ${alerta.btn}`} onClick={() => verDetalles(alerta)}><i className="bi bi-eye me-1"></i>Ver detalles</button>
                </div>
              </div>
            </div>
          ))}
          {filtradas.length === 0 && <div className="col-12 text-center text-secondary py-5">No hay alertas para el filtro seleccionado.</div>}
        </div>
      </SectionCard>
    </div>
  )
}

export default Alertas