import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
  return (
    <>
      <Navbar />
      <main className="bg-light">
        <section clasName="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="card shadow-sm">
                <div className="card-body p-4">
                  <div className="text-center mb-4">
                    <i className="bi bi-person-circle fs-1 text-primary"></i>

                    <h1 className="h3 mt-2">iniciar sesión</h1>

                    <p className="text-secondary">
                      Accede a tu cuenta para continuar
                    </p>
                  </div>

                  <form>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Correo electrónico
                      </label>

                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Ingresa tu correo electrónico"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Contraseña
                      </label>

                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Ingresá tu contraseña"
                      />
                    </div>

                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary">
                        <i className="bi bi-box-arrow-in-right"></i> iniciar
                        sesión
                      </button>
                    </div>
                  </form>

                  <div className="text-center mt-3">
                    <a href="#" className="text-decoration-none">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Login;
