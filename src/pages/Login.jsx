import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { advertencia, error, cargando, cerrar, toast } from "../components/alertas.jsx";

function Login() {
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()


    if (!usuario.trim() || !password) {
      advertencia('Campos incompletos', 'Ingresá tu usuario y contraseña.')
      return
    }


    cargando('Verificando credenciales...')

    try {
    
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, password }),
      })

      if (res.ok) {
     
        cerrar()
        toast.fire({ icon: 'success', title: 'Bienvenido a SIAI' })
        navigate('/dashboard') 
      } else if (res.status === 401) {
        
        error('Credenciales incorrectas', 'Revisá tu usuario y contraseña.')
      } else if (res.status === 403) {
        
        error('Acceso denegado', 'Tu cuenta está inactiva o bloqueada. Contactá al administrador.')
      } else {
      
        error('Error del servidor', 'Ocurrió un problema. Intentá nuevamente en unos minutos.')
      }
    } catch {
    
      error('Sin conexión', 'No se pudo conectar con el servidor. Verificá tu conexión.')
    }
  }

  return (
    <>
      <Navbar />
      <main className="container flex-grow-1 d-flex align-items-center justify-content-center py-5">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="col-12 col-md-8 col-lg-5 p-4 p-md-5 border rounded shadow bg-white"
          aria-labelledby="login-title"
        >
          <div className="text-center mb-4">
            <img src="/image/logogota.png" alt="Logo SIAI Tucumán" className="img-fluid" width="72" height="72" />
          </div>

          <h1 id="login-title" className="h3 fw-bold text-center mb-1">
            Bienvenido
          </h1>
          <p className="text-secondary text-center mb-4">
            Ingresá tu usuario y contraseña para acceder al sistema.
          </p>

          <div className="mb-3">
            <label className="form-label" htmlFor="usuario">
              Usuario
            </label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-person"></i></span>
              <input
                className="form-control"
                type="text"
                id="usuario"
                placeholder="Ingresá tu usuario"
                autoComplete="username"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label" htmlFor="password">
              Contraseña
            </label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-lock"></i></span>
              <input
                className="form-control"
                type="password"
                id="password"
                placeholder="Ingresá tu contraseña"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" id="btn-login" className="btn btn-primary w-100 py-3">
            <i className="bi bi-box-arrow-in-right me-1"></i>
            Ingresar
          </button>

          <p className="small text-secondary text-center mt-3 mb-0">
            <i className="bi bi-shield-lock me-1"></i>
            Acceso restringido a personal autorizado.
          </p>
        </form>
      </main>
      <Footer />
    </>
  )
}

export default Login