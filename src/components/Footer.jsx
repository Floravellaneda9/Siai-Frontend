
function Footer() {
  return (
    <footer className="bg-light border-top mt-5">
      <div className="container py-4">

        <div className="row align-items-center">

          
          <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start">

              <img
                src="/image/logogota..png"
                alt="Logo SIAI Tucumán"
                style={{
                  width: "40px",
                  height: "40px",
                  marginRight: "8px"
                }}
              />

              <span className="fw-bold text-primary">
                SIAI Tucumán
              </span>

            </div>
          </div>

       
          <div className="col-md-4 text-center mb-3 mb-md-0">
            <p className="mb-0 text-secondary">
              &copy; 2026 SIAI Tucumán
              <br />
              Todos los derechos reservados
            </p>
          </div>

     
          <div className="col-md-4 text-center text-md-end">

            <a
              href="mailto:contacto@siai-tucuman.com"
              className="text-secondary text-decoration-none"
              aria-label="Enviar correo"
            >
              <i className="bi bi-envelope-fill fs-5"></i>
            </a>

          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;
