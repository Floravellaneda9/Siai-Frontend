import { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Cards from '../components/Cards.jsx'

function Home() {
  const [openAccordion, setOpenAccordion] = useState('capital')

  const zonasRiesgo = {
    capital: [
      {
        nombre: 'Villa 9 de Julio',
        descripcion: 'Zona baja cercana a canales, con riesgo de acumulación de agua.',
        imagen: '/img/villa9.jfif'
      },
      {
        nombre: 'San Cayetano',
        descripcion: 'Barrio periférico con drenaje insuficiente.',
        imagen: '/img/sancaye.webp'
      },
      {
        nombre: 'Puente de la 24',
        descripcion: 'Zona céntrica que suele inundarse en días de lluvias intensas, afectando la circulación vehicular y peatonal. Requiere monitoreo constante y medidas preventivas para evitar anegamientos.',
        imagen: '/img/puente-ferroviario-calle-24-septiembre-928696-154424.jpg'
      }
    ],
    sanMiguel: [
      {
        nombre: 'Yerba Buena',
        descripcion: 'Sectores cercanos al Canal Yerba Buena y zonas bajas de El Corte.',
        imagen: '/img/629983342_1278763440972584_1288355342172546299_n.jpg'
      },
      {
        nombre: 'Tafí Viejo',
        descripcion: 'Barrios próximos al Canal Tafí y zonas cercanas al río Lules.',
        imagen: '/img/Captura de pantalla 2026-09-20 045224.png'
      },
      {
        nombre: 'Banda del Río Salí',
        descripcion: 'Barrios ribereños como Lastenia y San Ramón.',
        imagen: '/img/banda.jfif'
      }
    ],
    externas: [
      {
        nombre: 'Villa Chicligasta',
        descripcion: 'Localidad del sur de la provincia, vulnerable al desborde de ríos durante temporales intensos, con aislamiento frecuente de caminos rurales.',
        imagen: '/img/623259834_122210409074059030_7774986341165042616_n.jpg'
      },
      {
        nombre: 'Cruz Alta',
        descripcion: 'Zona de la llanura aluvial del Salí, con napas altas y riesgo de anegamiento por lluvias intensas.',
        imagen: '/img/621805018_122164574084823962_3467613018937982688_n.jpg'
      },
      {
        nombre: 'Leales',
        descripcion: 'Localidad ubicada entre las rutas 38 y 9, en la llanura aluvial del Salí, con napas altas y riesgo de anegamiento por lluvias intensas.',
        imagen: '/img/650838740_871096132644078_2086915501003664637_n.jpg'
      }
    ]
  }

  const medidasPreventivas = [
    {
      titulo: 'Limpiar desagües',
      descripcion: 'Mantener los desagües y canales libres de basura y hojas es fundamental para que el agua de lluvia pueda circular sin obstrucciones. Una limpieza periódica evita acumulaciones que pueden provocar inundaciones en calles y viviendas.',
      imagen: '/img/Limpiar desagües.jpg',
      border: 'success'
    },
    {
      titulo: 'No tirar basura',
      descripcion: 'Arrojar residuos en la vía pública o en cursos de agua bloquea el drenaje natural y aumenta el riesgo de desbordes. Mantener la ciudad limpia es una responsabilidad compartida que protege a todos.',
      imagen: '/img/GNLN3MI7N5BDHPUO65TAE7ORCQ.jpg',
      border: 'warning'
    },
    {
      titulo: 'Kit de emergencia',
      descripcion: 'Preparar un kit con linterna, agua potable, radio, medicamentos y documentos importantes garantiza que la familia esté lista para actuar rápidamente en caso de evacuación o cortes de servicios básicos.',
      imagen: '/img/Kit de supervivencia.jpg',
      border: 'danger'
    },
    {
      titulo: 'Seguir alertas oficiales',
      descripcion: 'Consultar siempre las alertas emitidas por el sistema SIAI y organismos oficiales permite tomar decisiones informadas. Estas alertas indican cuándo es necesario evacuar o extremar precauciones.',
      imagen: '/img/cell-broadcast.jpg',
      border: 'primary'
    },
    {
      titulo: 'Rutas de evacuación',
      descripcion: 'Identificar previamente caminos seguros hacia zonas altas y centros de evacuación reduce el tiempo de reacción en una emergencia. Es recomendable que cada familia tenga un plan de salida definido y lo practique regularmente.',
      imagen: '/img/Copilot_20260920_053406.png',
      border: 'info'
    }
  ]

  const estados = [
    { titulo: 'Zonas normales', cantidad: 18, texto: 'Sin riesgo actual', color: 'success' },
    { titulo: 'Precaución', cantidad: 5, texto: 'Monitoreo preventivo', color: 'warning' },
    { titulo: 'Riesgo', cantidad: 3, texto: 'Requiere atención', color: 'danger' },
    { titulo: 'Emergencia', cantidad: 1, texto: 'Atención inmediata', color: 'dark' }
  ]

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? '' : id)
  }

  return (
    <>
      <Navbar />

      {/* Quiénes somos */}
      <section className="container py-5">
        <div className="border rounded shadow-sm p-4 bg-white">
          <h2 className="text-primary text-center">¿Quiénes somos?</h2>
          <p className="lead text-center">
            Somos <strong>SIAI Tucumán</strong>, un sistema de monitoreo y alerta temprana creado para proteger
            a la comunidad frente a los riesgos de inundaciones.
            Nuestra misión es cuidar vidas y bienes mediante información confiable y actualizada.
          </p>
        </div>
      </section>

      {/* Qué hacemos */}
      <section className="container py-5">
        <div className="border rounded shadow-sm p-4 bg-white">
          <h2 className="text-success text-center">¿Qué hacemos?</h2>
          <div className="row text-center">
            <div className="col-md-3">
              <i className="bi bi-bar-chart-fill fs-1 text-success"></i>
              <p>Monitoreamos estaciones hidrológicas</p>
            </div>
            <div className="col-md-3">
              <i className="bi bi-exclamation-triangle-fill fs-1 text-warning"></i>
              <p>Emitimos alertas preventivas</p>
            </div>
            <div className="col-md-3">
              <i className="bi bi-geo-alt-fill fs-1 text-danger"></i>
              <p>Identificamos zonas vulnerables</p>
            </div>
            <div className="col-md-3">
              <i className="bi bi-people-fill fs-1 text-info"></i>
              <p>Promovemos participación ciudadana</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="container py-5">
        <div className="border rounded shadow-sm p-4 bg-white">
          <h2 className="text-info text-center">¿Cómo funciona?</h2>
          <p className="text-center">
            La página funciona como un tablero interactivo que muestra el estado general de Tucumán,
            reporta niveles de agua en tiempo real y brinda recomendaciones prácticas.
          </p>
        </div>
      </section>

      {/* Estado general de Tucumán */}
      <main className="container-fluid p-4">
        <div className="mb-4">
          <h3 className="h3 fw-bold text-primary">
            ESTADO GENERAL DE TUCUMAN
          </h3>
          <p className="text-info">
            Monitoreo de estaciones, niveles de agua,
            precipitaciones y zonas de riesgo.
          </p>
        </div>

        <div className="alert alert-success">
          <i className="bi bi-check-circle me-2"></i>
          Sistema operativo.
          Última actualización:
          <strong>18:47:32</strong>
        </div>

        <Cards estados={estados} />

        <div className="card shadow-sm mt-4">
          <div className="card-body">
            <h5>
              Nivel de agua más crítico
            </h5>
            <h2 className="text-danger">
              2.18 m
            </h2>
            <p className="text-secondary">
              Estación E-014 · Río Marapa
            </p>
            <div className="progress">
              <div className="progress-bar bg-danger">
                2.18 m
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Zonas en Riesgo */}
      <main className="container-fluid p-4">
        <section className="container my-5">
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-center fw-bold mb-4 text-danger">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              Zonas en Riesgo
            </h2>

            <div className="accordion" id="localidadesAccordion">
              {/* Capital */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button ${openAccordion === 'capital' ? '' : 'collapsed'}`}
                    type="button"
                    onClick={() => toggleAccordion('capital')}
                  >
                    Capital
                  </button>
                </h2>
                <div className={`accordion-collapse collapse ${openAccordion === 'capital' ? 'show' : ''}`}>
                  <div className="accordion-body">
                    <div className="row g-4">
                      {zonasRiesgo.capital.map((zona, index) => (
                        <div className="col-md-4" key={index}>
                          <div className="card shadow-sm h-100 rounded">
                            <img src={zona.imagen} className="card-img-top rounded-top" alt={zona.nombre} />
                            <div className="card-body">
                              <h5 className="card-title">{zona.nombre}</h5>
                              <p className="card-text">{zona.descripcion}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* San Miguel de Tucumán */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button ${openAccordion === 'sanMiguel' ? '' : 'collapsed'}`}
                    type="button"
                    onClick={() => toggleAccordion('sanMiguel')}
                  >
                    Zonas en San Miguel de Tucumán
                  </button>
                </h2>
                <div className={`accordion-collapse collapse ${openAccordion === 'sanMiguel' ? 'show' : ''}`}>
                  <div className="accordion-body">
                    <div className="row g-4">
                      {zonasRiesgo.sanMiguel.map((zona, index) => (
                        <div className="col-md-4" key={index}>
                          <div className="card shadow-sm h-100 rounded">
                            <img src={zona.imagen} className="card-img-top rounded-top" alt={zona.nombre} />
                            <div className="card-body">
                              <h5 className="card-title">{zona.nombre}</h5>
                              <p className="card-text">{zona.descripcion}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Zonas externas */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button ${openAccordion === 'externas' ? '' : 'collapsed'}`}
                    type="button"
                    onClick={() => toggleAccordion('externas')}
                  >
                    Zonas fuera de San Miguel de Tucumán
                  </button>
                </h2>
                <div className={`accordion-collapse collapse ${openAccordion === 'externas' ? 'show' : ''}`}>
                  <div className="accordion-body">
                    <div className="row g-4">
                      {zonasRiesgo.externas.map((zona, index) => (
                        <div className="col-md-4" key={index}>
                          <div className="card shadow-sm h-100 rounded">
                            <img src={zona.imagen} className="card-img-top rounded-top" alt={zona.nombre} />
                            <div className="card-body">
                              <h5 className="card-title">{zona.nombre}</h5>
                              <p className="card-text">{zona.descripcion}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Medidas Preventivas */}
      <main className="container-fluid p-4">
        <section className="container my-5">
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-center fw-bold mb-4 text-success">
              <i className="bi bi-shield-check me-2"></i>
              Medidas Preventivas
            </h2>

            <div className="row g-4 text-center">
              {medidasPreventivas.map((medida, index) => (
                <div className={`col-md-${index < 3 ? '4' : '6'}`} key={index}>
                  <div className={`card h-100 shadow-sm border-${medida.border}`}>
                    <img src={medida.imagen} className="card-img-top rounded-top" alt={medida.titulo} />
                    <div className="card-body">
                      <h5 className="card-title">{medida.titulo}</h5>
                      <p className="card-text">
                        {medida.descripcion}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Home
