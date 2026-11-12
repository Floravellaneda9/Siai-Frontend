import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isSupabaseConfigured, supabase } from '../supabase.js'
import Swal from 'sweetalert2'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cargando, setCargando] = useState(false)

  async function handleLogin(event) {
    event.preventDefault()

    if (!isSupabaseConfigured) {
      await Swal.fire({
        icon: 'error',
        title: 'Configuración pendiente',
        text: 'Falta configurar Supabase. Revisá las variables de entorno del proyecto.',
        confirmButtonText: 'Entendido',
      })
      return
    }

    setCargando(true)
    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({ email, password })
      if (loginError) throw loginError
      await Swal.fire({
        icon: 'success',
        title: '¡Bienvenido!',
        text: 'Iniciaste sesión correctamente.',
        confirmButtonText: 'Continuar',
      })
      navigate('/mapa')
    } catch {
      await Swal.fire({
        icon: 'error',
        title: 'No se pudo ingresar',
        text: 'Verificá el correo y la contraseña e intentá nuevamente.',
        confirmButtonText: 'Entendido',
      })
    } finally {
      setCargando(false)
    }
  }

  return (
    <form className="w-100 bg-white border rounded-4 p-3 p-sm-4 p-md-5" style={{ borderColor: 'var(--siai-border)', boxShadow: 'var(--siai-shadow-lg)' }} aria-labelledby="login-title" onSubmit={handleLogin}>
      <div className="mb-3 mb-sm-4 pb-3 border-bottom" style={{ borderColor: 'var(--siai-divider)' }}>
        <div className="d-flex align-items-center justify-content-between mb-2 mb-sm-3 gap-2">
          <div className="d-inline-flex align-items-center justify-content-center rounded-4 flex-shrink-0" style={{ width: 50, height: 50, background: 'linear-gradient(135deg, var(--siai-primary-soft), #ecfeff)', color: 'var(--siai-primary)', border: '1px solid rgba(37,99,235,0.12)' }}>
            <i className="bi bi-droplet-fill fs-4"></i>
          </div>
          <span className="badge rounded-pill text-bg-light border text-secondary fw-semibold px-2 px-sm-3 py-2 text-wrap text-end">
            <i className="bi bi-shield-check me-1 text-primary"></i>Acceso seguro
          </span>
        </div>
        <div className="eyebrow mb-1 mb-sm-2">SIAI Tucumán</div>
        <h1 id="login-title" className="h4 h3-sm fw-bold mb-2" style={{ color: 'var(--siai-text-strong)', letterSpacing: '-0.02em' }}>Bienvenido de nuevo</h1>
        <p className="text-secondary mb-0 small">Ingresá tus credenciales para acceder al panel de monitoreo, alertas y gestión operativa.</p>
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="email">Correo electrónico</label>
        <div className="input-group">
          <span className="input-group-text"><i className="bi bi-envelope"></i></span>
          <input className="form-control" type="email" id="email" placeholder="nombre@ejemplo.com"
            autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </div>
      </div>

      <div className="mb-2">
        <label className="form-label" htmlFor="password">Contraseña</label>
        <div className="input-group">
          <span className="input-group-text"><i className="bi bi-lock"></i></span>
          <input className="form-control" type="password" id="password" placeholder="Ingresá tu contraseña"
            autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </div>
      </div>

      <p className="small text-secondary mb-4">Usá la cuenta habilitada por la plataforma para continuar.</p>

      <button type="submit" id="btn-login" className="btn btn-primary w-100 py-2 mb-3" disabled={cargando}>
        <i className={`bi ${cargando ? 'bi-arrow-repeat' : 'bi-box-arrow-in-right'} me-1`}></i>
        {cargando ? 'Verificando credenciales...' : 'Ingresar al sistema'}
      </button>

      <div className="d-flex align-items-center gap-3 my-3">
        <hr className="flex-grow-1 m-0" /><span className="small text-secondary text-uppercase" style={{ letterSpacing: '0.06em', fontSize: '0.7rem' }}>o</span><hr className="flex-grow-1 m-0" />
      </div>

      <Link to="/registro" className="btn btn-outline-secondary w-100 py-2">
        <i className="bi bi-person-plus me-1"></i>
        Crear una cuenta nueva
      </Link>

      <div className="mt-4 pt-3 border-top d-flex flex-column gap-2" style={{ borderColor: 'var(--siai-divider)' }}>
        <p className="small text-secondary mb-0 d-flex align-items-start gap-2">
          <i className="bi bi-shield-lock text-primary mt-1"></i>
          <span>Acceso restringido a personal autorizado. La actividad puede ser registrada con fines operativos.</span>
        </p>
        <Link to="/" className="small fw-semibold text-decoration-none align-self-start">
          <i className="bi bi-arrow-left me-1"></i>Volver al inicio
        </Link>
      </div>
    </form>
  )
}

export default Login