function SectionCard({ title, subtitle, icon, actions, children, bodyClassName = '', footer, noBodyPadding = false }) {
  return (
    <div className="card h-100">
      {(title || actions) && (
        <div className="card-header d-flex align-items-center justify-content-between gap-2 flex-wrap">
          <div>
            {title && (
              <h2 className="h6 fw-bold mb-0 d-flex align-items-center gap-2">
                {icon && <i className={`bi ${icon} text-primary`}></i>}
                {title}
              </h2>
            )}
            {subtitle && <div className="text-secondary small mt-1">{subtitle}</div>}
          </div>
          {actions && <div className="d-flex align-items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className={noBodyPadding ? bodyClassName : `card-body ${bodyClassName}`}>{children}</div>
      {footer && <div className="card-footer bg-transparent">{footer}</div>}
    </div>
  )
}

export default SectionCard