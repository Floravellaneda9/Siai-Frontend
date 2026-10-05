import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

function AgregarAlerta() {
  return (
    <>
      <Navbar />
      <main className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body p-4 p-md-5">
                <h1 className="h3 fw-bold mb-4">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Nueva alerta
                </h1>

                <form id="formAlerta">
                  <div className="mb-3">
                    <label htmlFor="tipo" className="form-label">
                      <i className="bi bi-tag me-1"></i>
                      Tipo de alerta
                    </label>
                    <select className="form-select" id="tipo" required>
                      <option value="">Seleccionar alerta</option>
                      <option value="ROJA">ALERTA ROJA</option>
                      <option value="NARANJA">ALERTA NARANJA</option>
                      <option value="AMARILLA">ALERTA AMARILLA</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="titulo" className="form-label">
                      <i className="bi bi-type me-1"></i>
                      Título
                    </label>
                    <input type="text" className="form-control" id="titulo"
                      placeholder="Ej: Nivel de agua crítico" required />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">
                      <i className="bi bi-text-paragraph me-1"></i>
                      Descripción
                    </label>
                    <textarea className="form-control" id="descripcion" rows="4"
                      placeholder="Describa la situación..." required></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="estacion" className="form-label">
                      <i className="bi bi-broadcast me-1"></i>
                      Estación
                    </label>
                    <input type="text" className="form-control" id="estacion"
                      placeholder="Ej: E-014" required />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="ubicacion" className="form-label">
                      <i className="bi bi-geo-alt me-1"></i>
                      Ubicación
                    </label>
                    <input type="text" className="form-control" id="ubicacion"
                      placeholder="Ej: Río Marapa · Graneros" required />
                  </div>

                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">
                      <i className="bi bi-plus-circle me-1"></i>
                      Agregar alerta
                    </button>
                    <a href="/alertas" className="btn btn-outline-secondary">
                      <i className="bi bi-x-lg me-1"></i>
                      Cancelar
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default AgregarAlerta
