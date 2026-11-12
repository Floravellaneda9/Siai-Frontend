function EmptyState({ icon = 'bi-inbox', title = 'Sin datos', description, action }) {
  return (
    <div className="text-center py-5 px-3">
      <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-light mb-3" style={{ width: 64, height: 64 }}>
        <i className={`bi ${icon} fs-3 text-secondary`}></i>
      </div>
      <h3 className="h6 fw-semibold mb-1">{title}</h3>
      {description && <p className="text-secondary mb-3 small">{description}</p>}
      {action}
    </div>
  )
}

export default EmptyState