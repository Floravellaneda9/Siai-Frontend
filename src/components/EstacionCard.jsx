import { Link } from 'react-router-dom'

function EstacionCard({ estacion }) {
  return (
    <div className="col-md-6 col-xl-4">
      <article className="card shadow-sm h-100">
        <div className="card-header d-flex justify-content-between">
          <strong>{estacion.id}</strong>
          <span className={`badge text-bg-${estacion.color}`}>
            {estacion.estado}
          </span>
        </div>

        <div className="card-body">
          <h3 className="h5">{estacion.nombre}</h3>
          <p className="text-secondary">Estación hidrológica</p>
          <hr />

          <dl className="mb-3">
            <dt className="fw-normal">
              <i className="bi bi-water" aria-hidden="true"></i> Nivel
            </dt>
            <dd><strong>{estacion.nivel}</strong></dd>

            <dt className="fw-normal">
              <i className="bi bi-cloud-rain" aria-hidden="true"></i> Precipitación
            </dt>
            <dd><strong>{estacion.precipitacion}</strong></dd>

            <dt className="fw-normal">
              <i className="bi bi-clock" aria-hidden="true"></i> Última actualización
            </dt>
            <dd className="mb-0">
              <time dateTime={estacion.fechaISO}>{estacion.fechaTexto}</time>
            </dd>
          </dl>

          <Link
            className={`btn btn-outline-${estacion.botonColor} w-100`}
            to={`/estaciones/${estacion.id}`}
            aria-label={`Ver detalles de la estación ${estacion.id}, ${estacion.nombre}`}
          >
            Ver detalles
          </Link>
        </div>
      </article>
    </div>
  )
}

export default EstacionCard