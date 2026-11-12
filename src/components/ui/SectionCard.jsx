function SectionCard({ title, subtitle, icon, actions, children, bodyClassName = '', footer, noBodyPadding = false, className = '' }) {
  return (
    <div className={`card h-100 ${className}`.trim()}>
      {(title || actions) && (
        <div className="card-header d-flex align-items-center justify-content-between gap-3 flex-wrap">
          <div className="min-w-0">
            {title && (
              <h2 className="h6 fw-bold mb-0 d-flex align-items-center gap-2">
                {icon && (
                  <span className="d-inline-flex align-items-center justify-content-center rounded-3 bg-primary-subtle text-primary" style={{ width: 28, height: 28 }} aria-hidden="true">
                    <i className={`bi ${icon}`} style={{ fontSize: '0.9rem' }}></i>
                  </span>
                )}
                <span>{title}</span>
              </h2>
            )}
            {subtitle && <div className="text-secondary small mt-1">{subtitle}</div>}
          </div>
          {actions && <div className="d-flex align-items-center gap-2 flex-wrap">{actions}</div>}
        </div>
      )}
      <div className={noBodyPadding ? bodyClassName : `card-body ${bodyClassName}`.trim()}>{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}

export default SectionCard