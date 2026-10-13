import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { emergencia, toast } from '../components/alertas.jsx'

const ESTACIONES_INICIALES = [
  {
    id: 'E-001',
    nombre: 'Río Salí',
    tipo: 'Estación hidrológica',
    nivel: '0.82 m',
    precipitacion: '12.4 mm',
    actualizacion: 'hace 2 minutos',
    estado: 'Activa',
    badgeColor: 'success',
    iconColor: 'var(--accent)',
    btnClass: 'btn-outline-primary'
  },
  {
    id: 'E-004',
    nombre: 'Arroyo Nueva Esperanza',
    tipo: 'Estación hidrológica',
    nivel: '1.42 m',
    precipitacion: '48.7 mm',
    actualizacion: 'hace 1 minuto',
    estado: 'Precaución',
    badgeColor: 'warning',
    iconColor: 'var(--accent)',
    btnClass: 'btn-outline-primary'
  },
  {
    id: 'E-008',
    nombre: 'Río Lules',
    tipo: 'Estación hidrológica',
    nivel: '1.78 m',
    precipitacion: '72.1 mm',
    actualizacion: 'hace 30 segundos',
    estado: 'Riesgo',
    badgeColor: 'danger',
    iconColor: 'var(--danger)',
    btnClass: 'btn-outline-danger'
  },
  {
    id: 'E-014',
    nombre: 'Río Marapa',
    tipo: 'Estación hidrológica',
    nivel: '2.18 m',
    precipitacion: '112.8 mm',
    actualizacion: 'hace 15 segundos',
    estado: 'Emergencia',
    badgeColor: 'dark',
    iconColor: 'var(--danger)',
    btnClass: 'btn-outline-danger'
  }
]


const ICONO_POR_ESTADO = {
  Activa: 'success',
  'Precaución': 'warning'
}


const ICONO_HTML_POR_ESTADO = {
  Riesgo:
    '<i class="bi bi-exclamation-triangle-fill" style="font-size:3.5rem;color:#fd7e14"></i>',
  Emergencia:
    '<i class="bi bi-exclamation-octagon-fill" style="font-size:3.5rem;color:#dc3545"></i>'
}

const MENSAJE_POR_ESTADO = {
  Activa: 'La estación funciona con normalidad.',
  'Precaución': 'Los valores están por encima de lo habitual. Se recomienda seguimiento.',
  Riesgo: 'Los valores superan el umbral de riesgo. Atención de Defensa Civil recomendada.',
  Emergencia: 'Nivel crítico. Se requiere acción inmediata.'
}


const escapar = (txt) =>
  String(txt).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]))

function Estaciones() {
  const [estaciones, setEstaciones] = useState(ESTACIONES_INICIALES)

  
  useEffect(() => {
    const criticas = ESTACIONES_INICIALES.filter(
      (e) => e.estado === 'Riesgo' || e.estado === 'Emergencia'
    )
    if (criticas.length > 0) {
      const nombres = criticas.map((e) => `${e.nombre} (${e.estado})`).join(', ')
      emergencia(
        'Estaciones en alerta',
        `Hay ${criticas.length} estación(es) con nivel crítico: ${nombres}.`
      )
    }
  }, [])

  
  function verDetalles(estacion) {
    const iconoHtml = ICONO_HTML_POR_ESTADO[estacion.estado]

    Swal.fire({
      ...(iconoHtml
        ? { iconHtml: iconoHtml, customClass: { icon: 'swal-sin-borde' } }
        : { icon: ICONO_POR_ESTADO[estacion.estado] || 'info' }),
      titleText: `${estacion.id} · ${estacion.nombre}`,
      html: `
        <div class="text-start">
          <p class="mb-1"><strong>Tipo:</strong> ${escapar(estacion.tipo)}</p>
          <p class="mb-1"><strong>Estado:</strong> ${escapar(estacion.estado)}</p>
          <p class="mb-1"><strong>Nivel:</strong> ${escapar(estacion.nivel)}</p>
          <p class="mb-1"><strong>Precipitación:</strong> ${escapar(estacion.precipitacion)}</p>
          <p class="mb-3"><strong>Actualización:</strong> ${escapar(estacion.actualizacion)}</p>
          <p class="text-secondary mb-0">${escapar(MENSAJE_POR_ESTADO[estacion.estado] || '')}</p>
        </div>
      `,
      confirmButtonText: 'Cerrar'
    })
  }

  
  async function nuevaEstacion() {
    const { value: datos } = await Swal.fire({
      title: 'Nueva estación',
      html: `
        <input id="swal-id" class="swal2-input" placeholder="Código (ej. E-020)">
        <input id="swal-nombre" class="swal2-input" placeholder="Nombre de la estación">
        <select id="swal-tipo" class="swal2-select">
          <option value="Estación hidrológica">Estación hidrológica</option>
          <option value="Estación meteorológica">Estación meteorológica</option>
          <option value="Estación pluviométrica">Estación pluviométrica</option>
        </select>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const popup = Swal.getPopup()
        const id = popup.querySelector('#swal-id').value.trim().toUpperCase()
        const nombre = popup.querySelector('#swal-nombre').value.trim()
        const tipo = popup.querySelector('#swal-tipo').value

        if (!id || !nombre) {
          Swal.showValidationMessage('Completá el código y el nombre.')
          return false
        }
        if (estaciones.some((e) => e.id === id)) {
          Swal.showValidationMessage(`Ya existe una estación con el código ${id}.`)
          return false
        }
        return { id, nombre, tipo }
      }
    })

   
    if (!datos) return

    setEstaciones((prev) => [
      ...prev,
      {
        ...datos,
        nivel: 'Sin datos',
        precipitacion: 'Sin datos',
        actualizacion: 'sin lecturas',
        estado: 'Activa',
        badgeColor: 'success',
        iconColor: 'var(--accent)',
        btnClass: 'btn-outline-primary'
      }
    ])

    toast.fire({ icon: 'success', title: 'Estación creada correctamente' })
  }

  return (
    <>
      <Navbar />
      <main className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div>
            <h1 className="h3 fw-bold">
              <i className="bi bi-broadcast me-2"></i>
              Estaciones
            </h1>
            <p className="text-secondary mb-0">
              Estaciones de monitoreo hidrológico de la provincia.
            </p>
          </div>
          <button className="btn btn-primary" onClick={nuevaEstacion}>
            <i className="bi bi-plus-lg me-1"></i>
            Nueva estación
          </button>
        </div>

        <div className="row g-4">
          {estaciones.map((estacion) => (
            <div className="col-md-6 col-xl-4" key={estacion.id}>
              <div className="card h-100">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <strong>{estacion.id}</strong>
                  <span className={`badge text-bg-${estacion.badgeColor}`}>{estacion.estado}</span>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{estacion.nombre}</h5>
                  <p className="text-secondary">{estacion.tipo}</p>
                  <hr />
                  <p className="mb-1">
                    <i className="bi bi-water me-2"></i>
                    Nivel: <strong>{estacion.nivel}</strong>
                  </p>
                  <p className="mb-1">
                    <i className="bi bi-cloud-rain me-2"></i>
                    Precipitación: <strong>{estacion.precipitacion}</strong>
                  </p>
                  <p className="mb-3">
                    <i className="bi bi-clock me-2"></i>
                    Actualización: {estacion.actualizacion}
                  </p>
                  <button
                    className={`btn ${estacion.btnClass} w-100`}
                    onClick={() => verDetalles(estacion)}
                  >
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

export default Estaciones