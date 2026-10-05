import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

function Usuarios() {
  const usuarios = [
    {
      nombre: 'Administrador',
      email: 'admin@siai.com',
      rol: 'Administrador',
      rolBadgeColor: 'primary',
      estado: 'Activo',
      estadoBadgeColor: 'success',
      ultimoAcceso: 'Hoy 18:40'
    },
    {
      nombre: 'Operador01',
      email: 'operador@siai.com',
      rol: 'Operador',
      rolBadgeColor: 'secondary',
      estado: 'Activo',
      estadoBadgeColor: 'success',
      ultimoAcceso: 'Hoy 18:32'
    }
  ]

  return (
    <>
      <Navbar />
      <main className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <div>
            <h1 className="h3 fw-bold">
              <i className="bi bi-people me-2"></i>
              Usuarios
            </h1>
            <p className="text-secondary mb-0">
              Gestión de usuarios del sistema.
            </p>
          </div>
          <button className="btn btn-primary">
            <i className="bi bi-person-plus me-1"></i>
            Nuevo usuario
          </button>
        </div>

        <div className="card">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Último acceso</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario, index) => (
                  <tr key={index}>
                    <td>
                      <i className="bi bi-person-circle me-2"></i>
                      {usuario.nombre}
                    </td>
                    <td>{usuario.email}</td>
                    <td><span className={`badge text-bg-${usuario.rolBadgeColor}`}>{usuario.rol}</span></td>
                    <td><span className={`badge text-bg-${usuario.estadoBadgeColor}`}>{usuario.estado}</span></td>
                    <td>{usuario.ultimoAcceso}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary">
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-danger">
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Usuarios
