function PageHeader({ title, subtitle, icon, actions, eyebrow }) {
  return (
    <div className="page-header mb-4 mb-lg-5">
      <div className="d-flex flex-column flex-lg-row align-items-lg-start justify-content-between gap-3 gap-lg-4">
        <div className="d-flex align-items-start gap-3">
          {icon && (
            <div
              className="d-none d-sm-inline-flex align-items-center justify-content-center rounded-4 flex-shrink-0"
              style={{
                width: 46,
                height: 46,
                background: 'linear-gradient(135deg, var(--siai-primary-soft), #f0fdfa)',
                color: 'var(--siai-primary)',
                border: '1px solid rgba(37,99,235,0.12)',
                boxShadow: 'var(--siai-shadow-xs)',
              }}
              aria-hidden="true"
            >
              <i className={`bi ${icon} fs-5`}></i>
            </div>
          )}
          <div>
            {eyebrow && <div className="eyebrow mb-1">{eyebrow}</div>}
            <h1 className="page-title d-flex align-items-center gap-2 mb-1">
              {icon && <i className={`bi ${icon} text-primary d-sm-none`} aria-hidden="true"></i>}
              {title}
            </h1>
            {subtitle && <p className="page-subtitle mb-0">{subtitle}</p>}
          </div>
        </div>
        {actions && <div className="d-flex align-items-center gap-2 flex-wrap flex-shrink-0">{actions}</div>}
      </div>
    </div>
  )
}

export default PageHeader