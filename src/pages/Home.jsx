import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { emergencia } from '../components/alertas.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'
import './Home.css'

const ZONAS = [
  { estado: 'Normal', titulo: 'Zonas normales', cantidad: 18, icono: 'bi-check-circle-fill', color: 'success', textoBadge: 'Sin riesgo actual', detalle: 'Operación dentro de parámetros', alertaIcon: 'success', mensaje: 'Estas zonas funcionan con normalidad. No requieren acción.' },
  { estado: 'Precaución', titulo: 'Precaución', cantidad: 5, icono: 'bi-exclamation-circle-fill', color: 'warning', textoBadge: 'Monitoreo preventivo', detalle: 'Variaciones sobre valores habituales', alertaIcon: 'warning', mensaje: 'Los valores están por encima de lo habitual. Se recomienda seguimiento.' },
  { estado: 'Riesgo', titulo: 'Riesgo', cantidad: 3, icono: 'bi-exclamation-triangle-fill', color: 'danger', textoBadge: 'Requiere atención', detalle: 'Umbrales de riesgo superados', alertaIconHtml: '<i class="bi bi-exclamation-triangle-fill" style="font-size:3.5rem;color:#fd7e14"></i>', mensaje: 'Superan el umbral de riesgo. Se recomienda avisar a Defensa Civil.' },
  { estado: 'Emergencia', titulo: 'Emergencia', cantidad: 1, icono: 'bi-shield-exclamation', color: 'dark', textoBadge: 'Atención inmediata', detalle: 'Intervención prioritaria requerida', alertaIconHtml: '<i class="bi bi-exclamation-octagon-fill" style="font-size:3.5rem;color:#dc3545"></i>', mensaje: 'Nivel crítico. Se requiere acción inmediata.' }
]

const NIVEL_CRITICO = {
  nivel: 2.18, umbralAlerta: 1.8, umbralEmergencia: 2.0, maximoEscala: 2.5,
  estacion: 'E-014', rio: 'Río Marapa', localidad: 'Graneros', actualizacion: '18:47:32'
}

const ESTACIONES_DESTACADAS = [
  { nombre: 'E-014 · Río Marapa', estado: 'Emergencia', nivel: '2.18 m', color: 'danger' },
  { nombre: 'E-009 · Río Lules', estado: 'Riesgo', nivel: '1.94 m', color: 'warning' },
  { nombre: 'E-003 · Río Salí', estado: 'Precaución', nivel: '1.62 m', color: 'info' }
]

const ZONAS_RIESGO = {
  capital: [
    { nombre: 'Villa 9 de Julio', descripcion: 'Zona baja cercana a canales, con riesgo de acumulación de agua.', imagen: '/img/villa9.jfif' },
    { nombre: 'San Cayetano', descripcion: 'Barrio periférico con drenaje insuficiente.', imagen: '/img/sancaye.webp' },
    { nombre: 'Puente de la 24', descripcion: 'Zona céntrica que suele inundarse en días de lluvias intensas, afectando la circulación vehicular y peatonal.', imagen: '/img/puente-ferroviario-calle-24-septiembre-928696-154424.jpg' }
  ],
  sanMiguel: [
    { nombre: 'Yerba Buena', descripcion: 'Sectores cercanos al Canal Yerba Buena y zonas bajas de El Corte.', imagen: '/img/629983342_1278763440972584_1288355342172546299_n.jpg' },
    { nombre: 'Tafí Viejo', descripcion: 'Barrios próximos al Canal Tafí y zonas cercanas al río Lules.', imagen: '/img/Captura de pantalla 2026-09-20 045224.png' },
    { nombre: 'Banda del Río Salí', descripcion: 'Barrios ribereños como Lastenia y San Ramón.', imagen: '/img/banda.jfif' }
  ],
  externas: [
    { nombre: 'Villa Chicligasta', descripcion: 'Localidad vulnerable al desborde de ríos durante temporales intensos.', imagen: '/img/623259834_122210409074059030_7774986341165042616_n.jpg' },
    { nombre: 'Cruz Alta', descripcion: 'Zona de llanura aluvial del Salí con napas altas y riesgo de anegamiento.', imagen: '/img/621805018_122164574084823962_3467613018937982688_n.jpg' },
    { nombre: 'Leales', descripcion: 'Localidad con napas altas y riesgo de anegamiento por lluvias intensas.', imagen: '/img/650838740_871096132644078_2086915501003664637_n.jpg' }
  ]
}

