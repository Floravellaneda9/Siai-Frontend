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
    textoBadge: 'Sin riesgo actual',
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
    textoBadge: 'Monitoreo preventivo',
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
    textoBadge: 'Requiere atención',
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
    textoBadge: 'Atención inmediata',
    alertaIconHtml:
      '<i class="bi bi-exclamation-octagon-fill" style="font-size:3.5rem;color:#dc3545"></i>',
    mensaje: 'Nivel crítico. Se requiere acción inmediata.'
  }
]

function Admi() {
  
  useEffect(() => {
    try {
      if (sessionStorage.getItem('siai-aviso-admi')) return
      sessionStorage.setItem('siai-aviso-admi', '1')
    } catch {
     
    }

    const emerg = ZONAS.find((z) => z.estado === 'Emergencia')?.cantidad || 0
    const riesgo = ZONAS.find((z) => z.estado === 'Riesgo')?.cantidad || 0

    if (emerg > 0 || riesgo > 0) {
      const partes = []
      if (emerg > 0) partes.push(`${emerg} en Emergencia`)
      if (riesgo > 0) partes.push(`${riesgo} en Riesgo`)
      emergencia(
        'Atención: zonas en alerta',
        `Hay zonas críticas en Tucumán: ${partes.join(' y ')}. Nivel más alto: 2.18 m en Río Marapa (E-014).`
      )
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

 
  function verNivelCritico() {
    Swal.fire({
      iconHtml:
        '<i class="bi bi-exclamation-octagon-fill" style="font-size:3.5rem;color:#dc3545"></i>',
      customClass: { icon: 'swal-sin-borde' },
      title: 'Nivel de agua más crítico',
      html: `
        <div class="text-start">
          <p class="mb-1"><strong>Nivel:</strong> 2.18 m</p>
          <p class="mb-1"><strong>Estación:</strong> E-014</p>
          <p class="mb-3"><strong>Ubicación:</strong> Río Marapa · Graneros</p>
          <p class="text-secondary mb-0">Nivel crítico. Se requiere acción inmediata y aviso a Defensa Civil.</p>
        </div>
      `,
      confirmButtonText: 'Cerrar'
    })
  }

  return (
    <>
      <Navbar />
      <main className="container-fluid p-4">
        <div className="mb-4">
          <h1 className="h3 fw-bold">
            <i className="bi bi-shield-check me-2"></i>
            Panel de administración
          </h1>
          <p className="text-secondary mb-0">
            Estado general del sistema de monitoreo de Tucumán.
          </p>
        </div>

        <div className="alert alert-success d-flex align-items-center mb-4" role="alert">
          <i className="bi bi-check-circle-fill me-2 fs-5"></i>
          <div>
            <strong>Sistema operativo.</strong> Última actualización: <strong>18:47:32</strong>
          </div>
        </div>

        <div className="row g-4 mb-4">
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
                  <span className={`badge text-bg-${zona.badge}`}>{zona.textoBadge}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="card"
          role="button"
          tabIndex={0}
          style={{ cursor: 'pointer' }}
          onClick={verNivelCritico}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              verNivelCritico()
            }
          }}
        >
          <div className="card-body">
            <h5 className="card-title">
              <i className="bi bi-droplet-fill me-2"></i>
              Nivel de agua más crítico
            </h5>
            <h2 className="display-3 fw-bold">2.18 m</h2>
            <p className="text-secondary mb-2">
              <i className="bi bi-geo-alt me-1"></i>
              Estación E-014 · Río Marapa · Graneros
            </p>
            <div
              className="progress"
              role="progressbar"
              aria-label="Nivel de agua"
              aria-valuenow="87"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div className="progress-bar bg-danger">2.18 m</div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Admi