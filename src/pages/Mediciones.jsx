import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const mediciones = [
  {
    id: 1,
    fechaISO: '2026-10-01T09:30',
    fechaTexto: '01/10/2026 09:30',
    estacion: 'E-014',
    nivel: '2.18 m',
    precipitacion: '112.8 mm',
    humedad: '86%',
    temperatura: '19.2 °C',
    estado: 'Crítico',
    color: 'danger',
    destacado: true,
  },
  {
    id: 2,
    fechaISO: '2026-10-01T09:29',
    fechaTexto: '01/10/2026 09:29',
    estacion: 'E-008',
    nivel: '1.78 m',
    precipitacion: '72.1 mm',
    humedad: '82%',
    temperatura: '19.8 °C',
    estado: 'Riesgo',
    color: 'warning',
  },
  {
    id: 3,
    fechaISO: '2026-10-01T09:29',
    fechaTexto: '01/10/2026 09:29',
    estacion: 'E-004',
    nivel: '1.42 m',
    precipitacion: '48.7 mm',
    humedad: '78%',
    temperatura: '20.1 °C',
    estado: 'Precaución',
    color: 'warning',
  },
  {
    id: 4,
    fechaISO: '2026-10-01T09:28',
    fechaTexto: '01/10/2026 09:28',
    estacion: 'E-001',
    nivel: '0.82 m',
    precipitacion: '12.4 mm',
    humedad: '71%',
    temperatura: '21.4 °C',
    estado: 'Normal',
    color: 'success',
  },
]

const estaciones = ['E-001', 'E-004', 'E-008', 'E-014']

function Mediciones() {
  const [estacion, setEstacion] = useState('')
  const [desde, setDesde] = useState('')
  const [hasta, setHasta] = useState('')

  const medicionesFiltradas = mediciones.filter((m) => {
    const dia = m.fechaISO.slice(0, 10)
    if (estacion && m.estacion !== estacion) return false
    if (desde && dia < desde) return false
    if (hasta && dia > hasta) return false
    return true
  })

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <Navbar />
      <main className="bg-light">
        <div className="container-fluid p-4">
          <header className="mb-4">
            <h1 className="h3">
              <i className="bi bi-graph-up me-2" aria-hidden="true"></i>
              Mediciones
            </h1>
            <p className="text-secondary mb-0">
              Datos registrados por las estaciones.
            </p>
          </header>

          <section className="card shadow-sm mb-4" aria-labelledby="titulo-filtros">
            <div className="card-body">
              <h2 id="titulo-filtros" className="visually-hidden">
                Filtrar mediciones
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label htmlFor="filtro-estacion" className="form-label">
                      Estación
                    </label>
                    <select
                      id="filtro-estacion"
                      name="estacion"
                      className="form-select"
                      value={estacion}
                      onChange={(e) => setEstacion(e.target.value)}
                    >
                      <option value="">Todas</option>
                      {estaciones.map((id) => (
                        <option key={id} value={id}>
                          {id}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="filtro-desde" className="form-label">
                      Desde
                    </label>
                    <input
                      type="date"
                      id="filtro-desde"
                      name="desde"
                      className="form-control"
                      value={desde}
                      onChange={(e) => setDesde(e.target.value)}
                    />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="filtro-hasta" className="form-label">
                      Hasta
                    </label>
                    <input
                      type="date"
                      id="filtro-hasta"
                      name="hasta"
                      className="form-control"
                      value={hasta}
                      onChange={(e) => setHasta(e.target.value)}
                    />
                  </div>

                  <div className="col-md-2 d-flex align-items-end">
                    <button type="submit" className="btn btn-primary w-100">
                      <i className="bi bi-search" aria-hidden="true"></i> Buscar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </section>

          <section className="card shadow-sm" aria-labelledby="titulo-mediciones">
            <div className="card-header">
              <h2 id="titulo-mediciones" className="h6 mb-0">
                Últimas mediciones
              </h2>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <caption className="visually-hidden">
                  Últimas mediciones de nivel, precipitación, humedad y temperatura por estación
                </caption>

                <thead className="table-light">
                  <tr>
                    <th scope="col">Fecha</th>
                    <th scope="col">Estación</th>
                    <th scope="col">Nivel</th>
                    <th scope="col">Precipitación</th>
                    <th scope="col">Humedad</th>
                    <th scope="col">Temperatura</th>
                    <th scope="col">Estado</th>
                  </tr>
                </thead>

                <tbody>
                  {medicionesFiltradas.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center text-secondary py-4">
                        No hay mediciones para los filtros seleccionados.
                      </td>
                    </tr>
                  ) : (
                    medicionesFiltradas.map((m) => (
                      <tr key={m.id}>
                        <td>
                          <time dateTime={m.fechaISO}>{m.fechaTexto}</time>
                        </td>
                        <th scope="row" className="fw-normal">
                          {m.estacion}
                        </th>
                        <td>{m.destacado ? <strong>{m.nivel}</strong> : m.nivel}</td>
                        <td>{m.precipitacion}</td>
                        <td>{m.humedad}</td>
                        <td>{m.temperatura}</td>
                        <td>
                          <span className={`badge text-bg-${m.color}`}>{m.estado}</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Mediciones