import axios from 'axios'

const INA_BASE_URL = 'https://alerta.ina.gob.ar/pub/datos'

function crearUrl(recurso, parametros) {
  return `${INA_BASE_URL}/${recurso}?${parametros.toString()}`
}

async function consultarINA(url) {
  try {
    const { data } = await axios.get(url)

    if (data?.mensaje && data?.title) {
      throw new Error(data.mensaje)
    }

    return data
  } catch (error) {
    const mensaje = error.response?.data?.mensaje
      || error.response?.data?.message
      || error.message
      || 'Error al consultar INA'

    throw new Error(mensaje)
  }
}

export async function obtenerEstaciones() {
  const params = new URLSearchParams({ format: 'json' })
  const resultado = await consultarINA(crearUrl('estaciones', params))
  return resultado.data || []
}

export async function obtenerMediciones({
  siteCode,
  varId = 2,
  dias = 7,
  timeStart,
  timeEnd,
}) {
  const hoy = new Date()
  const inicio = new Date(hoy)

  inicio.setDate(hoy.getDate() - dias)

  const fecha = (date) => {
    const anio = date.getFullYear()
    const mes = String(date.getMonth() + 1).padStart(2, '0')
    const dia = String(date.getDate()).padStart(2, '0')
    return `${anio}-${mes}-${dia}`
  }

  const params = new URLSearchParams({
    timeStart: timeStart || fecha(inicio),
    timeEnd: timeEnd || fecha(hoy),
    siteCode: String(siteCode),
    varId: String(varId),
    format: 'json',
  })

  return consultarINA(crearUrl('datos', params))
}
