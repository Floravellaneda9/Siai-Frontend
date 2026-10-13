import { useState } from 'react'
import Swal from 'sweetalert2'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { advertencia, toast } from '../components/alertas.jsx'



function Usuarios() {
  const [usuarios, setUsuarios] = useState(USUARIOS_INICIALES)


  const adminsActivos = (lista) =>
    lista.filter((u) => u.rol === 'Administrador' && u.estado === 'Activo').length

  function validarFormulario(esNuevo, idActual = null) {
    const popup = Swal.getPopup()
    const nombre = popup.querySelector('#swal-nombre').value.trim()
    const email = popup.querySelector('#swal-email').value.trim().toLowerCase()
    const rol = popup.querySelector('#swal-rol').value
    const password = esNuevo ? popup.querySelector('#swal-pass').value : null
    const estado = esNuevo ? 'Activo' : popup.querySelector('#swal-estado').value

    if (!nombre || !email || (esNuevo && !password)) {
      Swal.showValidationMessage('Completá todos los campos.')
      return false
    }
    if (!EMAIL_VALIDO.test(email)) {
      Swal.showValidationMessage('Ingresá un email válido.')
      return false
    }
    if (usuarios.some((u) => u.id !== idActual && u.email.toLowerCase() === email)) {
      Swal.showValidationMessage('Ya existe un usuario con ese email.')
      return false
    }
    if (usuarios.some((u) => u.id !== idActual && u.nombre.toLowerCase() === nombre.toLowerCase())) {
      Swal.showValidationMessage('Ya existe un usuario con ese nombre.')
      return false
    }
    if (esNuevo && password.length < 8) {
      Swal.showValidationMessage('La contraseña debe tener al menos 8 caracteres.')
      return false
    }
    return { nombre, email, rol, estado, password }
  }

  async function nuevoUsuario() {
    const { value: datos } = await Swal.fire({
      title: 'Nuevo usuario',
      html: formularioHtml({}, true),
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => validarFormulario(true)
    })

    if (!datos) return

    setUsuarios((prev) => [
      ...prev,
      {
        id: Date.now(),
        nombre: datos.nombre,
        email: datos.email,
        rol: datos.rol,
        rolBadgeColor: COLOR_ROL[datos.rol],
        estado: 'Activo',
        estadoBadgeColor: 'success',
        ultimoAcceso: 'Nunca'
      }
    ])

    toast.fire({ icon: 'success', title: 'Usuario creado correctamente' })
  }

 
  async function editarUsuario(usuario) {
    const { value: datos } = await Swal.fire({
      title: `Editar a ${usuario.nombre}`,
      html: formularioHtml(usuario, false),
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar cambios',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const resultado = validarFormulario(false, usuario.id)
        if (!resultado) return false

        
        const quedaria = usuarios.map((u) => (u.id === usuario.id ? { ...u, ...resultado } : u))
        if (adminsActivos(quedaria) === 0) {
          Swal.showValidationMessage('Debe quedar al menos un administrador activo.')
          return false
        }
        return resultado
      }
    })

    if (!datos) return

    setUsuarios((prev) =>
      prev.map((u) =>
        u.id === usuario.id
          ? {
              ...u,
              nombre: datos.nombre,
              email: datos.email,
              rol: datos.rol,
              rolBadgeColor: COLOR_ROL[datos.rol],
              estado: datos.estado,
              estadoBadgeColor: COLOR_ESTADO[datos.estado]
            }
          : u
      )
    )

    toast.fire({ icon: 'success', title: 'Usuario actualizado' })
  }

  async function eliminarUsuario(usuario) {
    const quedaria = usuarios.filter((u) => u.id !== usuario.id)
    if (adminsActivos(quedaria) === 0) {
      advertencia(
        'No se puede eliminar',
        'Es el único administrador activo. Debe quedar al menos uno en el sistema.'
      )
      return
    }

    const { isConfirmed } = await Swal.fire({
      icon: 'warning',
      title: '¿Eliminar usuario?',
      html: `Vas a eliminar a <strong>${escapar(usuario.nombre)}</strong> (${escapar(usuario.email)}).<br>Esta acción no se puede deshacer.`,
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545',
      focusCancel: true
    })

    if (!isConfirmed) return

  
    setUsuarios(quedaria)
    toast.fire({ icon: 'success', title: 'Usuario eliminado' })
  }

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
          <button className="btn btn-primary" onClick={nuevoUsuario}>
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
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>
                      <i className="bi bi-person-circle me-2"></i>
                      {usuario.nombre}
                    </td>
                    <td>{usuario.email}</td>
                    <td><span className={`badge text-bg-${usuario.rolBadgeColor}`}>{usuario.rol}</span></td>
                    <td><span className={`badge text-bg-${usuario.estadoBadgeColor}`}>{usuario.estado}</span></td>
                    <td>{usuario.ultimoAcceso}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-1"
                        onClick={() => editarUsuario(usuario)}
                        aria-label={`Editar a ${usuario.nombre}`}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => eliminarUsuario(usuario)}
                        aria-label={`Eliminar a ${usuario.nombre}`}
                      >
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