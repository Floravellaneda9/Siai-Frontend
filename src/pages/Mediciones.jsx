import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { obtenerEstaciones, obtenerMediciones } from '../services/ina_Api.js'

const fechaLocal = (fecha) => {
  const anio = fecha.getFullYear()
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const dia = String(fecha.getDate()).padStart(2, '0')
  return `${anio}-${mes}-${dia}`
}

function Mediciones() {
  const hoy = fechaLocal(new Date())
  const haceSieteDias = new Date()
  haceSieteDias.setDate(haceSieteDias.getDate() - 7)
  const [estaciones, setEstaciones] = useState([])
  const [siteCode, setSiteCode] = useState('')
  const [desde, setDesde] = useState(fechaLocal(haceSieteDias))
  const [hasta, setHasta] = useState(hoy)
  const [mediciones, setMediciones] = useState([])
  const [cargandoEstaciones, setCargandoEstaciones] = useState(true)
  const [cargandoMediciones, setCargandoMediciones] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    obtenerEstaciones()
      .then(setEstaciones)
      .catch((err) => setError(`No se pudieron cargar las estaciones INA: ${err.message}`))
      .finally(() => setCargandoEstaciones(false))
  }, [])

  async function buscarMediciones(event) {
    event.preventDefault()
    if (!siteCode) {
      setError('Seleccioná una estación para consultar sus mediciones.')
      return
    }
    if (!desde || !hasta || desde > hasta) {
      setError('Seleccioná un rango de fechas válido.')
      return
    }

    setCargandoMediciones(true)
    setError('')
    try {
      const resultado = await obtenerMediciones({ siteCode, timeStart: desde, timeEnd: hasta })
      setMediciones(resultado.data || [])
    } catch (err) {
      setMediciones([])
      setError(`No se pudieron cargar las mediciones: ${err.message}`)
    } finally {
      setCargandoMediciones(false)
    }
  }

  const estacionSeleccionada = estaciones.find(
    (estacion) => String(estacion.sitecode) === siteCode
  )

  return (
    <>
      <Navbar />
      <main className="container-fluid p-4">
        <div className="mb-4">
          <h1 className="h3 fw-bold">
            <i className="bi bi-graph-up me-2"></i>
            Mediciones
          </h1>
          <p className="text-secondary mb-0">
            Datos registrados por las estaciones de monitoreo.
          </p>
        </div>

        {/* Filtros */}
        <form className="card mb-4" onSubmit={buscarMediciones}>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label" htmlFor="estacion-ina">
                  <i className="bi bi-broadcast me-1"></i>
                  Estación
                </label>
                <select
                  id="estacion-ina"
                  className="form-select"
                  value={siteCode}
                  onChange={(event) => setSiteCode(event.target.value)}
                  disabled={cargandoEstaciones}
                  required
                >
                  <option value="">
                    {cargandoEstaciones ? 'Cargando estaciones...' : 'Seleccionar estación INA'}
                  </option>
                  {estaciones.map((estacion) => (
                    <option key={estacion.sitecode} value={estacion.sitecode}>
                      {estacion.sitecode} · {estacion.nombre}
                      {estacion.distrito ? ` · ${estacion.distrito}` : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label" htmlFor="mediciones-desde">
                  <i className="bi bi-calendar me-1"></i>
                  Desde
                </label>
                <input
                  id="mediciones-desde"
                  type="date"
                  className="form-control"
                  value={desde}
                  max={hoy}
                  onChange={(event) => setDesde(event.target.value)}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label" htmlFor="mediciones-hasta">
                  <i className="bi bi-calendar me-1"></i>
                  Hasta
                </label>
                <input
                  id="mediciones-hasta"
                  type="date"
                  className="form-control"
                  value={hasta}
                  max={hoy}
                  onChange={(event) => setHasta(event.target.value)}
                />
              </div>
              <div className="col-md-2 d-flex align-items-end">
                <button className="btn btn-primary w-100" type="submit" disabled={cargandoMediciones || cargandoEstaciones}>
                  <i className="bi bi-search me-1"></i>
                  {cargandoMediciones ? 'Buscando...' : 'Buscar'}
                </button>
              </div>
            </div>
          </div>
        </form>

        {error && <div className="alert alert-danger" role="alert">{error}</div>}

        {/* Tabla de mediciones */}
        <div className="card">
          <div className="card-header">
            <strong>
              <i className="bi bi-table me-1"></i>
              Últimas mediciones
            </strong>
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Estación</th>
                  <th>Variable</th>
                  <th>Valor</th>
                  <th>Unidad</th>
                </tr>
              </thead>
              <tbody>
                  {cargandoMediciones ? (
                    <tr><td colSpan="5" className="text-center py-4">Cargando mediciones INA...</td></tr>
                  ) : mediciones.length > 0 ? (
                    mediciones.map((medicion) => (
                      <tr key={medicion.obs_id || `${medicion.timestart}-${medicion.valor}`}>
                        <td>{medicion.timestart ? new Date(medicion.timestart).toLocaleString() : 'Sin fecha'}</td>
                        <td>{estacionSeleccionada?.nombre || siteCode}</td>
                        <td>{medicion.var_abrev || 'Altura'}</td>
                        <td><strong>{medicion.valor ?? 'Sin dato'}</strong></td>
                        <td>{medicion.unit_abrev || 'm'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-secondary py-4">
                        {siteCode ? 'No hay mediciones para la estación y el período seleccionados.' : 'Seleccioná una estación y un período para consultar los datos INA.'}
                      </td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Mediciones
