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

function Mapa() {
 
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
          <div className="card-body">
            <div className="bg-secondary-subtle rounded d-flex align-items-center justify-content-center">
              <div className="text-center">
                <i className="bi bi-geo-alt fs-1"></i>
                <h4 className="mt-3">Mapa interactivo</h4>
                <p className="text-secondary mb-0">
                  Aquí se integrará Leaflet para mostrar el mapa de Tucumán.
                </p>
              </div>
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