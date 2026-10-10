import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function iniciarSesion(event) {
    event.preventDefault();
    setError("");

    let sesion = null;

    if (usuario === "admin@siai.com" && password === "1234") {
      sesion = {
        usuario: usuario,
        rol: "admin",
      };
    } else if (usuario === "operador01@siai.com" && password === "1234") {
      sesion = {
        usuario: usuario,
        rol: "operador",
      };
    }

    if (!sesion) {
      setError("El correo o la contraseña son incorrectos.");
      return;
    }

    localStorage.setItem("siaiSesion", JSON.stringify(sesion));
    window.dispatchEvent(new Event("siai-sesion-cambio"));

    navigate("/");
  }

  return (
    <>
      {" "}
      <Navbar />
      <main className="container flex-grow-1 d-flex align-items-center justify-content-center py-5">
        <form
          className="col-12 col-md-8 col-lg-5 p-4 p-md-5 border rounded shadow bg-white"
          onSubmit={iniciarSesion}
          aria-labelledby="login-title"
        >
          <div className="text-center mb-4">
            <img
              src="/public/img/logogota..png"
              alt="Logo SIAI Tucumán"
              className="img-fluid"
              width="72"
              height="72"
            />
          </div>

          <h1 id="login-title" className="h3 fw-bold text-center mb-1">
            Bienvenido
          </h1>

          <p className="text-secondary text-center mb-4">
            Ingresá tu usuario y contraseña para acceder al sistema.
          </p>

          <div className="mb-3">
            <label className="form-label" htmlFor="usuario">
              <i className="bi bi-person me-1"></i>
              Correo electrónico
            </label>

            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-person"></i>
              </span>

              <input
                className="form-control"
                type="email"
                id="usuario"
                placeholder="Ingresá tu correo"
                autoComplete="username"
                value={usuario}
                onChange={(event) => setUsuario(event.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label" htmlFor="password">
              <i className="bi bi-lock me-1"></i>
              Contraseña
            </label>

            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-lock"></i>
              </span>

              <input
                className="form-control"
                type="password"
                id="password"
                placeholder="Ingresá tu contraseña"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            id="btn-login"
            className="btn btn-primary w-100 py-3"
          >
            <i className="bi bi-box-arrow-in-right me-1"></i>
            Ingresar
          </button>

          <p className="small text-secondary text-center mt-3 mb-0">
            <i className="bi bi-shield-lock me-1"></i>
            Acceso restringido a personal autorizado.
          </p>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default Login;
