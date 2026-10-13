import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { emergencia } from '../components/alertas.jsx'

const ALERTAS = [
  {
    id: 1,
    nivel: 'ROJA',
    badge: 'danger',
    icono: 'bi-exclamation-octagon',
    borde: 'border-danger',
    btn: 'btn-outline-danger',
    titulo: 'Nivel de agua crítico',
    descripcion: 'La estación E-014 registró un nivel de agua de',
    dato: '2.18 metros',
    ubicacion: 'Río Marapa · Graneros',
    estacion: 'E-014',
    recomendacion: 'Nivel crítico. Se requiere acción inmediata y aviso a Defensa Civil.',
    iconoHtml:
      '<i class="bi bi-exclamation-octagon-fill" style="font-size:3.5rem;color:#dc3545"></i>'
  },
  {
    id: 2,
    nivel: 'NARANJA',
    badge: 'warning',
    icono: 'bi-exclamation-triangle',
    borde: 'border-warning',
    btn: 'btn-outline-warning',
    titulo: 'Precipitaciones intensas',
    descripcion: 'Se registraron',
    dato: '72.1 mm',
    ubicacion: 'Río Lules',
    estacion: 'E-008',
    recomendacion: 'Los valores superan el umbral de riesgo. Se recomienda seguimiento constante.',
    iconoHtml:
      '<i class="bi bi-exclamation-triangle-fill" style="font-size:3.5rem;color:#fd7e14"></i>'
  }
]


const escapar = (txt) =>
  String(txt).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]))

function Alertas() {
 
  useEffect(() => {
    const rojas = ALERTAS.filter((a) => a.nivel === 'ROJA')
    if (rojas.length > 0) {
      emergencia(
        'Alertas rojas activas',
        `Hay ${rojas.length} alerta(s) roja(s) vigente(s): ${rojas.map((a) => a.titulo).join(', ')}.`
      )
    }
  }, [])

  
  function verDetalles(alerta) {
    Swal.fire({
      iconHtml: alerta.iconoHtml,
      customClass: { icon: 'swal-sin-borde' },
      titleText: `ALERTA ${alerta.nivel} · ${alerta.titulo}`,
      html: `
        <div class="text-start">
          <p class="mb-1"><strong>Estación:</strong> ${escapar(alerta.estacion)}</p>
          <p class="mb-1"><strong>Ubicación:</strong> ${escapar(alerta.ubicacion)}</p>
          <p class="mb-3"><strong>Detalle:</strong> ${escapar(alerta.descripcion)} ${escapar(alerta.dato)}.</p>
          <p class="text-secondary mb-0">${escapar(alerta.recomendacion)}</p>
        </div>
      `,
      confirmButtonText: 'Cerrar'
    })
  }

  return (
    <>
      <Navbar />
      <main className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div>
            <h1 className="h3 fw-bold">
              <i className="bi bi-exclamation-triangle me-2"></i>
              Alertas
            </h1>
            <p className="text-secondary mb-0">
              Alertas generadas por el sistema de monitoreo.
            </p>
          </div>
          <Link className="btn btn-primary" to="/agregar-alerta">
            <i className="bi bi-plus-lg me-1"></i>
            Nueva alerta
          </Link>
        </div>

        <div className="row g-4">
          {ALERTAS.map((alerta) => (
            <div className="col-lg-6" key={alerta.id}>
              <div className={`card ${alerta.borde} h-100`}>
                <div className="card-body">
                  <span className={`badge text-bg-${alerta.badge} mb-2`}>
                    <i className={`bi ${alerta.icono} me-1`}></i>
                    ALERTA {alerta.nivel}
                  </span>
                  <h5 className="card-title">{alerta.titulo}</h5>
                  <p className="card-text text-secondary">
                    {alerta.descripcion} <strong>{alerta.dato}</strong>.
                  </p>
                  <p className="text-secondary mb-3">
                    <i className="bi bi-geo-alt me-1"></i>
                    {alerta.ubicacion}
                  </p>
                  <button className={`btn ${alerta.btn}`} onClick={() => verDetalles(alerta)}>
                    <i className="bi bi-eye me-1"></i>
                    Ver detalles
                  </button>
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

export default Alertas