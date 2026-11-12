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
    <form className="w-100 bg-white border rounded-4 shadow-sm p-4 p-md-5" style={{ maxWidth: 460 }} aria-labelledby="registro-title" onSubmit={handleRegistro}>
      <div className="text-center mb-4">
        <img src="/img/logogota..png" alt="Logo SIAI Tucumán" className="img-fluid" width="64" height="64" loading="lazy" />
      </div>

      <h1 id="registro-title" className="h3 fw-bold text-center mb-1">Crear cuenta</h1>
      <p className="text-secondary text-center mb-4">Completá tus datos para registrarte en el sistema.</p>

      <div className="mb-3">
        <label className="form-label" htmlFor="nombre">Nombre completo</label>
        <div className="input-group">
          <span className="input-group-text"><i className="bi bi-person"></i></span>
          <input className="form-control" type="text" id="nombre" name="nombre" placeholder="Ingresá tu nombre"
            autoComplete="name" value={nombre} onChange={(event) => setNombre(event.target.value)} required />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="email">Correo electrónico</label>
        <div className="input-group">
          <span className="input-group-text"><i className="bi bi-envelope"></i></span>
          <input className="form-control" type="email" id="email" name="email" placeholder="nombre@ejemplo.com"
            autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label" htmlFor="password">Contraseña</label>
        <div className="input-group">
          <span className="input-group-text"><i className="bi bi-lock"></i></span>
          <input className="form-control" type="password" id="password" name="password" placeholder="Mínimo 6 caracteres"
            autoComplete="new-password" minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} required />
        </div>
      </div>

      {error && <p className="alert alert-danger" role="alert">{error}</p>}
      {mensaje && <p className="alert alert-success" role="status">{mensaje}</p>}

      <button type="submit" className="btn btn-primary w-100 py-2" disabled={cargando}>
        <i className="bi bi-person-plus me-1"></i>
        {cargando ? "Creando cuenta..." : "Registrarme"}
      </button>
    </form>
  )
}

export default Registro