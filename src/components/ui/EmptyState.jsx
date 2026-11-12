function EmptyState({ icon = 'bi-inbox', title = 'Sin datos', description, action }) {
  return (
    <div className="text-center py-5 py-lg-6 px-3">
      <div
        className="d-inline-flex align-items-center justify-content-center rounded-4 mb-3"
        style={{ width: 68, height: 68, background: 'var(--siai-surface-alt)', border: '1px solid var(--siai-border)', color: 'var(--siai-text-muted)' }}
        aria-hidden="true"
      >
        <i className={`bi ${icon} fs-3`}></i>
      </div>
      <h3 className="h6 fw-semibold mb-1" style={{ color: 'var(--siai-text-strong)' }}>{title}</h3>
      {description && <p className="text-secondary mb-3 small mx-auto" style={{ maxWidth: '42ch' }}>{description}</p>}
      {action}
    </div>
  )
}

export default EmptyState