function PageHeader({ title, subtitle, icon, actions, eyebrow }) {
  return (
    <div className="page-header mb-4">
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
        <div>
          {eyebrow && <div className="text-uppercase small fw-semibold text-secondary mb-1" style={{ letterSpacing: '0.05em' }}>{eyebrow}</div>}
          <h1 className="h3 fw-bold mb-1 d-flex align-items-center gap-2">
            {icon && <i className={`bi ${icon} text-primary`}></i>}
            {title}
          </h1>
          {subtitle && <p className="text-secondary mb-0">{subtitle}</p>}
        </div>
        {actions && <div className="d-flex align-items-center gap-2 flex-wrap">{actions}</div>}
      </div>
    </div>
  )
}

export default PageHeader