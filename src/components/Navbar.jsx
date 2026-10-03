import { Link } from "react-router-dom";



function Navbar() {
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
              className="me-2"
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

            <ul className="navbar-nav ms-auto">


              <li className="nav-item">
                <Link className="nav-link" to="/mapa">
                  <i className="bi bi-map"></i>{" "}
                  Mapa
                </Link>
              </li>


              <li className="nav-item">
                <Link className="nav-link" to="/alertas">
                  <i className="bi bi-exclamation-triangle"></i>{" "}
                  Alertas{" "}
                  <span className="badge bg-danger">4</span>
                </Link>
              </li>


              <li className="nav-item">
                <Link className="nav-link" to="/estaciones">
                  <i className="bi bi-broadcast"></i>{" "}
                  Estaciones
                </Link>
              </li>


              <li className="nav-item">
                <Link className="nav-link" to="/mediciones">
                  <i className="bi bi-graph-up"></i>{" "}
                  Mediciones
                </Link>
              </li>


              <li className="nav-item">
                <Link className="nav-link" to="/historial">
                  <i className="bi bi-clock-history"></i>{" "}
                  Historial
                </Link>
              </li>


              <li className="nav-item">
                <Link className="nav-link" to="/usuarios">
                  <i className="bi bi-people"></i>{" "}
                  Usuarios
                </Link>
              </li>


              <li className="nav-item">
                <Link className="nav-link" to="/reportes">
                  <i className="bi bi-file-earmark-bar-graph"></i>{" "}
                  Reportes
                </Link>
              </li>


              <li className="nav-item">
                <Link className="nav-link" to="/configuracion">
                  <i className="bi bi-gear"></i>{" "}
                  Configuración
                </Link>
              </li>


              <li className="nav-item ms-lg-2">
                <Link className="btn btn-primary" to="/login">
                  LOGIN
                </Link>
              </li>

            </ul>

          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
