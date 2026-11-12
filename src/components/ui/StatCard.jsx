function StatCard({ label, value, icon, tone = 'primary', meta, badge, onClick }) {
  const Tag = onClick ? 'button' : 'div'
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      className={`card h-100 text-start w-100 border-0 ${onClick ? 'shadow-sm' : ''}`}
      onClick={onClick}
      style={onClick ? { cursor: 'pointer', transition: 'transform .15s ease, box-shadow .15s ease' } : undefined}
    >
      <div className="card-body p-3 p-lg-4">
        <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
          <div>
            <div className="text-secondary small text-uppercase fw-semibold" style={{ letterSpacing: '0.06em', fontSize: '0.72rem' }}>{label}</div>
            <div className="fw-bold lh-1 mt-2" style={{ fontSize: 'clamp(1.7rem, 1.4rem + 0.8vw, 2.1rem)', color: 'var(--siai-text-strong)' }}>{value}</div>
          </div>
          {icon && (
            <div className={`rounded-4 d-inline-flex align-items-center justify-content-center bg-${tone}-subtle text-${tone} flex-shrink-0`} style={{ width: 46, height: 46 }}>
              <i className={`bi ${icon} fs-5`}></i>
            </div>
          )}
        </div>
        {(badge || meta) && (
          <div className="pt-2 border-top" style={{ borderColor: 'var(--siai-divider)' }}>
            {badge && <div className="mb-1">{badge}</div>}
            {meta && <div className="text-secondary small">{meta}</div>}
          </div>
        )}
      </div>
    </Tag>
  )
}

export default StatCard