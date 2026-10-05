import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const usuarios = [
  {
    id: 1,
    nombre: 'Administrador',
    email: 'admin@siai.com',
    rol: 'Administrador',
    colorRol: 'primary',
    estado: 'Activo',
    colorEstado: 'success',
    ultimoAcceso: 'Hoy 18:40',
  },
  {
    id: 2,
    nombre: 'Operador01',
    email: 'operador@siai.com',
    rol: 'Operador',
    colorRol: 'secondary',
    estado: 'Activo',
    colorEstado: 'success',
    ultimoAcceso: 'Hoy 18:32',
  },
]

function Usuarios() {
  return (
    <>
      <Navbar />
      <main className="bg-light">
        <div className="container-fluid p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="h3">
                <i className="bi bi-people me-2" aria-hidden="true"></i>
                Usuarios
              </h1>
              <p className="text-secondary">Gestión de usuarios del sistema.</p>
            </div>

            <button type="button" className="btn btn-primary">
              <i className="bi bi-person-plus" aria-hidden="true"></i> Nuevo usuario
            </button>
          </div>

          <div className="card shadow-sm">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Usuario</th>
                    <th scope="col">Email</th>
                    <th scope="col">Rol</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Último acceso</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                      <td>
                        <i className="bi bi-person-circle me-2" aria-hidden="true"></i>
                        {usuario.nombre}
                      </td>
                      <td>{usuario.email}</td>
                      <td>
                        <span className={`badge text-bg-${usuario.colorRol}`}>
                          {usuario.rol}
                        </span>
                      </td>
                      <td>
                        <span className={`badge text-bg-${usuario.colorEstado}`}>
                          {usuario.estado}
                        </span>
                      </td>
                      <td>{usuario.ultimoAcceso}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary me-1"
                          aria-label={`Editar a ${usuario.nombre}`}
                        >
                          <i className="bi bi-pencil" aria-hidden="true"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          aria-label={`Eliminar a ${usuario.nombre}`}
                        >
                          <i className="bi bi-trash" aria-hidden="true"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Usuarios