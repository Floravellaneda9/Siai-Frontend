import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { emergencia } from '../components/alertas.jsx'
import PageHeader from '../components/layout/PageHeader.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'
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
      <PageHeader icon="bi-exclamation-triangle" title="Centro de alertas" subtitle="Monitoreo y gestión de alertas activas emitidas por la red de estaciones." actions={<Link className="btn btn-primary" to="/agregar-alerta"><i className="bi bi-plus-lg me-1"></i>Nueva alerta</Link>} />

      <div className="row g-3 mb-3">
        <div className="col-sm-3"><div className="card border-dark-subtle"><div className="card-body py-3"><div className="text-secondary small">Alertas negras</div><div className="fs-3 fw-bold">{conteo.NEGRA}</div></div></div></div>
        <div className="col-sm-3"><div className="card border-danger-subtle"><div className="card-body py-3"><div className="text-secondary small">Alertas rojas</div><div className="fs-3 fw-bold text-danger">{conteo.ROJA}</div></div></div></div>
        <div className="col-sm-3"><div className="card border-warning-subtle"><div className="card-body py-3"><div className="text-secondary small">Alertas amarillas</div><div className="fs-3 fw-bold text-warning">{conteo.AMARILLA}</div></div></div></div>
        <div className="col-sm-3"><div className="card"><div className="card-body py-3"><div className="text-secondary small">Total activas</div><div className="fs-3 fw-bold">{ALERTAS.length}</div></div></div></div>
      </div>

      <SectionCard title="Alertas activas" icon="bi-bell" actions={<div className="btn-group btn-group-sm" role="group" aria-label="Filtrar">{['TODAS','NEGRA','ROJA','AMARILLA'].map(n => <button key={n} className={`btn ${filtro===n?'btn-primary':'btn-outline-secondary'}`} onClick={() => setFiltro(n)}>{n==='TODAS'?'Todas':n}</button>)}</div>}>
        <div className="row g-3">
          {filtradas.map((alerta) => (
            <div className="col-xl-6" key={alerta.id}>
              <div className={`card h-100 ${alerta.borde}`}>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <span className={`badge text-bg-${alerta.badge}`}><i className={`bi ${alerta.icono} me-1`}></i>ALERTA {alerta.nivel}</span>
                    <span className="text-secondary small"><i className="bi bi-clock me-1"></i>{alerta.hora}</span>
                  </div>
                  <h5 className="card-title mb-1">{alerta.titulo}</h5>
                  <p className="text-secondary mb-2">{alerta.descripcion} <strong className="text-dark">{alerta.dato}</strong>.</p>
                  <div className="d-flex flex-wrap gap-3 small text-secondary mb-3">
                    <span><i className="bi bi-broadcast me-1"></i>{alerta.estacion}</span>
                    <span><i className="bi bi-geo-alt me-1"></i>{alerta.ubicacion}</span>
                  </div>
                  <button className={`btn btn-sm ${alerta.btn}`} onClick={() => verDetalles(alerta)}><i className="bi bi-eye me-1"></i>Ver detalles</button>
                </div>
              </div>
            </div>
          ))}
          {filtradas.length === 0 && <div className="col-12 text-center text-secondary py-4">No hay alertas para el filtro seleccionado.</div>}
        </div>
      </SectionCard>
    </div>
  )
}

export default Alertas