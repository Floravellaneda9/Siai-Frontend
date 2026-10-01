
import './App.css'


import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Cards from './components/Cards.jsx'
import Presentacion from './components/Presentacion.jsx'

function App() {
  const estados = [
    {
      titulo: "Zonas Normales",
      cantidad: 18,
      texto: "Sin riesgo actual",
      color: "success",
    },
    {
      titulo: "Precaución",
      cantidad: 5,
      texto: "Monitoreo preventivo",
      color: "warning",
    },
    {
      titulo: "Riesgo",
      cantidad: 3,
      texto: "Requiere atención",
      color: "danger",
    },
    {
      titulo: "Emergencia",
      cantidad: 1,
      texto: "Atención inmediata",
      color: "dark",
    },
  ];

  return (
    <>
      <Navbar />
       <Presentacion />
      <Cards estados={estados} />
      <Footer />
    </>
  )
}

export default App
