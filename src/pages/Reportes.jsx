import { useState } from 'react'
import PageHeader from '../components/layout/PageHeader.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'

function Reportes() {
  const [tipo, setTipo] = useState('operativo')
  const [formato, setFormato] = useState('pdf')
  const [desde, setDesde] = useState('')
  const [hasta, setHasta] = useState('')
  const [generados, setGenerados] = useState([])

  function generar(event) {
    event.preventDefault()
    const item = {
      id: Date.now(),
      tipo,
      formato,
      desde: desde || '—',
      hasta: hasta || '—',
      fecha: new Date().toLocaleString(),
      estado: 'Listo'
    }
    setGenerados((prev) => [item, ...prev].slice(0, 8))
  }

  const tipos = [
    { id: 'operativo', nombre: 'Estado operativo', desc: 'Resumen de estaciones, niveles y estado de red.' },
    { id: 'alertas', nombre: 'Alertas y eventos', desc: 'Historial de alertas emitidas y eventos críticos.' },
    { id: 'hidro', nombre: 'Mediciones hidrométricas', desc: 'Series de niveles y precipitaciones por período.' },
  ]

  return (
    <div>
      <PageHeader icon="bi-file-earmark-bar-graph" eyebrow="Gestión" title="Reportes" subtitle="Generación y seguimiento de informes operativos para análisis, auditoría y toma de decisiones." />

      <div className="row g-3 mb-4">
        {tipos.map((t) => (
          <div className="col-md-4" key={t.id}>
            <button type="button" className={`card h-100 text-start w-100 ${tipo === t.id ? 'border-primary shadow-sm' : ''}`} onClick={() => setTipo(t.id)} style={{ cursor: 'pointer', transition: 'all .15s ease' }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="fw-bold" style={{ color: 'var(--siai-text-strong)' }}>{t.nombre}</span>
                  {tipo === t.id ? <i className="bi bi-check-circle-fill text-primary fs-5"></i> : <i className="bi bi-circle text-secondary"></i>}
                </div>
                <p className="text-secondary small mb-0">{t.desc}</p>
              </div>
            </button>
          </div>
        ))}
      </div>

      <div className="row g-3 g-lg-4">
        <div className="col-lg-5">
          <SectionCard title="Parámetros de generación" icon="bi-sliders" subtitle="Configurá el alcance, período y formato de exportación.">
            <form onSubmit={generar}>
              <div className="mb-3">
                <label className="form-label" htmlFor="reporte-tipo">Tipo de reporte</label>
                <select id="reporte-tipo" className="form-select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                  <option value="operativo">Estado operativo</option>
                  <option value="alertas">Alertas y eventos</option>
                  <option value="hidro">Mediciones hidrométricas</option>
                </select>
              </div>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label className="form-label" htmlFor="reporte-desde">Desde</label>
                  <input id="reporte-desde" type="date" className="form-control" value={desde} onChange={(e) => setDesde(e.target.value)} />
                </div>
                <div className="col-sm-6">
                  <label className="form-label" htmlFor="reporte-hasta">Hasta</label>
                  <input id="reporte-hasta" type="date" className="form-control" value={hasta} onChange={(e) => setHasta(e.target.value)} />
                </div>
              </div>
              <div className="mt-3 mb-4">
                <label className="form-label">Formato de salida</label>
                <div className="d-flex gap-2">
                  <input type="radio" className="btn-check" name="formato" id="fmt-pdf" checked={formato === 'pdf'} onChange={() => setFormato('pdf')} />
                  <label className="btn btn-outline-secondary flex-fill" htmlFor="fmt-pdf"><i className="bi bi-file-earmark-pdf me-1"></i>PDF</label>
                  <input type="radio" className="btn-check" name="formato" id="fmt-xlsx" checked={formato === 'xlsx'} onChange={() => setFormato('xlsx')} />
                  <label className="btn btn-outline-secondary flex-fill" htmlFor="fmt-xlsx"><i className="bi bi-file-earmark-spreadsheet me-1"></i>Excel</label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-100"><i className="bi bi-gear-wide-connected me-1"></i>Generar reporte</button>
              <p className="text-secondary small mt-3 mb-0 p-3 rounded-3" style={{ background: 'var(--siai-surface-alt)', border: '1px solid var(--siai-divider)' }}><i className="bi bi-info-circle me-1"></i>La exportación final se habilitará al integrar el servicio de generación de reportes.</p>
            </form>
          </SectionCard>
        </div>

        <div className="col-lg-7">
          <SectionCard title="Actividad reciente" icon="bi-clock-history" subtitle="Últimas solicitudes generadas en esta sesión." noBodyPadding={generados.length > 0}>
            {generados.length === 0 ? (
              <EmptyState icon="bi-file-earmark-bar-graph" title="Sin reportes generados" description="Configurá los parámetros y generá tu primer informe operativo." />
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead><tr><th>Tipo</th><th>Período</th><th>Formato</th><th>Fecha</th><th>Estado</th></tr></thead>
                  <tbody>
                    {generados.map((r) => (
                      <tr key={r.id}>
                        <td className="fw-semibold">{tipos.find(t => t.id === r.tipo)?.nombre || r.tipo}</td>
                        <td className="text-secondary small">{r.desde} → {r.hasta}</td>
                        <td><span className="badge text-bg-light text-dark border text-uppercase">{r.formato}</span></td>
                        <td className="text-secondary small">{r.fecha}</td>
                        <td><span className="badge text-bg-success"><i className="bi bi-check-circle me-1"></i>{r.estado}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </SectionCard>
        </div>
      </div>
    </div>
  )
}

export default Reportes