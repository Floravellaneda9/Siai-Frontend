import { useMemo, useState } from 'react'
import Swal from 'sweetalert2'
import { advertencia, toast } from '../components/alertas.jsx'
import PageHeader from '../components/layout/PageHeader.jsx'
import SectionCard from '../components/ui/SectionCard.jsx'
import { escaparHtml as escapar } from '../utils/html.js'

const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const COLOR_ROL = { Administrador: 'primary', Editor: 'info', Lector: 'secondary' }
const COLOR_ESTADO = { Activo: 'success', Inactivo: 'secondary', Bloqueado: 'danger' }

const USUARIOS_INICIALES = [
  { id: 1, nombre: 'Iván Diez', email: 'ivan@siai.tucuman.gob.ar', rol: 'Administrador', rolBadgeColor: COLOR_ROL.Administrador, estado: 'Activo', estadoBadgeColor: COLOR_ESTADO.Activo, ultimoAcceso: 'hace 5 minutos' },
  { id: 2, nombre: 'Luciana Jiménez', email: 'luciana@siai.tucuman.gob.ar', rol: 'Editor', rolBadgeColor: COLOR_ROL.Editor, estado: 'Activo', estadoBadgeColor: COLOR_ESTADO.Activo, ultimoAcceso: 'hace 1 hora' },
  { id: 3, nombre: 'Florencia Avellaneda', email: 'florencia@siai.tucuman.gob.ar', rol: 'Lector', rolBadgeColor: COLOR_ROL.Lector, estado: 'Inactivo', estadoBadgeColor: COLOR_ESTADO.Inactivo, ultimoAcceso: 'Nunca' }
]

function formularioHtml(usuario = {}, esNuevo) {
  const roles = ['Administrador', 'Editor', 'Lector']
  const estados = ['Activo', 'Inactivo', 'Bloqueado']
  const opcionesRoles = roles.map((rol) => `<option value="${rol}"${usuario.rol === rol ? ' selected' : ''}>${rol}</option>`).join('')
  const opcionesEstados = estados.map((estado) => `<option value="${estado}"${usuario.estado === estado ? ' selected' : ''}>${estado}</option>`).join('')
  return `<div class="text-start">
    <label class="form-label" for="swal-nombre">Nombre</label>
    <input id="swal-nombre" class="swal2-input w-100" value="${escapar(usuario.nombre || '')}" placeholder="Nombre completo">
    <label class="form-label mt-2" for="swal-email">Email</label>
    <input id="swal-email" class="swal2-input w-100" type="email" value="${escapar(usuario.email || '')}" placeholder="correo@ejemplo.com">
    <label class="form-label mt-2" for="swal-rol">Rol</label>
    <select id="swal-rol" class="swal2-select w-100">${opcionesRoles}</select>
    ${esNuevo
      ? `<label class="form-label mt-2" for="swal-pass">Contraseña</label><input id="swal-pass" class="swal2-input w-100" type="password" placeholder="Mínimo 8 caracteres">`
      : `<label class="form-label mt-2" for="swal-estado">Estado</label><select id="swal-estado" class="swal2-select w-100">${opcionesEstados}</select>`}
  </div>`
}

