import Swal from 'sweetalert2'

export const toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
})

export const advertencia = (title, text) =>
  Swal.fire({ icon: 'warning', title, text, confirmButtonText: 'Entendido' })

export const error = (title, text) =>
  Swal.fire({ icon: 'error', title, text, confirmButtonText: 'Aceptar' })

export const cargando = (title = 'Procesando...') =>
  Swal.fire({
    title,
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => Swal.showLoading(),
  })

export const cerrar = () => Swal.close()