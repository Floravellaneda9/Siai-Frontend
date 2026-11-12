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
    <form className="w-100 bg-white border rounded-4 shadow-sm p-4 p-sm-5" style={{ borderColor: 'var(--siai-border)', boxShadow: 'var(--siai-shadow-lg)' }} aria-labelledby="registro-title" onSubmit={handleRegistro}>
      <div className="mb-4">
        <div className="d-inline-flex align-items-center justify-content-center rounded-4 mb-3" style={{ width: 52, height: 52, background: 'var(--siai-primary-soft)', color: 'var(--siai-primary)' }}>
          <i className="bi bi-person-plus-fill fs-4"></i>
        </div>
        <h1 id="registro-title" className="h3 fw-bold mb-1" style={{ color: 'var(--siai-text-strong)' }}>Crear cuenta</h1>
        <p className="text-secondary mb-0">Registrate para acceder al sistema de monitoreo SIAI Tucumán.</p>
      </div>

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

      {error && <p className="alert alert-danger d-flex align-items-center gap-2" role="alert"><i className="bi bi-exclamation-triangle-fill"></i><span>{error}</span></p>}
      {mensaje && <p className="alert alert-success d-flex align-items-center gap-2" role="status"><i className="bi bi-check-circle-fill"></i><span>{mensaje}</span></p>}

      <button type="submit" className="btn btn-primary w-100 py-2" disabled={cargando}>
        <i className="bi bi-person-plus me-1"></i>
        {cargando ? "Creando cuenta..." : "Crear cuenta"}
      </button>

      <p className="small text-secondary text-center mt-4 mb-0">
        ¿Ya tenés cuenta? <Link to="/login" className="fw-semibold">Iniciá sesión</Link>
      </p>
    </form>
  )
}

export default Registro