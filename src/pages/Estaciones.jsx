import { useMemo, useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { emergencia, toast } from '../components/alertas.jsx'
import PageHeader from '../components/layout/PageHeader.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'
import StatCard from '../components/ui/StatCard.jsx'
import StatusBadge from '../components/ui/StatusBadge.jsx'
import { escaparHtml as escapar } from '../utils/html.js'

const ESTACIONES_INICIALES = [
  { id: 'E-001', nombre: 'Río Salí', tipo: 'Estación hidrológica', nivel: '0.82 m', precipitacion: '12.4 mm', actualizacion: 'hace 2 minutos', estado: 'Activa', badgeColor: 'success', iconColor: 'var(--accent)', btnClass: 'btn-outline-primary' },
  { id: 'E-004', nombre: 'Arroyo Nueva Esperanza', tipo: 'Estación hidrológica', nivel: '1.42 m', precipitacion: '48.7 mm', actualizacion: 'hace 1 minuto', estado: 'Precaución', badgeColor: 'warning', iconColor: 'var(--accent)', btnClass: 'btn-outline-primary' },
  { id: 'E-008', nombre: 'Río Lules', tipo: 'Estación hidrológica', nivel: '1.78 m', precipitacion: '72.1 mm', actualizacion: 'hace 30 segundos', estado: 'Riesgo', badgeColor: 'danger', iconColor: 'var(--danger)', btnClass: 'btn-outline-danger' },
  { id: 'E-014', nombre: 'Río Marapa', tipo: 'Estación hidrológica', nivel: '2.18 m', precipitacion: '112.8 mm', actualizacion: 'hace 15 segundos', estado: 'Emergencia', badgeColor: 'dark', iconColor: 'var(--danger)', btnClass: 'btn-outline-danger' }
]

const ICONO_POR_ESTADO = { Activa: 'success', 'Precaución': 'warning' }
const ICONO_HTML_POR_ESTADO = {
  Riesgo: '<i class="bi bi-exclamation-triangle-fill" style="font-size:3.5rem;color:#fd7e14"></i>',
  Emergencia: '<i class="bi bi-exclamation-octagon-fill" style="font-size:3.5rem;color:#dc3545"></i>'
}
const MENSAJE_POR_ESTADO = {
  Activa: 'La estación funciona con normalidad.',
  'Precaución': 'Los valores están por encima de lo habitual. Se recomienda seguimiento.',
  Riesgo: 'Los valores superan el umbral de riesgo. Atención de Defensa Civil recomendada.',
  Emergencia: 'Nivel crítico. Se requiere acción inmediata.'
}
function Estaciones() {
  const [estaciones, setEstaciones] = useState(ESTACIONES_INICIALES)
  const [busqueda, setBusqueda] = useState('')
  const [estadoFiltro, setEstadoFiltro] = useState('TODOS')

  useEffect(() => {
    try {
      if (sessionStorage.getItem('siai-aviso-estaciones')) return
      sessionStorage.setItem('siai-aviso-estaciones', '1')
    } catch (error) {
      console.warn('No se pudo acceder al aviso de estaciones en sessionStorage.', error)
    }
    const criticas = ESTACIONES_INICIALES.filter((e) => e.estado === 'Riesgo' || e.estado === 'Emergencia')
    if (criticas.length > 0) {
      emergencia('Estaciones en alerta', `Hay ${criticas.length} estación(es) con nivel crítico: ${criticas.map((e) => `${e.nombre} (${e.estado})`).join(', ')}.`)
    }
  }, [])

  const filtradas = useMemo(() => {
    const q = busqueda.trim().toLowerCase()
    return estaciones.filter(e => {
      const matchQ = !q || e.id.toLowerCase().includes(q) || e.nombre.toLowerCase().includes(q)
      const matchE = estadoFiltro === 'TODOS' || e.estado === estadoFiltro
      return matchQ && matchE
    })
  }, [estaciones, busqueda, estadoFiltro])

  function verDetalles(estacion) {
    const iconoHtml = ICONO_HTML_POR_ESTADO[estacion.estado]
    Swal.fire({
      ...(iconoHtml ? { iconHtml: iconoHtml, customClass: { icon: 'swal-sin-borde' } } : { icon: ICONO_POR_ESTADO[estacion.estado] || 'info' }),
      titleText: `${estacion.id} · ${estacion.nombre}`,
      html: `<div class="text-start"><p class="mb-1"><strong>Tipo:</strong> ${escapar(estacion.tipo)}</p><p class="mb-1"><strong>Estado:</strong> ${escapar(estacion.estado)}</p><p class="mb-1"><strong>Nivel:</strong> ${escapar(estacion.nivel)}</p><p class="mb-1"><strong>Precipitación:</strong> ${escapar(estacion.precipitacion)}</p><p class="mb-3"><strong>Actualización:</strong> ${escapar(estacion.actualizacion)}</p><p class="text-secondary mb-0">${escapar(MENSAJE_POR_ESTADO[estacion.estado] || '')}</p></div>`,
      confirmButtonText: 'Cerrar'
    })
  }

  async function nuevaEstacion() {
    const { value: datos } = await Swal.fire({
      title: 'Nueva estación', html: `<input id="swal-id" class="swal2-input" placeholder="Código (ej. E-020)"><input id="swal-nombre" class="swal2-input" placeholder="Nombre de la estación"><select id="swal-tipo" class="swal2-select"><option value="Estación hidrológica">Estación hidrológica</option><option value="Estación meteorológica">Estación meteorológica</option><option value="Estación pluviométrica">Estación pluviométrica</option></select>`,
      focusConfirm: false, showCancelButton: true, confirmButtonText: 'Guardar', cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const popup = Swal.getPopup()
        const id = popup.querySelector('#swal-id').value.trim().toUpperCase()
        const nombre = popup.querySelector('#swal-nombre').value.trim()
        const tipo = popup.querySelector('#swal-tipo').value
        if (!id || !nombre) { Swal.showValidationMessage('Completá el código y el nombre.'); return false }
        if (estaciones.some((e) => e.id === id)) { Swal.showValidationMessage(`Ya existe una estación con el código ${id}.`); return false }
        return { id, nombre, tipo }
      }
    })
    if (!datos) return
    setEstaciones((prev) => [...prev, { ...datos, nivel: 'Sin datos', precipitacion: 'Sin datos', actualizacion: 'sin lecturas', estado: 'Activa', badgeColor: 'success', iconColor: 'var(--accent)', btnClass: 'btn-outline-primary' }])
    toast.fire({ icon: 'success', title: 'Estación creada correctamente' })
  }

  const stats = {
    total: estaciones.length,
    activas: estaciones.filter(e=>e.estado==='Activa').length,
    alerta: estaciones.filter(e=>['Precaución','Riesgo','Emergencia'].includes(e.estado)).length,
    criticas: estaciones.filter(e=>['Riesgo','Emergencia'].includes(e.estado)).length,
  }

  return (
    <div>
      <PageHeader icon="bi-broadcast" eyebrow="Red de monitoreo" title="Estaciones" subtitle="Administración y seguimiento de estaciones hidrológicas y meteorológicas en la provincia." actions={<button className="btn btn-primary" onClick={nuevaEstacion}><i className="bi bi-plus-lg me-1"></i>Nueva estación</button>} />
      <div className="row g-3 mb-4">
        <div className="col-6 col-xl-3"><StatCard label="Total estaciones" value={stats.total} icon="bi-broadcast-pin" tone="primary" meta="Registradas en la red" /></div>
        <div className="col-6 col-xl-3"><StatCard label="Activas" value={stats.activas} icon="bi-check-circle" tone="success" meta="Operación normal" /></div>
        <div className="col-6 col-xl-3"><StatCard label="En alerta" value={stats.alerta} icon="bi-exclamation-triangle" tone="warning" meta="Requieren seguimiento" /></div>
        <div className="col-6 col-xl-3"><StatCard label="Críticas" value={stats.criticas} icon="bi-exclamation-octagon" tone="danger" meta="Riesgo o emergencia" /></div>
      </div>

      <SectionCard
        title="Listado de estaciones"
        subtitle={`${filtradas.length} de ${estaciones.length} estaciones visibles`}
        icon="bi-table"
        actions={
          <div className="d-flex flex-wrap gap-2">
            <div className="input-group input-group-sm" style={{ minWidth: 220 }}>
              <span className="input-group-text"><i className="bi bi-search"></i></span>
              <input className="form-control" placeholder="Buscar por código o nombre..." value={busqueda} onChange={e=>setBusqueda(e.target.value)} />
            </div>
            <select className="form-select form-select-sm" style={{ minWidth: 170 }} value={estadoFiltro} onChange={e=>setEstadoFiltro(e.target.value)}>
              <option value="TODOS">Todos los estados</option><option value="Activa">Activa</option><option value="Precaución">Precaución</option><option value="Riesgo">Riesgo</option><option value="Emergencia">Emergencia</option>
            </select>
          </div>
        }
        noBodyPadding
      >
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead><tr><th>Código</th><th>Estación</th><th>Tipo</th><th>Nivel</th><th>Precipitación</th><th>Estado</th><th>Actualización</th><th className="text-end">Acción</th></tr></thead>
            <tbody>
              {filtradas.map((estacion) => (
                <tr key={estacion.id}>
                  <td><span className="fw-semibold text-primary">{estacion.id}</span></td>
                  <td><div className="fw-semibold">{estacion.nombre}</div></td>
                  <td className="text-secondary small">{estacion.tipo}</td>
                  <td><span className="d-inline-flex align-items-center gap-1"><i className="bi bi-water text-primary"></i><strong>{estacion.nivel}</strong></span></td>
                  <td><span className="d-inline-flex align-items-center gap-1"><i className="bi bi-cloud-rain text-info"></i>{estacion.precipitacion}</span></td>
                  <td><StatusBadge status={estacion.estado} tone={estacion.badgeColor} /></td>
                  <td className="text-secondary small">{estacion.actualizacion}</td>
                  <td className="text-end"><button className={`btn btn-sm ${estacion.btnClass}`} onClick={() => verDetalles(estacion)}><i className="bi bi-eye me-1"></i>Detalle</button></td>
                </tr>
              ))}
              {filtradas.length === 0 && <tr><td colSpan="8" className="text-center text-secondary py-5">No se encontraron estaciones con los filtros aplicados.</td></tr>}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  )
}

export default Estaciones