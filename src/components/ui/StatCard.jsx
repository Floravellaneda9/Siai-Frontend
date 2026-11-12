function StatCard({ label, value, icon, tone = 'primary', meta, badge, onClick }) {
  const Tag = onClick ? 'button' : 'div'
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      className="card h-100 text-start w-100"
      onClick={onClick}
      style={onClick ? { cursor: 'pointer' } : undefined}
    >
      <div className="card-body">
        <div className="d-flex align-items-start justify-content-between mb-2">
          <div>
            <div className="text-secondary small text-uppercase fw-semibold" style={{ letterSpacing: '0.04em' }}>{label}</div>
            <div className="fs-2 fw-bold lh-1 mt-1">{value}</div>
          </div>
          {icon && (
            <div className={`rounded-3 d-inline-flex align-items-center justify-content-center bg-${tone}-subtle text-${tone}`} style={{ width: 42, height: 42 }}>
              <i className={`bi ${icon} fs-5`}></i>
            </div>
          )}
        </div>
        {badge && <div className="mb-1">{badge}</div>}
        {meta && <div className="text-secondary small">{meta}</div>}
      </div>
    </Tag>
  )
}

export default StatCard