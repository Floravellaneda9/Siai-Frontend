function Footer() {
  return (
    <footer className="bg-light border-top mt-auto">
      <div className="container py-4">
        <div className="row align-items-center">
          <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start">
              <img
              src="/img/logogota..png"
              alt="Logo SIAI Tucumán"
              width="35"
              height="35"
            />
              <span className="fw-bold text-primary fs-5">
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
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <a
                href="mailto:contacto@siai-tucuman.com"
                className="text-secondary text-decoration-none"
                aria-label="Enviar correo"
                title="Enviar correo"
              >
                <i className="bi bi-envelope-fill fs-5"></i>
              </a>
              <a
                href="#"
                className="text-secondary text-decoration-none"
                aria-label="Facebook"
                title="Facebook"
              >
                <i className="bi bi-facebook fs-5"></i>
              </a>
              <a
                href="#"
                className="text-secondary text-decoration-none"
                aria-label="Instagram"
                title="Instagram"
              >
                <i className="bi bi-instagram fs-5"></i>
              </a>
              <a
                href="#"
                className="text-secondary text-decoration-none"
                aria-label="Twitter"
                title="Twitter"
              >
                <i className="bi bi-twitter-x fs-5"></i>
              </a>
              <a
                href="#"
                className="text-secondary text-decoration-none"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <i className="bi bi-whatsapp fs-5"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
