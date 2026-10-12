import { useState } from 'react'
import Swal from 'sweetalert2'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { advertencia, error, cargando, cerrar, toast } from '../components/alertas.jsx'


const hoy = () => new Date().toLocaleDateString('en-CA')

async function pedirReporte(tipo, desde, hasta) {

  await new Promise((resolve) => setTimeout(resolve, 1500))
  return 1
}

function Reportes() {
  const [tipo, setTipo] = useState('Alertas')
  const [desde, setDesde] = useState('')
  const [hasta, setHasta] = useState('')
  const [generando, setGenerando] = useState(false)

  const reportes = [
    {
      titulo: 'Reporte de alertas',
      descripcion: 'Consulte las alertas generadas durante un período determinado.',
      icono: 'bi-exclamation-triangle',
      color: 'var(--danger)'
    },
    {
      titulo: 'Niveles de agua',
      descripcion: 'Evolución histórica de los niveles de los ríos.',
      icono: 'bi-water',
      color: 'var(--accent)'
    },
    {
      titulo: 'Precipitaciones',
      descripcion: 'Análisis de precipitaciones por zona.',
      icono: 'bi-cloud-rain',
      color: 'var(--accent)'
    }
  ]

  
  async function ejecutar(nombre, tipoReporte, d, h) {
    setGenerando(true)
    cargando('Generando reporte...')

    try {
      const total = await pedirReporte(tipoReporte, d, h)
      cerrar()

      if (total === 0) {
        Swal.fire({
          icon: 'info',
          title: 'Sin resultados',
          text: 'No hay datos para el período seleccionado.',
          confirmButtonText: 'Aceptar'
        })
      } else {
        toast.fire({ icon: 'success', title: `${nombre} generado correctamente` })
      }
    } catch {
      error('No se pudo generar el reporte', 'Ocurrió un problema. Intentá nuevamente en unos minutos.')
    } finally {
      setGenerando(false)
    }
  }

  
  async function generarRapido(reporte) {
    const { isConfirmed } = await Swal.fire({
      icon: 'question',
      title: `¿Generar "${reporte.titulo}"?`,
      text: 'Se generará el reporte con los datos más recientes.',
      showCancelButton: true,
      confirmButtonText: 'Sí, generar',
      cancelButtonText: 'Cancelar'
    })
    if (!isConfirmed) return

    await ejecutar(reporte.titulo, reporte.titulo, '', '')
  }

  
  async function generarPersonalizado() {
    if (!desde || !hasta) {
      advertencia('Fechas incompletas', 'Seleccioná las fechas "Desde" y "Hasta".')
      return
    }
    if (desde > hasta) {
      advertencia('Rango inválido', 'La fecha "Desde" no puede ser posterior a "Hasta".')
      return
    }
    if (hasta > hoy()) {
      advertencia('Fecha inválida', 'La fecha "Hasta" no puede ser futura.')
      return
    }

   
    const dias = (new Date(hasta) - new Date(desde)) / (1000 * 60 * 60 * 24)
    if (dias > 365) {
      const { isConfirmed } = await Swal.fire({
        icon: 'warning',
        title: 'Período muy extenso',
        text: 'El rango supera un año y el reporte puede demorar. ¿Querés continuar?',
        showCancelButton: true,
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar'
      })
      if (!isConfirmed) return
    }

    await ejecutar(`Reporte de ${tipo.toLowerCase()}`, tipo, desde, hasta)
  }

  return (
    <>
      <Navbar />
      <main className="container-fluid p-4">
        <div className="mb-4">
          <h1 className="h3 fw-bold">
            <i className="bi bi-file-earmark-bar-graph me-2"></i>
            Reportes
          </h1>
          <p className="text-secondary mb-0">
            Generación y consulta de reportes del sistema.
          </p>
        </div>

        <div className="row g-4 mb-4">
          {reportes.map((reporte, index) => (
            <div className="col-md-6 col-xl-4" key={index}>
              <div className="card h-100">
                <div className="card-body text-center p-4">
                  <i className={`bi ${reporte.icono} fs-1 mb-3`}></i>
                  <h5 className="card-title">{reporte.titulo}</h5>
                  <p className="card-text text-secondary">
                    {reporte.descripcion}
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => generarRapido(reporte)}
                    disabled={generando}
                  >
                    <i className="bi bi-file-earmark-pdf me-1"></i>
                    Generar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-header">
            <strong>
              <i className="bi bi-sliders me-1"></i>
              Generar reporte personalizado
            </strong>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label" htmlFor="tipo-reporte">
                  <i className="bi bi-tag me-1"></i>
                  Tipo de reporte
                </label>
                <select
                  id="tipo-reporte"
                  className="form-select"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <option>Alertas</option>
                  <option>Mediciones</option>
                  <option>Precipitaciones</option>
                  <option>Estaciones</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label" htmlFor="fecha-desde">
                  <i className="bi bi-calendar me-1"></i>
                  Desde
                </label>
                <input
                  id="fecha-desde"
                  type="date"
                  className="form-control"
                  max={hoy()}
                  value={desde}
                  onChange={(e) => setDesde(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label" htmlFor="fecha-hasta">
                  <i className="bi bi-calendar me-1"></i>
                  Hasta
                </label>
                <input
                  id="fecha-hasta"
                  type="date"
                  className="form-control"
                  max={hoy()}
                  value={hasta}
                  onChange={(e) => setHasta(e.target.value)}
                />
              </div>
              <div className="col-md-2 d-flex align-items-end">
                <button
                  className="btn btn-success w-100"
                  onClick={generarPersonalizado}
                  disabled={generando}
                >
                  <i className="bi bi-download me-1"></i>
                  Generar
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Reportes