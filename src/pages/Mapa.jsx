import { useMemo, useState, useEffect } from 'react'
import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Swal from 'sweetalert2'
import { emergencia } from '../components/alertas.jsx'
import PageHeader from '../components/layout/PageHeader.jsx'

const ZONAS = [
  { estado: 'Normal', titulo: 'Zonas normales', cantidad: 18, icono: 'bi-check-circle', borde: 'border-success', badge: 'success', alertaIcon: 'success', mensaje: 'Estas zonas funcionan con normalidad. No requieren acción.' },
  { estado: 'Precaución', titulo: 'Precaución', cantidad: 1, icono: 'bi-exclamation-circle', borde: 'border-warning', badge: 'warning', alertaIcon: 'warning', mensaje: 'Los valores están por encima de lo habitual. Se recomienda seguimiento.' },
  { estado: 'Riesgo', titulo: 'Riesgo', cantidad: 1, icono: 'bi-exclamation-triangle', borde: 'border-danger', badge: 'danger', alertaIconHtml: '<i class="bi bi-exclamation-triangle-fill" style="font-size:3.5rem;color:#fd7e14"></i>', mensaje: 'Superan el umbral de riesgo. Se recomienda avisar a Defensa Civil.' },
  { estado: 'Emergencia', titulo: 'Emergencia', cantidad: 1, icono: 'bi-shield-exclamation', borde: 'border-dark', badge: 'dark', alertaIconHtml: '<i class="bi bi-exclamation-octagon-fill" style="font-size:3.5rem;color:#212529"></i>', mensaje: 'Nivel crítico de emergencia. Se requiere acción inmediata y evacuación preventiva si corresponde.' }
]

const estaciones = [
  { id: 'E-001', nombre: 'Río Salí', latitud: -26.8241, longitud: -65.1665, nivel: '0.82 m', precipitacion: '12.4 mm', estado: 'Normal', color: '#198754' },
  { id: 'E-002', nombre: 'Canal Norte', latitud: -26.7980, longitud: -65.2100, nivel: '0.76 m', precipitacion: '10.1 mm', estado: 'Normal', color: '#198754' },
  { id: 'E-003', nombre: 'Río Vipos', latitud: -26.4850, longitud: -65.3600, nivel: '0.68 m', precipitacion: '8.3 mm', estado: 'Normal', color: '#198754' },
  { id: 'E-004', nombre: 'Arroyo Nueva Esperanza', latitud: -26.7450, longitud: -65.2900, nivel: '1.42 m', precipitacion: '48.7 mm', estado: 'Precaución', color: '#ffc107' },
  { id: 'E-005', nombre: 'Río Colorado', latitud: -26.6200, longitud: -65.2000, nivel: '0.71 m', precipitacion: '9.8 mm', estado: 'Normal', color: '#198754' },
  { id: 'E-006', nombre: 'Río Acequiones', latitud: -26.8700, longitud: -65.3900, nivel: '0.79 m', precipitacion: '11.2 mm', estado: 'Normal', color: '#198754' },
  { id: 'E-007', nombre: 'Dique La Angostura', latitud: -26.9200, longitud: -65.6800, nivel: '0.65 m', precipitacion: '7.4 mm', estado: 'Normal', color: '#198754' },
  { id: 'E-008', nombre: 'Río Lules', latitud: -26.9280, longitud: -65.3380, nivel: '1.78 m', precipitacion: '72.1 mm', estado: 'Riesgo', color: '#dc3545' },
  { id: 'E-009', nombre: 'Río Famaillá', latitud: -27.0500, longitud: -65.4000, nivel: '0.84 m', precipitacion: '13.0 mm', estado: 'Normal', color: '#198754' },
  { id: 'E-010', nombre: 'Río Seco', latitud: -27.1600, longitud: -65.3200, nivel: '0.73 m', precipitacion: '9.5 mm', estado: 'Normal', color: '#198754' },
  { id: 'E-011', nombre: 'Río Gastona', latitud: -27.3500, longitud: -65.4200, nivel: '0.88 m', precipitacion: '14.2 mm', estado: 'Normal', color: '#198754' },
  { id: 'E-012', nombre: 'Río Chico', latitud: -27.4500, longitud: -65.6200, nivel: '0.69 m', precipitacion: '8.9 mm', estado: 'Normal', color: '#198754' },
  { id: 'E-013', nombre: 'Arroyo Barrientos', latitud: -26.7800, longitud: -65.1400, nivel: '0.74 m', precipitacion: '10.6 mm', estado: 'Normal', color: '#198754' },
  { id: 'E-014', nombre: 'Río Medinas', latitud: -27.4300, longitud: -65.5200, nivel: '0.81 m', precipitacion: '12.0 mm', estado: 'Normal', color: '#198754' },
  { id: 'E-015', nombre: 'Canal Sur', latitud: -26.9000, longitud: -65.1200, nivel: '0.77 m', precipitacion: '11.4 mm', estado: 'Normal', color: '#198754' },
  { id: 'E-016', nombre: 'Río Solco', latitud: -26.5600, longitud: -65.0500, nivel: '0.66 m', precipitacion: '7.9 mm', estado: 'Normal', color: '#198754' },
  { id: 'E-017', nombre: 'Arroyo Mista', latitud: -27.0200, longitud: -65.2500, nivel: '0.72 m', precipitacion: '9.1 mm', estado: 'Normal', color: '#198754' },
  { id: 'E-018', nombre: 'Río Calimayo', latitud: -26.7000, longitud: -65.4500, nivel: '0.70 m', precipitacion: '8.7 mm', estado: 'Normal', color: '#198754' },
  { id: 'E-019', nombre: 'Río Pueblo Viejo', latitud: -27.2000, longitud: -65.5200, nivel: '0.83 m', precipitacion: '12.8 mm', estado: 'Normal', color: '#198754' },
  { id: 'E-020', nombre: 'Río Potrero', latitud: -26.8300, longitud: -65.4800, nivel: '0.75 m', precipitacion: '10.3 mm', estado: 'Normal', color: '#198754' },
  { id: 'E-021', nombre: 'Río Marapa', latitud: -27.2500, longitud: -65.3100, nivel: '2.18 m', precipitacion: '112.8 mm', estado: 'Emergencia', color: '#212529' }
]

