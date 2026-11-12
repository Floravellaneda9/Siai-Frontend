import axios from 'axios'

const INA_BASE_URL = 'https://alerta.ina.gob.ar/pub/datos'
const TIMEOUT_MS = 15000

function crearUrl(recurso, parametros) {
  return `${INA_BASE_URL}/${recurso}?${parametros.toString()}`
}

async function consultarINA(url, options = {}) {
  try {
    const { data } = await axios.get(url, { timeout: TIMEOUT_MS, ...options })

    if (data?.mensaje && data?.title) {
      throw new Error(data.mensaje)
    }

    return data
  } catch (error) {
    if (axios.isCancel?.(error) || error?.name === 'CanceledError' || error?.code === 'ERR_CANCELED') {
      throw new Error('Consulta cancelada', { cause: error })
    }
    const mensaje = error.response?.data?.mensaje
      || error.response?.data?.message
      || (error.code === 'ECONNABORTED' ? 'Tiempo de espera agotado al consultar INA' : null)
      || error.message
      || 'Error al consultar INA'

    throw new Error(mensaje, { cause: error })
  }
}

export async function obtenerEstaciones(options = {}) {
  const params = new URLSearchParams({ format: 'json' })
  const resultado = await consultarINA(crearUrl('estaciones', params), options)
  return resultado.data || []
}

export async function obtenerMediciones({
  siteCode,
  varId = 2,
  dias = 7,
  timeStart,
  timeEnd,
  signal,
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

  return consultarINA(crearUrl('datos', params), { signal })
}
