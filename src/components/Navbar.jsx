import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [sesion, setSesion] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("siaiSesion"));
    } catch {
      return null;
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    function actualizarSesion() {
      try {
        setSesion(JSON.parse(localStorage.getItem("siaiSesion")));
      } catch {
        setSesion(null);
      }
    }

    window.addEventListener("siai-sesion-cambio", actualizarSesion);

    return () => {
      window.removeEventListener("siai-sesion-cambio", actualizarSesion);
    };
  }, []);

  function cerrarSesion() {
    localStorage.removeItem("siaiSesion");
    setSesion(null);
    navigate("/");
  }

  return (
    <header>
      {" "}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        {" "}
        <div className="container-fluid">
          {" "}
          <Link
            className="navbar-brand fw-bold d-flex align-items-center"
            to="/"
          >
            {" "}
            <img
              src="/img/logogota..png"
              alt="Logo SIAI Tucumán"
              width="35"
              height="35"
            />
            SIAI Tucumán{" "}
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

              {sesion && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/estaciones">
                      <i className="bi bi-broadcast me-1"></i>
                      Estaciones
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/usuarios">
                      <i className="bi bi-people me-1"></i>
                      Usuarios
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/configuracion">
                      <i className="bi bi-gear me-1"></i>
                      Configuración
                    </Link>
                  </li>
                </>
              )}

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
                <Link className="nav-link" to="/reportes">
                  <i className="bi bi-file-earmark-bar-graph me-1"></i>
                  Reportes
                </Link>
              </li>

              <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                {sesion ? (
                  <button
                    type="button"
                    className="btn btn-outline-light px-3"
                    onClick={cerrarSesion}
                  >
                    <i className="bi bi-box-arrow-right me-1"></i>
                    Cerrar sesión
                  </button>
                ) : (
                  <Link className="btn btn-primary px-3" to="/login">
                    <i className="bi bi-box-arrow-in-right me-1"></i>
                    LOGIN
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
