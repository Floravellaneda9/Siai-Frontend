import { useState } from 'react'
import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { emergencia } from '../components/alertas.jsx'


const ZONAS = [
  {
    estado: 'Normal',
    titulo: 'Zonas normales',
    cantidad: 18,
    icono: 'bi-check-circle',
    borde: 'border-success',
    badge: 'success',
    alertaIcon: 'success',
    mensaje: 'Estas zonas funcionan con normalidad. No requieren acción.'
  },
  {
    estado: 'Precaución',
    titulo: 'Precaución',
    cantidad: 5,
    icono: 'bi-exclamation-circle',
    borde: 'border-warning',
    badge: 'warning',
    alertaIcon: 'warning',
    mensaje: 'Los valores están por encima de lo habitual. Se recomienda seguimiento.'
  },
  {
    estado: 'Riesgo',
    titulo: 'Riesgo',
    cantidad: 3,
    icono: 'bi-exclamation-triangle',
    borde: 'border-danger',
    badge: 'danger',
    alertaIconHtml:
      '<i class="bi bi-exclamation-triangle-fill" style="font-size:3.5rem;color:#fd7e14"></i>',
    mensaje: 'Superan el umbral de riesgo. Se recomienda avisar a Defensa Civil.'
  },
  {
    estado: 'Emergencia',
    titulo: 'Emergencia',
    cantidad: 1,
    icono: 'bi-shield-exclamation',
    borde: 'border-dark',
    badge: 'dark',
    alertaIconHtml:
      '<i class="bi bi-exclamation-octagon-fill" style="font-size:3.5rem;color:#dc3545"></i>',
    mensaje: 'Nivel crítico. Se requiere acción inmediata.'
  }
]

const estaciones = [
  {
    id: 'E-001',
    nombre: 'Río Salí',
    latitud: -26.8241,
    longitud: -65.1665,
    nivel: '0.82 m',
    precipitacion: '12.4 mm',
    estado: 'Normal',
    color: '#198754'
  },
  {
    id: 'E-004',
    nombre: 'Arroyo Nueva Esperanza',
    latitud: -26.745,
    longitud: -65.29,
    nivel: '1.42 m',
    precipitacion: '48.7 mm',
    estado: 'Precaución',
    color: '#ffc107'
  },
  {
    id: 'E-008',
    nombre: 'Río Lules',
    latitud: -26.928,
    longitud: -65.338,
    nivel: '1.78 m',
    precipitacion: '72.1 mm',
    estado: 'Riesgo',
    color: '#dc3545'
  },
  {
    id: 'E-014',
    nombre: 'Río Marapa',
    latitud: -27.25,
    longitud: -65.31,
    nivel: '2.18 m',
    precipitacion: '112.8 mm',
    estado: 'Emergencia',
    color: '#212529'
  }
]

const estados = ['Normal', 'Precaución', 'Riesgo', 'Emergencia']

function Mapa() {
  const [estadosVisibles, setEstadosVisibles] = useState(estados)

  const alternarEstado = (estado) => {
    setEstadosVisibles((actuales) => actuales.includes(estado)
      ? actuales.filter((visible) => visible !== estado)
      : [...actuales, estado])
  }

  const estacionesVisibles = estaciones.filter((estacion) => estadosVisibles.includes(estacion.estado))

  useEffect(() => {
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
    <>
      <Navbar />
      <main className="container-fluid p-4">
        <div className="mb-4">
          <h1 className="h3 fw-bold">
            <i className="bi bi-map me-2"></i>
            Mapa de riesgo
          </h1>
          <p className="text-secondary mb-0">
            Visualización de las estaciones y zonas de riesgo de la provincia de Tucumán.
          </p>
        </div>

        <div className="card mb-4">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <strong>
                <i className="bi bi-geo-alt me-1"></i>
                Mapa de monitoreo
              </strong>
              <span className="badge text-bg-success">
                <i className="bi bi-circle-fill me-1"></i>
                Sistema activo
              </span>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="d-flex flex-wrap align-items-center gap-2 p-3 border-bottom" aria-label="Filtrar estaciones por estado">
              <span className="small fw-semibold me-1">Mostrar:</span>
              {estados.map((estado) => {
                const estacion = estaciones.find((item) => item.estado === estado)
                const activo = estadosVisibles.includes(estado)
                return (
                  <button
                    className={`btn btn-sm ${activo ? 'btn-outline-secondary' : 'btn-outline-light text-secondary'}`}
                    type="button"
                    key={estado}
                    aria-pressed={activo}
                    onClick={() => alternarEstado(estado)}
                  >
                    <i className="bi bi-circle-fill me-1" style={{ color: estacion.color }}></i>
                    {estado}
                  </button>
                )
              })}
            </div>
            <MapContainer
              center={[-26.95, -65.36]}
              zoom={8}
              scrollWheelZoom
              style={{ height: 'min(62vh, 580px)', minHeight: '360px', width: '100%' }}
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
            <strong className="me-3">
              <i className="bi bi-info-circle me-1"></i>
              Referencias:
            </strong>
            <span className="badge text-bg-success me-2">Normal</span>
            <span className="badge text-bg-warning me-2">Precaución</span>
            <span className="badge text-bg-danger me-2">Riesgo</span>
            <span className="badge text-bg-dark">Emergencia</span>
          </div>
        </div>

        <div className="row g-4">
          {ZONAS.map((zona) => (
            <div className="col-md-6 col-xl-3" key={zona.estado}>
              <div
                className={`card ${zona.borde} h-100`}
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
                <div className="card-body">
                  <h6 className="text-secondary text-uppercase">
                    <i className={`bi ${zona.icono} me-1`}></i>
                    {zona.titulo}
                  </h6>
                  <h2 className="display-4 fw-bold my-2">{zona.cantidad}</h2>
                  <span className={`badge text-bg-${zona.badge}`}>{zona.estado}</span>
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

export default Mapa