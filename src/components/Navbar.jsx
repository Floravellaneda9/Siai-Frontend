
function Navbar() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid">

          <a className="navbar-brand fw-bold d-flex align-items-center" href="/">
            <img
              src="/image/logogota..png"
              alt="Logo SIAI Tucumán"
              style={{
                width: "35px",
                height: "35px",
                marginRight: "8px"
              }}
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

            <ul className="navbar-nav ms-auto">

          
              <li className="nav-item">
                <a className="nav-link" href="/mapa">
                  <i className="bi bi-map"></i>{" "}
                  Mapa
                </a>
              </li>

           
              <li className="nav-item">
                <a className="nav-link" href="/alertas">
                  <i className="bi bi-exclamation-triangle"></i>{" "}
                  Alertas{" "}
                  <span className="badge bg-danger">4</span>
                </a>
              </li>

           
              <li className="nav-item">
                <a className="nav-link" href="/estaciones">
                  <i className="bi bi-broadcast"></i>{" "}
                  Estaciones
                </a>
              </li>

             
              <li className="nav-item">
                <a className="nav-link" href="/mediciones">
                  <i className="bi bi-graph-up"></i>{" "}
                  Mediciones
                </a>
              </li>

            
              <li className="nav-item">
                <a className="nav-link" href="/historial">
                  <i className="bi bi-clock-history"></i>{" "}
                  Historial
                </a>
              </li>

           
              <li className="nav-item">
                <a className="nav-link" href="/usuarios">
                  <i className="bi bi-people"></i>{" "}
                  Usuarios
                </a>
              </li>

              
              <li className="nav-item">
                <a className="nav-link" href="/reportes">
                  <i className="bi bi-file-earmark-bar-graph"></i>{" "}
                  Reportes
                </a>
              </li>

         
              <li className="nav-item">
                <a className="nav-link" href="/configuracion">
                  <i className="bi bi-gear"></i>{" "}
                  Configuración
                </a>
              </li>

       
              <li className="nav-item ms-lg-2">
                <a className="btn btn-primary" href="/login">
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
```
