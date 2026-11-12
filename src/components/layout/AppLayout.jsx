import { useState, useEffect } from 'react'
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom'
import { supabase } from '../../supabase.js'
import './AppLayout.css'

const NAV_ITEMS = [
  { to: '/', label: 'Inicio', icon: 'bi-speedometer2', end: true },
  { to: '/mapa', label: 'Mapa', icon: 'bi-map' },
  { to: '/estaciones', label: 'Estaciones', icon: 'bi-broadcast' },
  { to: '/mediciones', label: 'Mediciones', icon: 'bi-graph-up' },
  { to: '/alertas', label: 'Alertas', icon: 'bi-exclamation-triangle', badge: '3' },
  { to: '/historial', label: 'Historial', icon: 'bi-clock-history' },
  { to: '/usuarios', label: 'Usuarios', icon: 'bi-people' },
  { to: '/reportes', label: 'Reportes', icon: 'bi-file-earmark-bar-graph' },
  { to: '/configuracion', label: 'Configuración', icon: 'bi-gear' },
]

function AppLayout() {
  const [session, setSession] = useState(null)
  const [authChecked, setAuthChecked] = useState(!supabase)
  const [loggingOut, setLoggingOut] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!supabase) return undefined
    let mounted = true
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, currentSession) => {
      if (mounted) {
        setSession(currentSession)
        setAuthChecked(true)
      }
    })
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      if (mounted) {
        setSession(currentSession)
        setAuthChecked(true)
      }
    })
    return () => {
      mounted = false
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
    <div className="app-shell-top">
      <nav className="navbar navbar-expand-xl app-navbar sticky-top">
        <div className="container-fluid px-3 px-lg-4">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img src="/img/logogota..png" alt="SIAI" width="32" height="32" />
            <div className="d-flex flex-column lh-1">
              <span className="brand-title">SIAI Tucumán</span>
              <span className="brand-subtitle">Monitoreo hídrico</span>
            </div>
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#siaiNavbar" aria-controls="siaiNavbar" aria-expanded="false" aria-label="Abrir navegación">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="siaiNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-xl-0 mt-2 mt-xl-0">
              {NAV_ITEMS.map((item) => (
                <li className="nav-item" key={item.to}>
                  <NavLink to={item.to} end={item.end} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    <i className={`bi ${item.icon} me-1`}></i>
                    <span>{item.label}</span>
                    {item.badge && <span className="badge text-bg-danger ms-1">{item.badge}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="d-flex align-items-center gap-2 py-2 py-xl-0">
              <span className="top-status d-none d-md-inline-flex">
                <span className="status-dot bg-success"></span>
                Operativo
              </span>
              {authChecked && (
                session ? (
                  <button className="btn btn-outline-light btn-sm" type="button" onClick={handleLogout} disabled={loggingOut}>
                    <i className="bi bi-box-arrow-right me-1"></i>
                    {loggingOut ? 'Saliendo...' : 'Salir'}
                  </button>
                ) : (
                  <Link className="btn btn-primary btn-sm" to="/login">
                    <i className="bi bi-box-arrow-in-right me-1"></i>
                    Ingresar
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="app-content-top">
        <div className="container-fluid px-3 px-lg-4 py-3 py-lg-4">
          <div className="page-container">
            <Outlet />
          </div>
        </div>
      </main>

      <footer className="app-footer-top">
        <div className="container-fluid px-3 px-lg-4">
          <span>&copy; 2026 SIAI Tucumán · Sistema de monitoreo y alerta temprana</span>
        </div>
      </footer>
    </div>
  )
}

export default AppLayout