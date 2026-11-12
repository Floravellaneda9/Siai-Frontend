const ICONOS = {
  success: 'bi-check-circle-fill',
  warning: 'bi-exclamation-circle-fill',
  danger: 'bi-exclamation-triangle-fill',
  dark: 'bi-shield-exclamation',
  primary: 'bi-activity',
  info: 'bi-info-circle-fill',
}

function Cards({ estados = [] }) {
  return (
    <div className="row g-3">
      {estados.map((estado) => (
        <div className="col-sm-6 col-xl-3" key={estado.titulo}>
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex align-items-start justify-content-between mb-2">
                <div>
                  <div className="text-secondary small text-uppercase fw-semibold" style={{ letterSpacing: '0.04em' }}>{estado.titulo}</div>
                  <div className="fs-2 fw-bold lh-1 mt-1">{estado.cantidad}</div>
                </div>
                <div className={`rounded-3 d-inline-flex align-items-center justify-content-center bg-${estado.color}-subtle text-${estado.color}`} style={{ width: 42, height: 42 }}>
                  <i className={`bi ${ICONOS[estado.color] || 'bi-activity'} fs-5`}></i>
                </div>
              </div>
              {estado.texto && <span className={`badge text-bg-${estado.color}`}>{estado.texto}</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Cards