const MEDIDAS_PREVENTIVAS = [
  { titulo: 'Limpiar desagües', descripcion: 'Mantener desagües y canales libres de obstrucciones para evitar acumulaciones de agua.', imagen: '/img/Limpiar desagües.jpg', border: 'success' },
  { titulo: 'No tirar basura', descripcion: 'Evitar residuos en la vía pública y cursos de agua para no bloquear el drenaje.', imagen: '/img/GNLN3MI7N5BDHPUO65TAE7ORCQ.jpg', border: 'warning' },
  { titulo: 'Kit de emergencia', descripcion: 'Preparar linterna, agua, radio, medicamentos y documentos importantes.', imagen: '/img/Kit de supervivencia.jpg', border: 'danger' },
  { titulo: 'Seguir alertas oficiales', descripcion: 'Consultar alertas emitidas por SIAI y organismos oficiales para actuar a tiempo.', imagen: '/img/cell-broadcast.jpg', border: 'primary' },
  { titulo: 'Rutas de evacuación', descripcion: 'Identificar caminos seguros hacia zonas altas y centros de evacuación.', imagen: '/img/Copilot_20260920_053406.png', border: 'info' }
]

const GRUPOS_ZONAS = [
  { id: 'capital', label: 'Capital', items: ZONAS_RIESGO.capital },
  { id: 'sanMiguel', label: 'Gran San Miguel de Tucumán', items: ZONAS_RIESGO.sanMiguel },
  { id: 'externas', label: 'Zonas fuera de San Miguel de Tucumán', items: ZONAS_RIESGO.externas },
]

const TOTAL_ZONAS = ZONAS.reduce((acc, z) => acc + z.cantidad, 0)
const ZONAS_EN_ALERTA = ZONAS.filter((z) => z.estado !== 'Normal').reduce((acc, z) => acc + z.cantidad, 0)
const PORCENTAJE_NIVEL = Math.min(100, Math.round((NIVEL_CRITICO.nivel / NIVEL_CRITICO.maximoEscala) * 100))

