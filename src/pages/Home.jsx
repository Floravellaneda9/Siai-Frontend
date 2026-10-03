import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Cards from '../components/Cards'
import Presentacion from '../components/Presentacion'


function Home() {
  const estados = [
    {
      titulo: 'Zonas normales',
      cantidad: 18,
      texto: 'Sin riesgo actual',
      color: 'success',
    },
    {
      titulo: 'Precaución',
      cantidad: 5,
      texto: 'Monitoreo preventivo',
      color: 'warning',
    },
    {
      titulo: 'Riesgo',
      cantidad: 3,
      texto: 'Requiere atención',
      color: 'danger',
    },
    {
      titulo: 'Emergencia',
      cantidad: 1,
      texto: 'Atención inmediata',
      color: 'dark',
    },
  ]

  return (
    <>
      <Navbar />
   
      <main className="bg-dark">
        <Presentacion />  
        

        <Cards estados={estados} />
      </main>

      <Footer />
    </>
  )
}

export default Home