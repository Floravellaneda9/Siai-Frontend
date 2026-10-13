
const INA_BASE_URL = 'https://alerta.ina.gob.ar/pub/datos'

function crearUrl(recurso, parametros) {
  return `${INA_BASE_URL}/${recurso}&${parametros.toString()}`
}

async function consultarINA(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Error al consultar INA: ${response.status}`)
  }

  const resultado = await response.json()
  if (resultado.mensaje && resultado.title) {
    throw new Error(resultado.mensaje)
  }

  return resultado
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
  const hoy = new Date();
  const inicio = new Date(hoy);

  inicio.setDate(hoy.getDate() - dias);

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