function Home() {
  const [openAccordion, setOpenAccordion] = useState('capital')

  useEffect(() => {
    try {
      if (sessionStorage.getItem('siai-aviso-home')) return
      sessionStorage.setItem('siai-aviso-home', '1')
    } catch (error) {
      console.warn('No se pudo acceder al aviso de inicio en sessionStorage.', error)
    }
    const emerg = ZONAS.find((z) => z.estado === 'Emergencia')?.cantidad || 0
    const riesgo = ZONAS.find((z) => z.estado === 'Riesgo')?.cantidad || 0
    if (emerg > 0 || riesgo > 0) {
      const partes = []
      if (emerg > 0) partes.push(`${emerg} en Emergencia`)
      if (riesgo > 0) partes.push(`${riesgo} en Riesgo`)
      emergencia('Atención: zonas en alerta', `Hay zonas críticas en Tucumán: ${partes.join(' y ')}. Nivel más alto: ${NIVEL_CRITICO.nivel.toFixed(2)} m en ${NIVEL_CRITICO.rio} (${NIVEL_CRITICO.estacion}).`)
    }
  }, [])

  const toggleAccordion = (id) => setOpenAccordion((prev) => (prev === id ? '' : id))

  function verZona(zona) {
    Swal.fire({
      ...(zona.alertaIconHtml ? { iconHtml: zona.alertaIconHtml, customClass: { icon: 'swal-sin-borde' } } : zona.alertaIcon ? { icon: zona.alertaIcon } : {}),
      ...(zona.imagen ? { imageUrl: zona.imagen, imageAlt: zona.nombre, imageWidth: 400 } : {}),
      title: zona.titulo ? `${zona.titulo}: ${zona.cantidad} ${zona.cantidad === 1 ? 'zona' : 'zonas'}` : zona.nombre,
      text: zona.mensaje || zona.descripcion,
      footer: zona.imagen ? 'Ante una emergencia, seguí las alertas oficiales del SIAI.' : undefined,
      confirmButtonText: 'Cerrar'
    })
  }

  function verNivelCritico() {
    Swal.fire({
      iconHtml: '<i class="bi bi-exclamation-octagon-fill" style="font-size:3.5rem;color:#dc3545"></i>',
      customClass: { icon: 'swal-sin-borde' },
      title: 'Nivel de agua más crítico',
      html: `<div class="text-start"><p class="mb-1"><strong>Nivel:</strong> ${NIVEL_CRITICO.nivel.toFixed(2)} m</p><p class="mb-1"><strong>Estación:</strong> ${NIVEL_CRITICO.estacion}</p><p class="mb-1"><strong>Ubicación:</strong> ${NIVEL_CRITICO.rio} · ${NIVEL_CRITICO.localidad}</p><p class="mb-3"><strong>Última lectura:</strong> ${NIVEL_CRITICO.actualizacion}</p><p class="text-secondary mb-0">Nivel crítico. Se requiere acción inmediata y aviso a Defensa Civil.</p></div>`,
      confirmButtonText: 'Cerrar'
    })
  }

  const tarjetaZona = (zona, index) => (
    <div className="col-md-4" key={index}>
      <div className="card shadow-sm h-100" role="button" tabIndex={0} style={{ cursor: 'pointer' }} onClick={() => verZona(zona)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); verZona(zona) } }}>
        <img src={zona.imagen} className="card-img-top rounded-top" alt={zona.nombre} loading="lazy" decoding="async" />
        <div className="card-body">
          <h5 className="card-title">{zona.nombre}</h5>
          <p className="card-text text-secondary small mb-0">{zona.descripcion}</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="admi-page">
      <section className="admi-hero mb-4">
        <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
          <div>
            <div className="eyebrow">SIAI Tucumán · Monitoreo hídrico</div>
            <h1><i className="bi bi-water me-2"></i>Dashboard principal</h1>
            <p>Estado operativo de estaciones, niveles hidrométricos y zonas de riesgo en tiempo casi real.</p>
          </div>
          <div className="d-flex flex-column align-items-lg-end gap-2">
            <div className="admi-status-pill"><span className="admi-status-dot" aria-hidden="true"></span>Sistema operativo</div>
            <div className="small text-white-50"><i className="bi bi-clock me-1"></i>Última actualización: <strong className="text-white">{NIVEL_CRITICO.actualizacion}</strong></div>
          </div>
        </div>
      </section>

      <section className="row g-3 mb-4" aria-label="Resumen general">
        <div className="col-6 col-xl-3"><div className="admi-panel h-100"><div className="panel-body"><div className="admi-section-title mb-1">Estaciones monitoreadas</div><div className="fs-3 fw-bold">{TOTAL_ZONAS}</div><div className="text-secondary small">Cobertura provincial activa</div></div></div></div>
        <div className="col-6 col-xl-3"><div className="admi-panel h-100"><div className="panel-body"><div className="admi-section-title mb-1">Zonas en alerta</div><div className="fs-3 fw-bold text-danger">{ZONAS_EN_ALERTA}</div><div className="text-secondary small">Precaución, riesgo y emergencia</div></div></div></div>
        <div className="col-6 col-xl-3"><div className="admi-panel h-100"><div className="panel-body"><div className="admi-section-title mb-1">Nivel crítico actual</div><div className="fs-3 fw-bold text-danger">{NIVEL_CRITICO.nivel.toFixed(2)} m</div><div className="text-secondary small">{NIVEL_CRITICO.rio} ({NIVEL_CRITICO.estacion})</div></div></div></div>
        <div className="col-6 col-xl-3"><div className="admi-panel h-100"><div className="panel-body"><div className="admi-section-title mb-1">Estado de red</div><div className="fs-3 fw-bold text-success">En línea</div><div className="text-secondary small">Telemetría y reportes disponibles</div></div></div></div>
      </section>

      <section className="mb-4" aria-label="Estado por zonas">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h2 className="h5 fw-bold mb-0">Estado por condición hidrológica</h2>
          <span className="text-secondary small">Hacé clic para ver el detalle</span>
        </div>
        <div className="row g-3">
          {ZONAS.map((zona) => (
            <div className="col-md-6 col-xl-3" key={zona.estado}>
              <div className="admi-kpi" role="button" tabIndex={0} style={{ cursor: 'pointer' }} onClick={() => verZona(zona)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); verZona(zona) } }}>
                <div className="p-3 p-lg-4">
                  <div className="kpi-head">
                    <div><div className="kpi-label">{zona.titulo}</div><p className="kpi-value">{zona.cantidad}</p></div>
                    <div className={`kpi-icon bg-${zona.color}-subtle text-${zona.color}`}><i className={`bi ${zona.icono}`}></i></div>
                  </div>
                  <span className={`badge text-bg-${zona.color}`}>{zona.textoBadge}</span>
                  <div className="kpi-meta">{zona.detalle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="row g-3 mb-4">
        <div className="col-lg-7">
          <div className="admi-panel h-100" role="button" tabIndex={0} style={{ cursor: 'pointer' }} onClick={verNivelCritico} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); verNivelCritico() } }}>
            <div className="panel-header"><h2 className="panel-title"><i className="bi bi-droplet-fill text-primary me-2"></i>Estación crítica</h2><span className="badge text-bg-danger">Emergencia</span></div>
            <div className="panel-body">
              <div className="row align-items-end g-3">
                <div className="col-sm-5">
                  <div className="text-secondary small text-uppercase fw-semibold">Nivel medido</div>
                  <div className="critical-metric">{NIVEL_CRITICO.nivel.toFixed(2)} m</div>
                  <div className="text-secondary"><i className="bi bi-geo-alt me-1"></i>{NIVEL_CRITICO.estacion} · {NIVEL_CRITICO.rio}</div>
                  <div className="text-secondary small">{NIVEL_CRITICO.localidad}, Tucumán</div>
                </div>
                <div className="col-sm-7">
                  <div className="d-flex justify-content-between small mb-1"><span className="text-secondary">Escala de referencia</span><span className="fw-semibold text-danger">{PORCENTAJE_NIVEL}% de {NIVEL_CRITICO.maximoEscala.toFixed(1)} m</span></div>
                  <div className="level-track" aria-hidden="true"><div className="level-fill" style={{ width: `${PORCENTAJE_NIVEL}%` }}></div></div>
                  <div className="level-scale"><span>0.0 m</span><span>Alerta {NIVEL_CRITICO.umbralAlerta.toFixed(1)} m</span><span>Emerg. {NIVEL_CRITICO.umbralEmergencia.toFixed(1)} m</span></div>
                  <div className="alert alert-danger d-flex align-items-start gap-2 py-2 px-3 mt-3 mb-0" role="status"><i className="bi bi-exclamation-octagon-fill mt-1"></i><div className="small">Se superó el umbral de emergencia. Requiere notificación a Defensa Civil y seguimiento continuo.</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="admi-panel h-100">
            <div className="panel-header"><h2 className="panel-title"><i className="bi bi-broadcast text-primary me-2"></i>Estaciones destacadas</h2><span className="text-secondary small">Seguimiento prioritario</span></div>
            <div className="panel-body">
              <ul className="admi-list">
                {ESTACIONES_DESTACADAS.map((est) => (
                  <li key={est.nombre}><div><p className="item-title">{est.nombre}</p><p className="item-sub">Último nivel registrado: <strong>{est.nivel}</strong></p></div><span className={`badge text-bg-${est.color}`}>{est.estado}</span></li>
                ))}
              </ul>
              <div className="mt-3 pt-3 border-top"><div className="small text-secondary mb-2"><i className="bi bi-info-circle me-1"></i>Recomendación operativa</div><p className="mb-0 small">Priorizar la verificación de sensores en estaciones con tendencia ascendente y mantener comunicación con defensa civil ante cambios de estado.</p></div>
            </div>
          </div>
        </div>
      </section>

      <SectionCard title="Zonas en riesgo" icon="bi-exclamation-triangle-fill" subtitle="Localidades y puntos con vulnerabilidad hídrica en la provincia.">
        <div className="accordion" id="localidadesAccordion">
          {GRUPOS_ZONAS.map((g) => (
            <div className="accordion-item" key={g.id}>
              <h2 className="accordion-header">
                <button className={`accordion-button ${openAccordion === g.id ? '' : 'collapsed'}`} type="button" onClick={() => toggleAccordion(g.id)}>{g.label}</button>
              </h2>
              <div className={`accordion-collapse collapse ${openAccordion === g.id ? 'show' : ''}`}>
                <div className="accordion-body"><div className="row g-3">{g.items.map(tarjetaZona)}</div></div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="mt-4">
        <SectionCard title="Medidas preventivas" icon="bi-shield-check" subtitle="Recomendaciones para reducir riesgos ante crecidas e inundaciones.">
          <div className="row g-3">
            {MEDIDAS_PREVENTIVAS.map((m, i) => (
              <div className="col-md-6 col-lg-4" key={i}>
                <div className={`card h-100 border-${m.border}`}>
                  <img src={m.imagen} className="card-img-top" alt={m.titulo} loading="lazy" decoding="async" />
                  <div className="card-body"><h5 className="card-title">{m.titulo}</h5><p className="card-text text-secondary small mb-0">{m.descripcion}</p></div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}

export default Home
