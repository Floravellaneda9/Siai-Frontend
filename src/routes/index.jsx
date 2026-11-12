/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout.jsx'
import AuthLayout from '../components/layout/AuthLayout.jsx'

const Home = lazy(() => import('../pages/Home.jsx'))
const Login = lazy(() => import('../pages/Login.jsx'))
const Registro = lazy(() => import('../pages/registro.jsx'))
const Mapa = lazy(() => import('../pages/Mapa.jsx'))
const Alertas = lazy(() => import('../pages/Alertas.jsx'))
const AgregarAlerta = lazy(() => import('../pages/AgregarAlerta.jsx'))
const Estaciones = lazy(() => import('../pages/Estaciones.jsx'))
const Mediciones = lazy(() => import('../pages/Mediciones.jsx'))
const Historial = lazy(() => import('../pages/Historial.jsx'))
const Reportes = lazy(() => import('../pages/Reportes.jsx'))
const Usuarios = lazy(() => import('../pages/Usuarios.jsx'))
const Configuracion = lazy(() => import('../pages/Configuracion.jsx'))
const NoEncontrada = lazy(() => import('../pages/NoEncontrada.jsx'))

function CargandoPagina() {
  return (
    <div className="py-5 text-center" role="status" aria-live="polite">
      <div className="spinner-border text-primary" aria-hidden="true"></div>
      <p className="mt-3 text-secondary mb-0">Cargando módulo...</p>
    </div>
  )
}

function s(Componente) {
  return (
    <Suspense fallback={<CargandoPagina />}>
      <Componente />
    </Suspense>
  )
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: s(Home) },
      { path: '/mapa', element: s(Mapa) },
      { path: '/alertas', element: s(Alertas) },
      { path: '/agregar-alerta', element: s(AgregarAlerta) },
      { path: '/estaciones', element: s(Estaciones) },
      { path: '/mediciones', element: s(Mediciones) },
      { path: '/historial', element: s(Historial) },
      { path: '/reportes', element: s(Reportes) },
      { path: '/usuarios', element: s(Usuarios) },
      { path: '/configuracion', element: s(Configuracion) },
      { path: '/admi', element: <Navigate to="/" replace /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: s(Login) },
      { path: '/registro', element: s(Registro) },
    ],
  },
  { path: '*', element: s(NoEncontrada) },
])

export default router