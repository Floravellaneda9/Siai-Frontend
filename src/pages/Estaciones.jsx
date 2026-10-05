import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import EstacionCard from '../components/EstacionCard'


const estaciones = [
  {
    id: 'E-001',
    nombre: 'Río Salí',
    estado: 'Activa',
    color: 'success',
    botonColor: 'primary',
    nivel: '0.82 m',
    precipitacion: '12.4 mm',
    fechaISO: '2026-10-01T09:28',
    fechaTexto: '1 de octubre de 2026, 09:28',
  },
  {
    id: 'E-004',
    nombre: 'Arroyo Nueva Esperanza',
    estado: 'Precaución',
    color: 'warning',
    botonColor: 'primary',
    nivel: '1.42 m',
    precipitacion: '48.7 mm',
    fechaISO: '2026-10-01T09:29',
    fechaTexto: '1 de octubre de 2026, 09:29',
  },
  {
    id: 'E-008',
    nombre: 'Río Lules',
    estado: 'Riesgo',
    color: 'danger',
    botonColor: 'primary',
    nivel: '1.78 m',
    precipitacion: '72.1 mm',
    fechaISO: '2026-10-01T09:29',
    fechaTexto: '1 de octubre de 2026, 09:29',
  },
  {
    id: 'E-014',
    nombre: 'Río Marapa',
    estado: 'Emergencia',
    color: 'dark',
    botonColor: 'danger',
    nivel: '2.18 m',
    precipitacion: '112.8 mm',
    fechaISO: '2026-10-01T09:30',
    fechaTexto: '1 de octubre de 2026, 09:30',
  },
]

function Estaciones() {
  return (
    <>
      <Navbar />
      <main className="bg-light">
        <div className="container-fluid p-4">
          <header className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="h3">
                <i className="bi bi-broadcast me-2" aria-hidden="true"></i>
                Estaciones
              </h1>
              <p className="text-secondary mb-0">
                Estaciones de monitoreo hidrológico.
              </p>
            </div>

            <Link className="btn btn-primary" to="/estaciones/nueva">
              <i className="bi bi-plus" aria-hidden="true"></i>
              Nueva estación
            </Link>
          </header>

          <section aria-labelledby="titulo-estaciones">
            <h2 id="titulo-estaciones" className="visually-hidden">
              Listado de estaciones
            </h2>

            <div className="row g-4">
              {estaciones.map((estacion) => (
                <EstacionCard key={estacion.id} estacion={estacion} />
                ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Estaciones