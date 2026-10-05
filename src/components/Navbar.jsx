function Navbar() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold d-flex align-items-center" href="/">
            <img
              src="/img/logogota..png"
              alt="Logo SIAI Tucumán"
              width="35"
              height="35"
            />
            SIAI Tucumán
          </a>

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
                <a className="nav-link" href="/mapa">
                  <i className="bi bi-map me-1"></i>
                  Mapa
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/alertas">
                  <i className="bi bi-exclamation-triangle me-1"></i>
                  Alertas
                  <span className="badge bg-danger ms-1">4</span>
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/estaciones">
                  <i className="bi bi-broadcast me-1"></i>
                  Estaciones
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/mediciones">
                  <i className="bi bi-graph-up me-1"></i>
                  Mediciones
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/historial">
                  <i className="bi bi-clock-history me-1"></i>
                  Historial
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/usuarios">
                  <i className="bi bi-people me-1"></i>
                  Usuarios
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/reportes">
                  <i className="bi bi-file-earmark-bar-graph me-1"></i>
                  Reportes
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/configuracion">
                  <i className="bi bi-gear me-1"></i>
                  Configuración
                </a>
              </li>

              <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                <a className="btn btn-primary px-3" href="/login">
                  <i className="bi bi-box-arrow-in-right me-1"></i>
                  LOGIN
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
