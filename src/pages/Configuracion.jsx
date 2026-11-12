import { useState } from 'react'
import Swal from 'sweetalert2'
import { advertencia, error, cargando, cerrar, toast } from '../components/alertas.jsx'
import PageHeader from '../components/layout/PageHeader.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'

const UMBRALES_INICIALES = { precaucion: '1.20', riesgo: '1.70', critico: '2.00' }
const CANALES_INICIALES = { web: true, email: true, whatsapp: false, mobile: true }
const NOMBRE_CANAL = { web: 'Notificaciones web', email: 'Correo electrónico', whatsapp: 'WhatsApp', mobile: 'Notificaciones móviles' }

async function guardarEnServidor() { await new Promise((resolve) => setTimeout(resolve, 1000)) }

function Configuracion() {
  const [umbrales, setUmbrales] = useState(UMBRALES_INICIALES)
  const [umbralesGuardados, setUmbralesGuardados] = useState(UMBRALES_INICIALES)
  const [canales, setCanales] = useState(CANALES_INICIALES)
  const [guardando, setGuardando] = useState(false)

  const cambiarUmbral = (campo) => (e) => setUmbrales((prev) => ({ ...prev, [campo]: e.target.value }))

  async function guardarUmbrales() {
    const { precaucion, riesgo, critico } = umbrales
    if (precaucion === '' || riesgo === '' || critico === '') { advertencia('Campos incompletos', 'Completá los tres niveles antes de guardar.'); return }
    const p = Number(precaucion), r = Number(riesgo), c = Number(critico)
    if ([p, r, c].some((n) => Number.isNaN(n) || n <= 0)) { advertencia('Valores inválidos', 'Los niveles deben ser números mayores a cero.'); return }
    if (!(p < r && r < c)) { advertencia('Orden incorrecto', 'Los niveles deben ir de menor a mayor: precaución, riesgo y crítico.'); return }
    if (precaucion === umbralesGuardados.precaucion && riesgo === umbralesGuardados.riesgo && critico === umbralesGuardados.critico) { toast.fire({ icon: 'info', title: 'No hay cambios para guardar' }); return }
    const { isConfirmed } = await Swal.fire({ icon: 'warning', title: '¿Guardar los nuevos umbrales?', html: `Esto cambia cuándo el sistema emite alertas para <strong>todas las estaciones</strong>.<div class="text-start mt-3"><p class="mb-1">Precaución: <strong>${p.toFixed(2)} m</strong></p><p class="mb-1">Riesgo: <strong>${r.toFixed(2)} m</strong></p><p class="mb-0">Crítico: <strong>${c.toFixed(2)} m</strong></p></div>`, showCancelButton: true, confirmButtonText: 'Sí, guardar', cancelButtonText: 'Cancelar', focusCancel: true })
    if (!isConfirmed) return
    setGuardando(true)
    cargando('Guardando configuración...')
    try { await guardarEnServidor({ precaucion: p, riesgo: r, critico: c }); cerrar(); setUmbralesGuardados({ ...umbrales }); toast.fire({ icon: 'success', title: 'Umbrales actualizados' }) }
    catch { error('No se pudo guardar', 'Ocurrió un problema. Intentá nuevamente en unos minutos.') }
    finally { setGuardando(false) }
  }

  async function cambiarCanal(clave, activo) {
    const nuevos = { ...canales, [clave]: activo }
    if (!Object.values(nuevos).some(Boolean)) {
      const { isConfirmed } = await Swal.fire({ icon: 'warning', title: '¿Desactivar todas las notificaciones?', text: 'Si no queda ningún canal activo, nadie recibirá avisos cuando haya una alerta.', showCancelButton: true, confirmButtonText: 'Sí, desactivar', cancelButtonText: 'Cancelar', confirmButtonColor: '#dc3545', focusCancel: true })
      if (!isConfirmed) return
    }
    setCanales(nuevos)
    toast.fire({ icon: activo ? 'success' : 'info', title: `${NOMBRE_CANAL[clave]} ${activo ? 'activadas' : 'desactivadas'}` })
  }

  const canalesActivos = Object.values(canales).filter(Boolean).length

  return (
    <div>
      <PageHeader icon="bi-gear" title="Configuración" subtitle="Parámetros operativos, umbrales de alerta y preferencias de notificación." />
      <div className="row g-4">
        <div className="col-lg-6">
          <SectionCard title="Umbrales hidrométricos" icon="bi-speedometer" subtitle="Definí los niveles que disparan cada estado de alerta.">
            <div className="mb-3 p-3 rounded-3 border-start border-4 border-warning bg-warning-subtle">
              <label className="form-label fw-semibold mb-1" htmlFor="umbral-precaucion"><i className="bi bi-exclamation-circle me-1"></i>Nivel de precaución</label>
              <div className="input-group"><input id="umbral-precaucion" type="number" className="form-control" step="0.01" min="0" value={umbrales.precaucion} onChange={cambiarUmbral('precaucion')} /><span className="input-group-text">m</span></div>
            </div>
            <div className="mb-3 p-3 rounded-3 border-start border-4 border-danger bg-danger-subtle">
              <label className="form-label fw-semibold mb-1" htmlFor="umbral-riesgo"><i className="bi bi-exclamation-triangle me-1"></i>Nivel de riesgo</label>
              <div className="input-group"><input id="umbral-riesgo" type="number" className="form-control" step="0.01" min="0" value={umbrales.riesgo} onChange={cambiarUmbral('riesgo')} /><span className="input-group-text">m</span></div>
            </div>
            <div className="mb-4 p-3 rounded-3 border-start border-4 border-dark bg-light">
              <label className="form-label fw-semibold mb-1" htmlFor="umbral-critico"><i className="bi bi-exclamation-octagon me-1"></i>Nivel crítico</label>
              <div className="input-group"><input id="umbral-critico" type="number" className="form-control" step="0.01" min="0" value={umbrales.critico} onChange={cambiarUmbral('critico')} /><span className="input-group-text">m</span></div>
            </div>
            <button className="btn btn-primary" onClick={guardarUmbrales} disabled={guardando}><i className="bi bi-save me-1"></i>Guardar cambios</button>
          </SectionCard>
        </div>
        <div className="col-lg-6">
          <SectionCard title="Canales de notificación" icon="bi-bell" subtitle={`Canales activos: ${canalesActivos} de 4`}>
            {[{k:'web',icon:'bi-globe',label:'Notificaciones web',desc:'Avisos dentro de la plataforma.'},{k:'email',icon:'bi-envelope',label:'Correo electrónico',desc:'Envío de alertas por email.'},{k:'whatsapp',icon:'bi-whatsapp',label:'WhatsApp',desc:'Mensajes a contactos configurados.'},{k:'mobile',icon:'bi-phone',label:'Notificaciones móviles',desc:'Push en dispositivos registrados.'}].map(c => (
              <div className="d-flex align-items-center justify-content-between py-3 border-bottom" key={c.k}>
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-3 bg-light d-inline-flex align-items-center justify-content-center" style={{width:40,height:40}}><i className={`bi ${c.icon} fs-5`}></i></div>
                  <div><div className="fw-medium">{c.label}</div><div className="text-secondary small">{c.desc}</div></div>
                </div>
                <div className="form-check form-switch m-0"><input className="form-check-input" type="checkbox" role="switch" id={`notif-${c.k}`} checked={canales[c.k]} onChange={(e) => cambiarCanal(c.k, e.target.checked)} /></div>
              </div>
            ))}
          </SectionCard>
        </div>
        <div className="col-12">
          <SectionCard title="Información del sistema" icon="bi-info-circle">
            <div className="row g-3">
              <div className="col-md-3"><div className="text-secondary small mb-1"><i className="bi bi-hdd me-1"></i>Sistema</div><div className="fw-semibold">SIAI Tucumán</div></div>
              <div className="col-md-3"><div className="text-secondary small mb-1"><i className="bi bi-tag me-1"></i>Versión</div><div className="fw-semibold">1.0.0</div></div>
              <div className="col-md-3"><div className="text-secondary small mb-1"><i className="bi bi-diagram-3 me-1"></i>Entorno</div><div className="fw-semibold">Producción</div></div>
              <div className="col-md-3"><div className="text-secondary small mb-1"><i className="bi bi-activity me-1"></i>Estado</div><span className="badge text-bg-success"><i className="bi bi-circle-fill me-1"></i>Operativo</span></div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  )
}

export default Configuracion