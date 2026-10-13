import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { advertencia, error, cargando, cerrar, toast } from '../components/alertas.jsx'

const FORM_VACIO = { tipo: '', titulo: '', descripcion: '', estacion: '', ubicacion: '' }

const CODIGO_ESTACION = /^E-\d{3}$/

const NOMBRE_TIPO = {
  ROJA: 'ALERTA ROJA',
  NARANJA: 'ALERTA NARANJA',
  AMARILLA: 'ALERTA AMARILLA'
}


const ICONO_HTML_POR_TIPO = {
  ROJA: '<i class="bi bi-exclamation-octagon-fill" style="font-size:3.5rem;color:#dc3545"></i>',
  NARANJA: '<i class="bi bi-exclamation-triangle-fill" style="font-size:3.5rem;color:#fd7e14"></i>'
}

function escapar(txt) {
  return String(txt).replace(/[&<>"']/g, (c) => {
    const mapa = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }
    return mapa[c]
  })
}


async function enviarAlerta(/* datos */) {
  // const res = await fetch('/api/alertas', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(datos)
  // })
  // if (!res.ok) throw new Error('Error al emitir')
  await new Promise((resolve) => setTimeout(resolve, 1200))
}

function AgregarAlerta() {
  const [form, setForm] = useState(FORM_VACIO)
  const [enviando, setEnviando] = useState(false)
  const navigate = useNavigate()

  const hayCambios = Object.values(form).some((v) => v.trim() !== '')

  const cambiar = (campo) => (e) => setForm((prev) => ({ ...prev, [campo]: e.target.value }))

  
  useEffect(() => {
    if (!hayCambios || enviando) return
    const avisar = (e) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', avisar)
    return () => window.removeEventListener('beforeunload', avisar)
  }, [hayCambios, enviando])

 
  async function cancelar(e) {
    if (!hayCambios) return 
    e.preventDefault()

    const { isConfirmed } = await Swal.fire({
      icon: 'warning',
      title: '¿Descartar la alerta?',
      text: 'Los datos que escribiste se van a perder.',
      showCancelButton: true,
      confirmButtonText: 'Sí, descartar',
      cancelButtonText: 'Seguir editando',
      confirmButtonColor: '#dc3545',
      focusCancel: true
    })
    if (isConfirmed) navigate('/alertas')
  }

  
  async function handleSubmit(e) {
    e.preventDefault()

    const datos = {
      tipo: form.tipo,
      titulo: form.titulo.trim(),
      descripcion: form.descripcion.trim(),
      estacion: form.estacion.trim().toUpperCase(),
      ubicacion: form.ubicacion.trim()
    }

  
    if (!datos.tipo || !datos.titulo || !datos.descripcion || !datos.estacion || !datos.ubicacion) {
      advertencia('Campos incompletos', 'Completá todos los campos antes de agregar la alerta.')
      return
    }

    
    if (datos.titulo.length < 5) {
      advertencia('Título muy corto', 'El título debe tener al menos 5 caracteres.')
      return
    }

   
    if (datos.descripcion.length < 10) {
      advertencia('Descripción muy corta', 'Describí la situación con al menos 10 caracteres.')
      return
    }

    
    if (!CODIGO_ESTACION.test(datos.estacion)) {
      advertencia('Código de estación inválido', 'Usá el formato E-000, por ejemplo E-014.')
      return
    }


    const esRoja = datos.tipo === 'ROJA'
    const iconoHtml = ICONO_HTML_POR_TIPO[datos.tipo]

    const { isConfirmed } = await Swal.fire({
      ...(iconoHtml
        ? { iconHtml: iconoHtml, customClass: { icon: 'swal-sin-borde' } }
        : { icon: 'question' }),
      title: `¿Emitir ${NOMBRE_TIPO[datos.tipo]}?`,
      html: `
        <div class="text-start">
          <p class="mb-1"><strong>Título:</strong> ${escapar(datos.titulo)}</p>
          <p class="mb-1"><strong>Estación:</strong> ${escapar(datos.estacion)}</p>
          <p class="mb-3"><strong>Ubicación:</strong> ${escapar(datos.ubicacion)}</p>
          <p class="${esRoja ? 'text-danger fw-bold' : 'text-secondary'} mb-0">
            ${esRoja
              ? 'Una alerta roja se notifica a todos los canales activos.'
              : 'La alerta se notificará a los canales activos.'}
          </p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Sí, emitir',
      cancelButtonText: 'Revisar',
      confirmButtonColor: esRoja ? '#dc3545' : undefined,
      focusCancel: true
    })
    if (!isConfirmed) return


    setEnviando(true)
    cargando('Emitiendo alerta...')
    try {
      await enviarAlerta(datos)
      cerrar()
      toast.fire({ icon: 'success', title: 'Alerta emitida correctamente' })
      navigate('/alertas')
    } catch {
      error('No se pudo emitir la alerta', 'Ocurrió un problema. Intentá nuevamente en unos minutos.')
      setEnviando(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body p-4 p-md-5">
                <h1 className="h3 fw-bold mb-4">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Nueva alerta
                </h1>

                <form id="formAlerta" onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="tipo" className="form-label">
                      <i className="bi bi-tag me-1"></i>
                      Tipo de alerta
                    </label>
                    <select
                      className="form-select"
                      id="tipo"
                      value={form.tipo}
                      onChange={cambiar('tipo')}
                      required
                    >
                      <option value="">Seleccionar alerta</option>
                      <option value="ROJA">ALERTA ROJA</option>
                      <option value="NARANJA">ALERTA NARANJA</option>
                      <option value="AMARILLA">ALERTA AMARILLA</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="titulo" className="form-label">
                      <i className="bi bi-type me-1"></i>
                      Título
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="titulo"
                      placeholder="Ej: Nivel de agua crítico"
                      value={form.titulo}
                      onChange={cambiar('titulo')}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">
                      <i className="bi bi-text-paragraph me-1"></i>
                      Descripción
                    </label>
                    <textarea
                      className="form-control"
                      id="descripcion"
                      rows="4"
                      placeholder="Describa la situación..."
                      value={form.descripcion}
                      onChange={cambiar('descripcion')}
                      required
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="estacion" className="form-label">
                      <i className="bi bi-broadcast me-1"></i>
                      Estación
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="estacion"
                      placeholder="Ej: E-014"
                      value={form.estacion}
                      onChange={cambiar('estacion')}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="ubicacion" className="form-label">
                      <i className="bi bi-geo-alt me-1"></i>
                      Ubicación
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="ubicacion"
                      placeholder="Ej: Río Marapa · Graneros"
                      value={form.ubicacion}
                      onChange={cambiar('ubicacion')}
                      required
                    />
                  </div>

                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary" disabled={enviando}>
                      <i className="bi bi-plus-circle me-1"></i>
                      Agregar alerta
                    </button>
                    <Link to="/alertas" className="btn btn-outline-secondary" onClick={cancelar}>
                      <i className="bi bi-x-lg me-1"></i>
                      Cancelar
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default AgregarAlerta