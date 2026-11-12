import { Outlet, Link } from 'react-router-dom'

function AuthLayout() {
  return (
    <div className="min-vh-100 d-flex flex-column" style={{ background: 'linear-gradient(180deg, #eef5fb 0%, #f4f7fb 100%)' }}>
      <header className="py-3 px-4">
        <Link to="/" className="d-inline-flex align-items-center gap-2 text-decoration-none">
          <img src="/img/logogota..png" alt="SIAI" width="32" height="32" />
          <span className="fw-bold text-dark">SIAI Tucumán</span>
        </Link>
      </header>
      <main className="flex-grow-1 d-flex align-items-center justify-content-center p-3">
        <Outlet />
      </main>
      <footer className="text-center text-secondary small py-3">
        &copy; 2026 SIAI Tucumán · Monitoreo y alerta temprana
      </footer>
    </div>
  )
}

export default AuthLayout