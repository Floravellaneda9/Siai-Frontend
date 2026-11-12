import { useEffect, useMemo, useState } from 'react'
import { obtenerEstaciones, obtenerMediciones } from '../services/ina_Api.js'
import PageHeader from '../components/layout/PageHeader.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'

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

  const estacionSeleccionada = useMemo(
    () => estaciones.find((estacion) => String(estacion.sitecode) === siteCode),
    [estaciones, siteCode]
  )

  return (
    <div>
      <PageHeader icon="bi-graph-up" eyebrow="Datos hidrométricos" title="Mediciones" subtitle="Consulta de series y registros históricos desde fuentes del INA con filtros por estación y período." />
      <div className="row g-3 g-lg-4">
        <div className="col-12">
          <SectionCard title="Parámetros de consulta" icon="bi-sliders" subtitle="Seleccioná estación y rango de fechas para obtener registros." className="mb-0">
            <form onSubmit={buscarMediciones}>
              <div className="row g-3 align-items-end">
                <div className="col-lg-5">
                  <label className="form-label" htmlFor="estacion-ina">Estación</label>
                  <select id="estacion-ina" className="form-select" value={siteCode} onChange={(event) => setSiteCode(event.target.value)} disabled={cargandoEstaciones} required>
                    <option value="">{cargandoEstaciones ? 'Cargando estaciones...' : 'Seleccionar estación INA'}</option>
                    {estaciones.map((estacion) => (
                      <option key={estacion.sitecode} value={estacion.sitecode}>
                        {estacion.sitecode} · {estacion.nombre}{estacion.distrito ? ` · ${estacion.distrito}` : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <label className="form-label" htmlFor="mediciones-desde">Desde</label>
                  <input id="mediciones-desde" type="date" className="form-control" value={desde} max={hoy} onChange={(event) => setDesde(event.target.value)} />
                </div>
                <div className="col-sm-6 col-lg-2">
                  <label className="form-label" htmlFor="mediciones-hasta">Hasta</label>
                  <input id="mediciones-hasta" type="date" className="form-control" value={hasta} max={hoy} onChange={(event) => setHasta(event.target.value)} />
                </div>
                <div className="col-lg-2">
                  <button className="btn btn-primary w-100" type="submit" disabled={cargandoMediciones || cargandoEstaciones}>
                    <i className="bi bi-search me-1"></i>{cargandoMediciones ? 'Buscando...' : 'Consultar'}
                  </button>
                </div>
              </div>
            </form>
          </SectionCard>
        </div>

        {error && <div className="col-12"><div className="alert alert-danger d-flex align-items-center gap-2 mb-0" role="alert"><i className="bi bi-exclamation-triangle-fill"></i><span>{error}</span></div></div>}

        <div className="col-12">
          <SectionCard
            title="Resultados de consulta"
            subtitle={estacionSeleccionada ? `${estacionSeleccionada.nombre} · ${mediciones.length} registros encontrados` : 'Sin consulta activa'}
            icon="bi-table"
            noBodyPadding
          >
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th>Fecha y hora</th>
                    <th>Estación</th>
                    <th>Variable</th>
                    <th>Valor</th>
                    <th>Unidad</th>
                  </tr>
                </thead>
                <tbody>
                  {cargandoMediciones ? (
                    <tr><td colSpan="5" className="text-center py-5"><div className="spinner-border spinner-border-sm text-primary me-2"></div>Cargando mediciones INA...</td></tr>
                  ) : mediciones.length > 0 ? (
                    mediciones.map((medicion) => (
                      <tr key={medicion.obs_id || `${medicion.timestart}-${medicion.valor}`}>
                        <td className="text-secondary">{medicion.timestart ? new Date(medicion.timestart).toLocaleString() : 'Sin fecha'}</td>
                        <td className="fw-medium">{estacionSeleccionada?.nombre || siteCode}</td>
                        <td><span className="badge text-bg-light text-dark border">{medicion.var_abrev || 'Altura'}</span></td>
                        <td><strong style={{ color: 'var(--siai-text-strong)' }}>{medicion.valor ?? 'Sin dato'}</strong></td>
                        <td className="text-secondary">{medicion.unit_abrev || 'm'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">
                        <EmptyState icon="bi-graph-up-arrow" title={siteCode ? 'Sin mediciones para el período' : 'Consulta pendiente'} description={siteCode ? 'No se encontraron registros para la estación y el rango de fechas seleccionados.' : 'Seleccioná una estación y un período para consultar los datos disponibles.'} />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  )
}

export default Mediciones
