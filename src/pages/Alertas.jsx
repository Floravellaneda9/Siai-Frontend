import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const alertas = [
  {
    id: 1,
    etiqueta: 'ALERTA ROJA',
    color: 'danger',
    titulo: 'Nivel de agua crítico',
    antes: 'La estación E-014 registró un nivel de agua de',
    destacado: '2.18 metros',
    despues: '.',
    ubicacion: 'Río Marapa · Graneros',
    fechaISO: '2026-10-01T09:30',
    fechaTexto: '1 de octubre de 2026, 09:30',
    resumen: 'nivel de agua crítico en Río Marapa',
  },
  {
    id: 2,
    etiqueta: 'ALERTA NARANJA',
    color: 'warning',
    titulo: 'Precipitaciones intensas',
    antes: 'Se registraron',
    destacado: '72.1 mm',
    despues: 'de precipitación.',
    ubicacion: 'Río Lules',
    fechaISO: '2026-10-01T08:15',
    fechaTexto: '1 de octubre de 2026, 08:15',
    resumen: 'precipitaciones intensas en Río Lules',
  },
]

function Alertas() {
  return (
    <>
      <Navbar />
      <main className="bg-light">
        <div className="container-fluid p-4">
          <header className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="h3">Alertas</h1>
              <p className="text-secondary mb-0">
                Alertas generadas por el sistema.
              </p>
            </div>

            <Link className="btn btn-primary" to="/alertas/nueva">
              <i className="bi bi-plus" aria-hidden="true"></i>
              Nueva alerta
            </Link>
          </header>

          <section aria-labelledby="titulo-alertas">
            <h2 id="titulo-alertas" className="visually-hidden">
              Alertas activas
            </h2>

            <div className="row g-4">
              {alertas.map((alerta) => (
                <div key={alerta.id} className="col-lg-6">
                  <article className={`card border-${alerta.color} shadow-sm`}>
                    <div className="card-body">
                      <span className={`badge text-bg-${alerta.color}`}>
                        {alerta.etiqueta}
                      </span>

                      <h3 className="h5 mt-3">{alerta.titulo}</h3>

                      <p>
                        {alerta.antes} <strong>{alerta.destacado}</strong>
                        {alerta.despues === '.' ? '.' : ` ${alerta.despues}`}
                      </p>

                      <p className="text-secondary mb-1">{alerta.ubicacion}</p>

                      <p className="text-secondary small">
                        <time dateTime={alerta.fechaISO}>{alerta.fechaTexto}</time>
                      </p>

                      <Link
                        className={`btn btn-outline-${alerta.color}`}
                        to={`/alertas/${alerta.id}`}
                        aria-label={`Ver detalles de la alerta: ${alerta.resumen}`}
                      >
                        Ver detalles
                      </Link>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Alertas