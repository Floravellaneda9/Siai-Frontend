import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import Login from '../pages/Login.jsx'
import Mapa from '../pages/Mapa.jsx'
import Alertas from '../pages/Alertas.jsx'
import AgregarAlerta from '../pages/AgregarAlerta.jsx'
import Estaciones from '../pages/Estaciones.jsx'
import Mediciones from '../pages/Mediciones.jsx'
import Historial from '../pages/Historial.jsx'
import Reportes from '../pages/Reportes.jsx'
import Usuarios from '../pages/Usuarios.jsx'
import Configuracion from '../pages/Configuracion.jsx'
import Admi from '../pages/Admi.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/mapa',
    element: <Mapa />,
  },
  {
    path: '/alertas',
    element: <Alertas />,
  },
  {
    path: '/agregar-alerta',
    element: <AgregarAlerta />,
  },
  {
    path: '/estaciones',
    element: <Estaciones />,
  },
  {
    path: '/mediciones',
    element: <Mediciones />,
  },
  {
    path: '/historial',
    element: <Historial />,
  },
  {
    path: '/reportes',
    element: <Reportes />,
  },
  {
    path: '/usuarios',
    element: <Usuarios />,
  },
  {
    path: '/configuracion',
    element: <Configuracion />,
  },
  {
    path: '/admi',
    element: <Admi />,
  },
])

export default router
