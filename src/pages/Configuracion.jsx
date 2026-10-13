import { useState } from 'react'
import Swal from 'sweetalert2'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { advertencia, error, cargando, cerrar, toast } from '../components/alertas.jsx'

const UMBRALES_INICIALES = { precaucion: '1.20', riesgo: '1.70', critico: '2.00' }

const CANALES_INICIALES = { web: true, email: true, whatsapp: false, mobile: true }

const NOMBRE_CANAL = {
  web: 'Notificaciones web',
  email: 'Correo electrónico',
  whatsapp: 'WhatsApp',
  mobile: 'Notificaciones móviles'
}

async function guardarEnServidor(/* datos */) {

  await new Promise((resolve) => setTimeout(resolve, 1000))
}

function Configuracion() {
  const [umbrales, setUmbrales] = useState(UMBRALES_INICIALES)
  
  const [umbralesGuardados, setUmbralesGuardados] = useState(UMBRALES_INICIALES)
  const [canales, setCanales] = useState(CANALES_INICIALES)
  const [guardando, setGuardando] = useState(false)

  const cambiarUmbral = (campo) => (e) =>
    setUmbrales((prev) => ({ ...prev, [campo]: e.target.value }))


  async function guardarUmbrales() {
    const { precaucion, riesgo, critico } = umbrales

   
    if (precaucion === '' || riesgo === '' || critico === '') {
      advertencia('Campos incompletos', 'Completá los tres niveles antes de guardar.')
      return
    }

    const p = Number(precaucion)
    const r = Number(riesgo)
    const c = Number(critico)


    if ([p, r, c].some((n) => Number.isNaN(n) || n <= 0)) {
      advertencia('Valores inválidos', 'Los niveles deben ser números mayores a cero.')
      return
    }

    
    if (!(p < r && r < c)) {
      advertencia(
        'Orden incorrecto',
        'Los niveles deben ir de menor a mayor: precaución, riesgo y crítico.'
      )
      return
    }

  
    if (
      precaucion === umbralesGuardados.precaucion &&
      riesgo === umbralesGuardados.riesgo &&
      critico === umbralesGuardados.critico
    ) {
      toast.fire({ icon: 'info', title: 'No hay cambios para guardar' })
      return
    }

    const { isConfirmed } = await Swal.fire({
      icon: 'warning',
      title: '¿Guardar los nuevos umbrales?',
      html: `
        Esto cambia cuándo el sistema emite alertas para <strong>todas las estaciones</strong>.
        <div class="text-start mt-3">
          <p class="mb-1">Precaución: <strong>${p.toFixed(2)} m</strong></p>
          <p class="mb-1">Riesgo: <strong>${r.toFixed(2)} m</strong></p>
          <p class="mb-0">Crítico: <strong>${c.toFixed(2)} m</strong></p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar',
      focusCancel: true
    })
    if (!isConfirmed) return

    setGuardando(true)
    cargando('Guardando configuración...')
    try {
      await guardarEnServidor({ precaucion: p, riesgo: r, critico: c })
      cerrar()
      setUmbralesGuardados({ ...umbrales })
      toast.fire({ icon: 'success', title: 'Umbrales actualizados' })
    } catch {
      error('No se pudo guardar', 'Ocurrió un problema. Intentá nuevamente en unos minutos.')
    } finally {
      setGuardando(false)
    }
  }


  async function cambiarCanal(clave, activo) {
    const nuevos = { ...canales, [clave]: activo }

   
    if (!Object.values(nuevos).some(Boolean)) {
      const { isConfirmed } = await Swal.fire({
        icon: 'warning',
        title: '¿Desactivar todas las notificaciones?',
        text: 'Si no queda ningún canal activo, nadie recibirá avisos cuando haya una alerta.',
        showCancelButton: true,
        confirmButtonText: 'Sí, desactivar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#dc3545',
        focusCancel: true
      })
      if (!isConfirmed) return
    }

    setCanales(nuevos)

    toast.fire({
      icon: activo ? 'success' : 'info',
      title: `${NOMBRE_CANAL[clave]} ${activo ? 'activadas' : 'desactivadas'}`
    })
  }

  return (
    <>
      <Navbar />
      <main className="container-fluid p-4">
        <div className="mb-4">
          <h1 className="h3 fw-bold">
            <i className="bi bi-gear me-2"></i>
            Configuración
          </h1>
          <p className="text-secondary mb-0">
            Configuración general del sistema SIAI.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <strong>
                  <i className="bi bi-speedometer me-1"></i>
                  Umbrales de alerta
                </strong>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label" htmlFor="umbral-precaucion">
                    <i className="bi bi-exclamation-circle me-1"></i>
                    Nivel de precaución
                  </label>
                  <div className="input-group">
                    <input
                      id="umbral-precaucion"
                      type="number"
                      className="form-control"
                      step="0.01"
                      min="0"
                      value={umbrales.precaucion}
                      onChange={cambiarUmbral('precaucion')}
                    />
                    <span className="input-group-text">metros</span>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="umbral-riesgo">
                    <i className="bi bi-exclamation-triangle me-1"></i>
                    Nivel de riesgo
                  </label>
                  <div className="input-group">
                    <input
                      id="umbral-riesgo"
                      type="number"
                      className="form-control"
                      step="0.01"
                      min="0"
                      value={umbrales.riesgo}
                      onChange={cambiarUmbral('riesgo')}
                    />
                    <span className="input-group-text">metros</span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label" htmlFor="umbral-critico">
                    <i className="bi bi-exclamation-octagon me-1"></i>
                    Nivel crítico
                  </label>
                  <div className="input-group">
                    <input
                      id="umbral-critico"
                      type="number"
                      className="form-control"
                      step="0.01"
                      min="0"
                      value={umbrales.critico}
                      onChange={cambiarUmbral('critico')}
                    />
                    <span className="input-group-text">metros</span>
                  </div>
                </div>

                <button className="btn btn-primary" onClick={guardarUmbrales} disabled={guardando}>
                  <i className="bi bi-save me-1"></i>
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <strong>
                  <i className="bi bi-bell me-1"></i>
                  Notificaciones
                </strong>
              </div>
              <div className="card-body">
                <div className="form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="notifWeb"
                    checked={canales.web}
                    onChange={(e) => cambiarCanal('web', e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="notifWeb">
                    <i className="bi bi-globe me-1"></i>
                    Notificaciones web
                  </label>
                </div>

                <div className="form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="notifEmail"
                    checked={canales.email}
                    onChange={(e) => cambiarCanal('email', e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="notifEmail">
                    <i className="bi bi-envelope me-1"></i>
                    Correo electrónico
                  </label>
                </div>

                <div className="form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="notifWhats"
                    checked={canales.whatsapp}
                    onChange={(e) => cambiarCanal('whatsapp', e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="notifWhats">
                    <i className="bi bi-whatsapp me-1"></i>
                    WhatsApp
                  </label>
                </div>

                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="notifMobile"
                    checked={canales.mobile}
                    onChange={(e) => cambiarCanal('mobile', e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="notifMobile">
                    <i className="bi bi-phone me-1"></i>
                    Notificaciones móviles
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <strong>
                  <i className="bi bi-info-circle me-1"></i>
                  Información del sistema
                </strong>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4 mb-3 mb-md-0">
                    <p className="text-secondary mb-1">
                      <i className="bi bi-hdd me-1"></i>
                      Sistema
                    </p>
                    <strong>SIAI Tucumán</strong>
                  </div>
                  <div className="col-md-4 mb-3 mb-md-0">
                    <p className="text-secondary mb-1">
                      <i className="bi bi-tag me-1"></i>
                      Versión
                    </p>
                    <strong>1.0.0</strong>
                  </div>
                  <div className="col-md-4">
                    <p className="text-secondary mb-1">
                      <i className="bi bi-activity me-1"></i>
                      Estado
                    </p>
                    <span className="badge text-bg-success">
                      <i className="bi bi-circle-fill me-1"></i>
                      Operativo
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Configuracion