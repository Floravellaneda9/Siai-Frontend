import { Outlet, Link } from 'react-router-dom'

function AuthLayout() {
  return (
    <div className="d-flex flex-column position-relative" style={{ minHeight: '100dvh', background: 'radial-gradient(900px 420px at 10% 0%, rgba(37,99,235,0.10), transparent 60%), radial-gradient(800px 420px at 100% 10%, rgba(15,118,110,0.10), transparent 55%), linear-gradient(180deg, #f6f9fd 0%, #edf3fb 100%)' }}>
      <div className="position-absolute top-0 start-0 w-100 h-100" aria-hidden="true" style={{ backgroundImage: 'linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)', backgroundSize: '32px 32px', maskImage: 'linear-gradient(to bottom, black, transparent 85%)', pointerEvents: 'none' }}></div>
      <header className="py-2 py-sm-3 px-3 px-md-4 position-relative flex-shrink-0">
        <div className="container-fluid px-0" style={{ maxWidth: 1200 }}>
          <Link to="/" className="d-inline-flex align-items-center gap-2 text-decoration-none">
            <span className="d-inline-flex align-items-center justify-content-center rounded-3" style={{ width: 36, height: 36, background: '#fff', border: '1px solid var(--siai-border)', boxShadow: 'var(--siai-shadow-xs)' }}>
              <img src="/img/logogota..png" alt="SIAI" width="22" height="22" />
            </span>
            <div className="lh-1">
              <div className="fw-bold" style={{ color: 'var(--siai-text-strong)' }}>SIAI Tucumán</div>
              <div className="small text-secondary d-none d-sm-block">Monitoreo y alerta hídrica</div>
            </div>
          </Link>
        </div>
      </header>
      <main className="flex-grow-1 d-flex px-3 px-md-4 py-3 py-md-4 position-relative overflow-auto">
        <div className="w-100 m-auto" style={{ maxWidth: 980 }}>
          <div className="row g-3 g-md-4 g-lg-5 align-items-center justify-content-center">
            <div className="col-lg-6 d-none d-lg-block">
              <div className="pe-xl-4">
                <div className="eyebrow mb-2">Plataforma operativa</div>
                <h2 className="display-6 fw-bold mb-3" style={{ color: 'var(--siai-text-strong)', letterSpacing: '-0.03em' }}>Monitoreo hídrico y alertas tempranas para Tucumán</h2>
                <p className="text-secondary mb-4" style={{ maxWidth: '48ch' }}>Accedé al sistema para supervisar estaciones, niveles, eventos y reportes desde una plataforma centralizada.</p>
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex align-items-center gap-2 text-secondary"><i className="bi bi-check-circle-fill text-success"></i><span>Seguimiento operativo en tiempo casi real</span></div>
                  <div className="d-flex align-items-center gap-2 text-secondary"><i className="bi bi-check-circle-fill text-success"></i><span>Alertas y trazabilidad de eventos críticos</span></div>
                  <div className="d-flex align-items-center gap-2 text-secondary"><i className="bi bi-check-circle-fill text-success"></i><span>Reportes y datos hidrométricos integrados</span></div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4 ms-lg-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center text-secondary small py-2 py-sm-3 px-3 position-relative flex-shrink-0">
        &copy; 2026 SIAI Tucumán · Monitoreo y alerta temprana
      </footer>
    </div>
  )
}

export default AuthLayout