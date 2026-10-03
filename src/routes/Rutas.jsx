import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import Mapa from '../pages/Mapa.jsx'

function Rutas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route
          path="*"
          element={(
            <main className="container py-5">
              <h1>Página no encontrada</h1>
              <Link to="/">Volver al inicio</Link>
            </main>
          )}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Rutas
