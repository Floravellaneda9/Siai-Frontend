import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase.js'

function Navbar() {
  const navigate = useNavigate()
  const [session, setSession] = useState(null)
  const [authChecked, setAuthChecked] = useState(!supabase)
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    if (!supabase) {
      return undefined
    }

    let isMounted = true
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (isMounted) {
        setSession(currentSession)
        setAuthChecked(true)
      }
    })

    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      if (isMounted) {
        setSession(currentSession)
        setAuthChecked(true)
      }
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  async function handleLogout() {
    if (!supabase) return

    setLoggingOut(true)
    const { error } = await supabase.auth.signOut()
    setLoggingOut(false)

    if (!error) navigate('/login')
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
            <img
              src="/img/logogota..png"
              alt="Logo SIAI Tucumán"
              width="35"
              height="35"
            />
            SIAI Tucumán
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSIAI"
            aria-controls="navbarSIAI"
            aria-expanded="false"
            aria-label="Abrir navegación"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSIAI">
            <ul className="navbar-nav ms-auto align-items-lg-center">
              <li className="nav-item">
                <Link className="nav-link" to="/mapa">
                  <i className="bi bi-map me-1"></i>
                  Mapa
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/alertas">
                  <i className="bi bi-exclamation-triangle me-1"></i>
                  Alertas
                  <span className="badge bg-danger ms-1">4</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/estaciones">
                  <i className="bi bi-broadcast me-1"></i>
                  Estaciones
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/mediciones">
                  <i className="bi bi-graph-up me-1"></i>
                  Mediciones
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/historial">
                  <i className="bi bi-clock-history me-1"></i>
                  Historial
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/usuarios">
                  <i className="bi bi-people me-1"></i>
                  Usuarios
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/reportes">
                  <i className="bi bi-file-earmark-bar-graph me-1"></i>
                  Reportes
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/configuracion">
                  <i className="bi bi-gear me-1"></i>
                  Configuración
                </Link>
              </li>

              {authChecked && (
                <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                  {session ? (
                    <button className="btn btn-outline-light px-3" type="button" onClick={handleLogout} disabled={loggingOut}>
                      <i className="bi bi-box-arrow-right me-1"></i>
                      {loggingOut ? 'Cerrando sesión...' : 'Cerrar sesión'}
                    </button>
                  ) : (
                    <Link className="btn btn-primary px-3" to="/login">
                      <i className="bi bi-box-arrow-in-right me-1"></i>
                      LOGIN
                    </Link>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
