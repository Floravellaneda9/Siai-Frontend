const adminEmails = (import.meta.env.VITE_ADMIN_EMAILS || import.meta.env.VITE_ADMIN_EMAIL || '')
  .split(',')
  .map((value) => value.trim().toLowerCase())
  .filter(Boolean)

export function isAdminSession(session) {
  const email = session?.user?.email?.toLowerCase()
  if (!email) return false
  return adminEmails.includes(email)
}

export function getSessionAccess(session) {
  if (!session) return 'guest'
  return isAdminSession(session) ? 'admin' : 'user'
}

export const NAV_ITEMS = [
  { to: '/', label: 'Inicio', icon: 'bi-speedometer2', end: true, access: 'user' },
  { to: '/mapa', label: 'Mapa', icon: 'bi-map', access: 'user' },
  { to: '/estaciones', label: 'Estaciones', icon: 'bi-broadcast', access: 'user' },
  { to: '/mediciones', label: 'Mediciones', icon: 'bi-graph-up', access: 'user' },
  { to: '/alertas', label: 'Alertas', icon: 'bi-exclamation-triangle', badge: '3', access: 'user' },
  { to: '/historial', label: 'Historial', icon: 'bi-clock-history', access: 'user' },
  { to: '/usuarios', label: 'Usuarios', icon: 'bi-people', access: 'user' },
  { to: '/reportes', label: 'Reportes', icon: 'bi-file-earmark-bar-graph', access: 'user' },
  { to: '/configuracion', label: 'Configuración', icon: 'bi-gear', access: 'admin' },
]

export function canAccess(accessLevel, itemAccess) {
  if (accessLevel === 'admin') return true
  if (accessLevel === 'user') return itemAccess === 'user'
  return false
}

export function getVisibleNavItems(session) {
  const accessLevel = getSessionAccess(session)
  return NAV_ITEMS.filter((item) => canAccess(accessLevel, item.access))
}

export function isPathAllowed(pathname, session) {
  const accessLevel = getSessionAccess(session)
  if (accessLevel === 'guest') return pathname === '/'
  if (accessLevel === 'admin') return true

  const item = NAV_ITEMS.find((nav) => nav.to === pathname)
  if (item) return canAccess(accessLevel, item.access)

  if (pathname === '/agregar-alerta') return true
  if (pathname === '/admi') return false

  return false
}

export function getDefaultPath(session) {
  if (!session) return '/'
  return isAdminSession(session) ? '/' : '/mapa'
}
