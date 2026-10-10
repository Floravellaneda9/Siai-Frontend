import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isSupabaseConfigured, supabase } from "../supabase";

const Registro = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  async function handleRegistro(event) {
    event.preventDefault();
    setError("");
    setMensaje("");

    if (!isSupabaseConfigured) {
      setError("Falta configurar Supabase. Revisá las variables de entorno del proyecto.");
      return;
    }

    setCargando(true);
    try {
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: nombre.trim() } },
      });

      if (signupError) throw signupError;

      if (data.session) {
        navigate("/mapa");
      } else {
        setMensaje("Cuenta creada. Revisá tu correo para confirmar el registro y luego ingresá.");
      }
    } catch {
      setError("No se pudo crear la cuenta. Revisá tus datos e intentá nuevamente.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="container flex-grow-1 d-flex align-items-center justify-content-center py-5">
        <form className="col-12 col-md-8 col-lg-5 p-4 p-md-5 border rounded shadow bg-white" aria-labelledby="registro-title" onSubmit={handleRegistro}>
          <div className="text-center mb-4">
            <img src="/image/logogota..png" alt="Logo SIAI Tucumán" className="img-fluid" width="72" height="72" />
          </div>

          <h1 id="registro-title" className="h3 fw-bold text-center mb-1">
            Crear cuenta
          </h1>
          <p className="text-secondary text-center mb-4">
            Completá tus datos para registrarte en el sistema.
          </p>

          <div className="mb-3">
            <label className="form-label" htmlFor="nombre">
              <i className="bi bi-person me-1"></i>
              Nombre
            </label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-person"></i></span>
              <input className="form-control" type="text" id="nombre" name="nombre" placeholder="Ingresá tu nombre"
                autoComplete="name" value={nombre} onChange={(event) => setNombre(event.target.value)} required />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              <i className="bi bi-envelope me-1"></i>
              Mail
            </label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-envelope"></i></span>
              <input className="form-control" type="email" id="email" name="email" placeholder="Ingresá tu mail"
                autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label" htmlFor="password">
              <i className="bi bi-lock me-1"></i>
              Contraseña
            </label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-lock"></i></span>
              <input className="form-control" type="password" id="password" name="password" placeholder="Creá una contraseña"
                autoComplete="new-password" minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} required />
            </div>
          </div>

          {error && <p className="alert alert-danger" role="alert">{error}</p>}
          {mensaje && <p className="alert alert-success" role="status">{mensaje}</p>}

          <button type="submit" className="btn btn-primary w-100 py-3" disabled={cargando}>
            <i className="bi bi-person-plus me-1"></i>
            {cargando ? "Creando cuenta..." : "Registrarme"}
          </button>
        </form>
      </main>
      <Footer />
    </>
  )
}

export default Registro