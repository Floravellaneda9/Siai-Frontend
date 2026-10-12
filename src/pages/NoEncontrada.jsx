import { Link, useNavigate } from 'react-router-dom'

function NoEncontrada() {
  const navigate = useNavigate()

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark bg-gradient p-3">
      <div className="card bg-secondary bg-opacity-25 border-light border-opacity-25 text-white text-center shadow-lg rounded-4 w-100" style={{ maxWidth: '560px' }}>
        <div className="card-body p-4 p-md-5">
          <i className="bi bi-compass display-3 text-info"></i>

          <h1 className="display-1 fw-bold text-info my-2">404</h1>
          <h2 className="h4 fw-semibold mb-3">Página no encontrada</h2>

          <p className="text-white-50 mb-4">
            La página que buscas no existe
            o fue movida a otra dirección.
          </p>

          <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center">
            <Link to="/" className="btn btn-info text-white rounded-pill px-4">
              <i className="bi bi-house-door me-2"></i>
              Volver al inicio
            </Link>
            <button
              type="button"
              className="btn btn-outline-light rounded-pill px-4"
              onClick={() => navigate(-1)}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Página anterior
            </button>
          </div>

          <hr className="border-light opacity-25 my-4" />

          <small className="d-block text-white-50 mb-2">
            O visita alguna de estas secciones:
          </small>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link to="/mapa" className="link-light link-opacity-75 link-opacity-100-hover text-decoration-none">Mapa</Link>
            <Link to="/alertas" className="link-light link-opacity-75 link-opacity-100-hover text-decoration-none">Alertas</Link>
            <Link to="/estaciones" className="link-light link-opacity-75 link-opacity-100-hover text-decoration-none">Estaciones</Link>
            <Link to="/mediciones" className="link-light link-opacity-75 link-opacity-100-hover text-decoration-none">Mediciones</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoEncontrada