const TONE_MAP = {
  Normal: 'success',
  Activa: 'success',
  Operativo: 'success',
  Precaución: 'warning',
  Riesgo: 'danger',
  Emergencia: 'dark',
  Crítica: 'dark',
  NEGRA: 'dark',
  ROJA: 'danger',
  NARANJA: 'warning',
  AMARILLA: 'warning',
  Activo: 'success',
  Inactivo: 'secondary',
  Bloqueado: 'danger',
  Listo: 'success',
}

function StatusBadge({ status, tone, children, dot = false, className = '' }) {
  const resolved = tone || TONE_MAP[status] || 'secondary'
  const textClass = resolved === 'warning' ? 'text-dark' : ''
  return (
    <span className={`badge text-bg-${resolved} ${textClass} d-inline-flex align-items-center gap-1 ${className}`.trim()}>
      {dot && <span className="status-dot" style={{ width: 6, height: 6, background: 'currentColor', boxShadow: 'none', opacity: 0.85 }} aria-hidden="true"></span>}
      {children || status}
    </span>
  )
}

export default StatusBadge