const estados = ['Normal', 'Precaución', 'Riesgo', 'Emergencia']

function Mapa() {
  const [estadosVisibles, setEstadosVisibles] = useState(estados)

  const alternarEstado = (estado) => {
    setEstadosVisibles((actuales) =>
      actuales.includes(estado) ? actuales.filter((v) => v !== estado) : [...actuales, estado]
    )
  }

  const estacionesVisibles = useMemo(
    () => estaciones.filter((estacion) => estadosVisibles.includes(estacion.estado)),
    [estadosVisibles]
  )

  useEffect(() => {
    try {
      if (sessionStorage.getItem('siai-aviso-mapa')) return
      sessionStorage.setItem('siai-aviso-mapa', '1')
    } catch {
      // Ignorar fallos de almacenamiento local
    }
    const emerg = ZONAS.find((z) => z.estado === 'Emergencia')?.cantidad || 0
    const riesgo = ZONAS.find((z) => z.estado === 'Riesgo')?.cantidad || 0
    if (emerg > 0 || riesgo > 0) {
      const partes = []
      if (emerg > 0) partes.push(`${emerg} en Emergencia`)
      if (riesgo > 0) partes.push(`${riesgo} en Riesgo`)
      emergencia('Zonas en alerta', `Hay zonas críticas en la provincia: ${partes.join(' y ')}.`)
    }
  }, [])

  function verZona(zona) {
    Swal.fire({
      ...(zona.alertaIconHtml
        ? { iconHtml: zona.alertaIconHtml, customClass: { icon: 'swal-sin-borde' } }
        : { icon: zona.alertaIcon }),
      title: `${zona.titulo}: ${zona.cantidad} ${zona.cantidad === 1 ? 'zona' : 'zonas'}`,
      text: zona.mensaje,
      confirmButtonText: 'Cerrar'
    })
  }

  return (
    <div>
      <PageHeader
        icon="bi-map"
        title="Mapa de monitoreo"
        subtitle="Visualización geográfica de estaciones hidrológicas y zonas de riesgo en Tucumán."
      />
      <div className="row g-3">
        <div className="col-lg-8">
          <div className="card h-100">
            <div className="card-header d-flex justify-content-between align-items-center">
              <strong><i className="bi bi-geo-alt me-1"></i>Mapa de estaciones</strong>
              <span className="badge text-bg-success"><i className="bi bi-circle-fill me-1"></i>Sistema activo</span>
            </div>
            <div className="card-body p-0">
              <div className="d-flex flex-wrap align-items-center gap-2 p-3 border-bottom" aria-label="Filtrar estaciones por estado">
                <span className="small fw-semibold me-1">Mostrar:</span>
                {estados.map((estado) => {
                  const colorEstado = { Normal: '#198754', 'Precaución': '#ffc107', Riesgo: '#dc3545', Emergencia: '#212529' }[estado]
                  const activo = estadosVisibles.includes(estado)
                  return (
                    <button
                      key={estado}
                      className={`btn btn-sm ${activo ? 'btn-outline-secondary' : 'btn-outline-light text-secondary border'}`}
                      type="button"
                      aria-pressed={activo}
                      onClick={() => alternarEstado(estado)}
                    >
                      <i className="bi bi-circle-fill me-1" style={{ color: colorEstado }}></i>
                      {estado}
                    </button>
                  )
                })}
              </div>
              <MapContainer
                center={[-26.95, -65.36]}
                zoom={8}
                scrollWheelZoom
                style={{ height: 'min(60vh, 520px)', minHeight: '360px', width: '100%' }}
                aria-label="Mapa interactivo de estaciones hidrológicas de Tucumán"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {estacionesVisibles.map((estacion) => (
                  <CircleMarker
                    key={estacion.id}
                    center={[estacion.latitud, estacion.longitud]}
                    radius={9}
                    pathOptions={{ color: '#fff', weight: 2, fillColor: estacion.color, fillOpacity: 1 }}
                  >
                    <Popup>
                      <strong>{estacion.nombre}</strong>
                      <div className="small mt-1">Estación {estacion.id}</div>
                      <div className="small">Estado: <strong>{estacion.estado}</strong></div>
                      <div className="small">Nivel: {estacion.nivel}</div>
                      <div className="small">Precipitación: {estacion.precipitacion}</div>
                    </Popup>
                  </CircleMarker>
                ))}
              </MapContainer>
              <div className="px-3 py-2 small text-secondary border-top">
                {estacionesVisibles.length} de {estaciones.length} estaciones visibles
              </div>
            </div>
            <div className="card-footer">
              <strong className="me-3"><i className="bi bi-info-circle me-1"></i>Referencias:</strong>
              <span className="badge text-bg-success me-2">Normal</span>
              <span className="badge text-bg-warning me-2">Precaución</span>
              <span className="badge text-bg-danger me-2">Riesgo</span>
              <span className="badge text-bg-dark">Emergencia</span>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card h-100">
            <div className="card-header"><strong><i className="bi bi-layers me-1"></i>Resumen por zona</strong></div>
            <div className="card-body">
              <div className="d-flex flex-column gap-2">
                {ZONAS.map((zona) => (
                  <div
                    key={zona.estado}
                    className={`border rounded-3 p-3 ${zona.borde}`}
                    role="button"
                    tabIndex={0}
                    style={{ cursor: 'pointer' }}
                    onClick={() => verZona(zona)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        verZona(zona)
                      }
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-semibold"><i className={`bi ${zona.icono} me-1`}></i>{zona.titulo}</div>
                        <div className="text-secondary small">{zona.estado}</div>
                      </div>
                      <div className="text-end">
                        <div className="fs-4 fw-bold">{zona.cantidad}</div>
                        <span className={`badge text-bg-${zona.badge}`}>zonas</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mapa