function Usuarios() {
  const [usuarios, setUsuarios] = useState(USUARIOS_INICIALES)
  const [busqueda, setBusqueda] = useState('')

  const adminsActivos = (lista) => lista.filter((u) => u.rol === 'Administrador' && u.estado === 'Activo').length
  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase()
    if (!q) return usuarios
    return usuarios.filter(u => u.nombre.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.rol.toLowerCase().includes(q))
  }, [usuarios, busqueda])

  function validarFormulario(esNuevo, idActual = null) {
    const popup = Swal.getPopup()
    const nombre = popup.querySelector('#swal-nombre').value.trim()
    const email = popup.querySelector('#swal-email').value.trim().toLowerCase()
    const rol = popup.querySelector('#swal-rol').value
    const password = esNuevo ? popup.querySelector('#swal-pass').value : null
    const estado = esNuevo ? 'Activo' : popup.querySelector('#swal-estado').value
    if (!nombre || !email || (esNuevo && !password)) { Swal.showValidationMessage('Completá todos los campos.'); return false }
    if (!EMAIL_VALIDO.test(email)) { Swal.showValidationMessage('Ingresá un email válido.'); return false }
    if (usuarios.some((u) => u.id !== idActual && u.email.toLowerCase() === email)) { Swal.showValidationMessage('Ya existe un usuario con ese email.'); return false }
    if (usuarios.some((u) => u.id !== idActual && u.nombre.toLowerCase() === nombre.toLowerCase())) { Swal.showValidationMessage('Ya existe un usuario con ese nombre.'); return false }
    if (esNuevo && password.length < 8) { Swal.showValidationMessage('La contraseña debe tener al menos 8 caracteres.'); return false }
    return { nombre, email, rol, estado, password }
  }

  async function nuevoUsuario() {
    const { value: datos } = await Swal.fire({ title: 'Nuevo usuario', html: formularioHtml({}, true), focusConfirm: false, showCancelButton: true, confirmButtonText: 'Guardar', cancelButtonText: 'Cancelar', preConfirm: () => validarFormulario(true) })
    if (!datos) return
    setUsuarios((prev) => [...prev, { id: Date.now(), nombre: datos.nombre, email: datos.email, rol: datos.rol, rolBadgeColor: COLOR_ROL[datos.rol], estado: 'Activo', estadoBadgeColor: 'success', ultimoAcceso: 'Nunca' }])
    toast.fire({ icon: 'success', title: 'Usuario creado correctamente' })
  }

  async function editarUsuario(usuario) {
    const { value: datos } = await Swal.fire({ title: `Editar a ${usuario.nombre}`, html: formularioHtml(usuario, false), focusConfirm: false, showCancelButton: true, confirmButtonText: 'Guardar cambios', cancelButtonText: 'Cancelar', preConfirm: () => {
      const resultado = validarFormulario(false, usuario.id)
      if (!resultado) return false
      const quedaria = usuarios.map((u) => (u.id === usuario.id ? { ...u, ...resultado } : u))
      if (adminsActivos(quedaria) === 0) { Swal.showValidationMessage('Debe quedar al menos un administrador activo.'); return false }
      return resultado
    }})
    if (!datos) return
    setUsuarios((prev) => prev.map((u) => u.id === usuario.id ? { ...u, nombre: datos.nombre, email: datos.email, rol: datos.rol, rolBadgeColor: COLOR_ROL[datos.rol], estado: datos.estado, estadoBadgeColor: COLOR_ESTADO[datos.estado] } : u))
    toast.fire({ icon: 'success', title: 'Usuario actualizado' })
  }

  async function eliminarUsuario(usuario) {
    const quedaria = usuarios.filter((u) => u.id !== usuario.id)
    if (adminsActivos(quedaria) === 0) { advertencia('No se puede eliminar', 'Es el único administrador activo. Debe quedar al menos uno en el sistema.'); return }
    const { isConfirmed } = await Swal.fire({ icon: 'warning', title: '¿Eliminar usuario?', html: `Vas a eliminar a <strong>${escapar(usuario.nombre)}</strong> (${escapar(usuario.email)}).<br>Esta acción no se puede deshacer.`, showCancelButton: true, confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar', confirmButtonColor: '#dc3545', focusCancel: true })
    if (!isConfirmed) return
    setUsuarios(quedaria)
    toast.fire({ icon: 'success', title: 'Usuario eliminado' })
  }

  const activos = usuarios.filter(u=>u.estado==='Activo').length

  return (
    <div>
      <PageHeader icon="bi-people" title="Usuarios y accesos" subtitle="Administración de cuentas, roles y permisos del sistema." actions={<button className="btn btn-primary" onClick={nuevoUsuario}><i className="bi bi-person-plus me-1"></i>Nuevo usuario</button>} />
      <div className="row g-3 mb-3">
        <div className="col-sm-4"><div className="card"><div className="card-body py-3"><div className="text-secondary small">Total</div><div className="fs-4 fw-bold">{usuarios.length}</div></div></div></div>
        <div className="col-sm-4"><div className="card"><div className="card-body py-3"><div className="text-secondary small">Activos</div><div className="fs-4 fw-bold text-success">{activos}</div></div></div></div>
        <div className="col-sm-4"><div className="card"><div className="card-body py-3"><div className="text-secondary small">Administradores</div><div className="fs-4 fw-bold text-primary">{usuarios.filter(u=>u.rol==='Administrador').length}</div></div></div></div>
      </div>
      <SectionCard title="Listado de usuarios" icon="bi-table" actions={<div className="input-group input-group-sm" style={{maxWidth:280}}><span className="input-group-text"><i className="bi bi-search"></i></span><input className="form-control" placeholder="Buscar usuario..." value={busqueda} onChange={e=>setBusqueda(e.target.value)} /></div>} noBodyPadding>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead><tr><th>Usuario</th><th>Email</th><th>Rol</th><th>Estado</th><th>Último acceso</th><th className="text-end">Acciones</th></tr></thead>
            <tbody>
              {filtrados.map((usuario) => (
                <tr key={usuario.id}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div className="rounded-circle bg-primary-subtle text-primary d-inline-flex align-items-center justify-content-center fw-semibold" style={{width:34,height:34}}>{usuario.nombre.charAt(0)}</div>
                      <span className="fw-medium">{usuario.nombre}</span>
                    </div>
                  </td>
                  <td className="text-secondary">{usuario.email}</td>
                  <td><span className={`badge text-bg-${usuario.rolBadgeColor}`}>{usuario.rol}</span></td>
                  <td><span className={`badge text-bg-${usuario.estadoBadgeColor}`}>{usuario.estado}</span></td>
                  <td className="text-secondary small">{usuario.ultimoAcceso}</td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-primary me-1" onClick={() => editarUsuario(usuario)} aria-label={`Editar a ${usuario.nombre}`}><i className="bi bi-pencil"></i></button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarUsuario(usuario)} aria-label={`Eliminar a ${usuario.nombre}`}><i className="bi bi-trash"></i></button>
                  </td>
                </tr>
              ))}
              {filtrados.length === 0 && <tr><td colSpan="6" className="text-center text-secondary py-4">No se encontraron usuarios.</td></tr>}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  )
}

export default Usuarios