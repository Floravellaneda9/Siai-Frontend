import { useState } from 'react'
import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

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
          <div className="col-md-6 col-xl-3">
            <div className="card border-success h-100">
              <div className="card-body">
                <h6 className="text-secondary text-uppercase">
                  <i className="bi bi-check-circle me-1"></i>
                  Zonas normales
                </h6>
                <h2 className="display-4 fw-bold my-2">18</h2>
                <span className="badge text-bg-success">Normal</span>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-3">
            <div className="card border-warning h-100">
              <div className="card-body">
                <h6 className="text-secondary text-uppercase">
                  <i className="bi bi-exclamation-circle me-1"></i>
                  Precaución
                </h6>
                <h2 className="display-4 fw-bold my-2">5</h2>
                <span className="badge text-bg-warning">Precaución</span>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-3">
            <div className="card border-danger h-100">
              <div className="card-body">
                <h6 className="text-secondary text-uppercase">
                  <i className="bi bi-exclamation-triangle me-1"></i>
                  Riesgo
                </h6>
                <h2 className="display-4 fw-bold my-2">3</h2>
                <span className="badge text-bg-danger">Riesgo</span>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-3">
            <div className="card border-dark h-100">
              <div className="card-body">
                <h6 className="text-secondary text-uppercase">
                  <i className="bi bi-shield-exclamation me-1"></i>
                  Emergencia
                </h6>
                <h2 className="display-4 fw-bold my-2">1</h2>
                <span className="badge text-bg-dark">Emergencia</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Mapa
