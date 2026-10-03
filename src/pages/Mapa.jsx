





import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Mapa() {
    return (
        <>
            <Navbar />
            <main class="container-fluid p-4">




                <div class="mb-4">

                    <h1 class="h3">

                        <i class="bi bi-map me-2"></i>

                        Mapa de riesgo

                    </h1>


                    <p class="text-secondary">

                        Visualización de las estaciones y zonas de riesgo
                        de la provincia de Tucumán.

                    </p>

                </div>





                <div class="card shadow-sm">




                    <div class="card-header bg-white">

                        <div class="d-flex
                       justify-content-between
                       align-items-center">

                            <strong>

                                <i class="bi bi-geo-alt me-2"></i>

                                Mapa de monitoreo

                            </strong>


                            <span class="badge text-bg-success">

                                <i class="bi bi-circle-fill me-1"></i>

                                Sistema activo

                            </span>

                        </div>

                    </div>





                    <div class="card-body">




                        <div id="mapaTucuman" aria-label="Mapa interactivo de riesgo hídrico de Tucumán"></div>

                    </div>





                    <div class="card-footer bg-white">

                        <strong class="me-3">

                            Referencias:

                        </strong>


                        <span class="badge text-bg-success me-2">

                            Normal

                        </span>


                        <span class="badge text-bg-warning me-2">

                            Precaución

                        </span>


                        <span class="badge text-bg-danger me-2">

                            Riesgo

                        </span>


                        <span class="badge text-bg-dark">

                            Emergencia

                        </span>

                    </div>


                </div>




                <div class="row g-4 mt-2">




                    <div class="col-md-6 col-xl-3">

                        <div class="card border-success shadow-sm h-100">

                            <div class="card-body">

                                <h6 class="text-secondary">

                                    <i class="bi bi-check-circle me-1"></i>

                                    Zonas normales

                                </h6>


                                <h2>

                                    18

                                </h2>


                                <span class="badge text-bg-success">

                                    Normal

                                </span>

                            </div>

                        </div>

                    </div>





                    <div class="col-md-6 col-xl-3">

                        <div class="card border-warning shadow-sm h-100">

                            <div class="card-body">

                                <h6 class="text-secondary">

                                    <i class="bi bi-exclamation-circle me-1"></i>

                                    Precaución

                                </h6>


                                <h2>

                                    5

                                </h2>


                                <span class="badge text-bg-warning">

                                    Precaución

                                </span>

                            </div>

                        </div>

                    </div>





                    <div class="col-md-6 col-xl-3">

                        <div class="card border-danger shadow-sm h-100">

                            <div class="card-body">

                                <h6 class="text-secondary">

                                    <i class="bi bi-exclamation-triangle me-1"></i>

                                    Riesgo

                                </h6>


                                <h2>

                                    3

                                </h2>


                                <span class="badge text-bg-danger">

                                    Riesgo

                                </span>

                            </div>

                        </div>

                    </div>





                    <div class="col-md-6 col-xl-3">

                        <div class="card border-dark shadow-sm h-100">

                            <div class="card-body">

                                <h6 class="text-secondary">

                                    <i class="bi bi-shield-exclamation me-1"></i>

                                    Emergencia

                                </h6>


                                <h2>

                                    1

                                </h2>


                                <span class="badge text-bg-dark">

                                    Emergencia

                                </span>

                            </div>

                        </div>

                    </div>


                </div>


            </main>
            <Footer />

        </>
    )
}

export default Mapa






