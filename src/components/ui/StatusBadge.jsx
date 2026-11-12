const TONE_MAP = {
  Normal: 'success',
  Activa: 'success',
  Precaución: 'warning',
  Riesgo: 'danger',
  Emergencia: 'dark',
  ROJA: 'danger',
  NARANJA: 'warning',
  AMARILLA: 'warning',
  Activo: 'success',
  Inactivo: 'secondary',
  Bloqueado: 'danger',
}

function StatusBadge({ status, tone, children }) {
  const resolved = tone || TONE_MAP[status] || 'secondary'
  const textClass = resolved === 'warning' ? 'text-dark' : ''
  return <span className={`badge text-bg-${resolved} ${textClass}`}>{children || status}</span>
}

export default StatusBadge