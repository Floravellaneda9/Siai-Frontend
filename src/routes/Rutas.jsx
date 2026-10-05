
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import Home from '../pages/Home.jsx'
import Mapa from '../pages/Mapa.jsx'
import Login from '../pages/Login.jsx'
import Reportes from '../pages/Reportes.jsx'
import Configuracion from '../pages/Configuracion.jsx'
import Estaciones from '../pages/Estaciones.jsx'
import Mediciones from '../pages/Mediciones.jsx'
import Usuarios from '../pages/Usuarios.jsx'
import Historial from '../pages/Historial.jsx'
import Alertas from '../pages/Alertas.jsx'

function Rutas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/configuracion" element={<Configuracion />} />

        <Route path="/estaciones" element={<Estaciones />} />
        <Route path="/mediciones" element={<Mediciones />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/alertas" element={<Alertas />} />

        <Route
          path="*"
          element={
            <main className="container py-5">
              <h1>Página no encontrada</h1>
              <Link to="/">Volver al inicio</Link>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Rutas