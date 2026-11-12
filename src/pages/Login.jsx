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
    <form className="w-100 bg-white border rounded-4 shadow-sm p-4 p-md-5" style={{ maxWidth: 460 }} aria-labelledby="login-title" onSubmit={handleLogin}>
      <div className="text-center mb-4">
        <img src="/img/logogota..png" alt="Logo SIAI Tucumán" className="img-fluid" width="64" height="64" />
      </div>

      <h1 id="login-title" className="h3 fw-bold text-center mb-1">
        Iniciar sesión
      </h1>
      <p className="text-secondary text-center mb-4">
        Accedé al sistema de monitoreo y alertas de SIAI Tucumán.
      </p>

      <div className="mb-3">
        <label className="form-label" htmlFor="email">Correo electrónico</label>
        <div className="input-group">
          <span className="input-group-text"><i className="bi bi-envelope"></i></span>
          <input className="form-control" type="email" id="email" placeholder="nombre@ejemplo.com"
            autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label" htmlFor="password">Contraseña</label>
        <div className="input-group">
          <span className="input-group-text"><i className="bi bi-lock"></i></span>
          <input className="form-control" type="password" id="password" placeholder="Ingresá tu contraseña"
            autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </div>
      </div>

      <button type="submit" id="btn-login" className="btn btn-primary w-100 py-2" disabled={cargando}>
        <i className="bi bi-box-arrow-in-right me-1"></i>
        {cargando ? 'Ingresando...' : 'Ingresar'}
      </button>

      <Link to="/registro" className="btn btn-outline-secondary w-100 py-2 mt-2">
        <i className="bi bi-person-plus me-1"></i>
        Crear cuenta
      </Link>

      <p className="small text-secondary text-center mt-3 mb-0">
        <i className="bi bi-shield-lock me-1"></i>
        Acceso restringido a personal autorizado.
      </p>
    </form>
  )
}

export default Login