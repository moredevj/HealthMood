import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-12 col-md-3">
            <div className="mb-4">
              <img 
                src="/logo.png" 
                alt="Logo Tiendita" 
                style={{ height: '40px' }} // Puedes ajustar este valor
              />
            </div>
            <p className="mb-4">Dedicados al bienestar integral de tu amigo peludo con productos de calidad premium y atención personalizada.</p>
            <div className="d-flex gap-4">
              <a className="text-white" href="#" aria-label="Facebook">
                <FaFacebook style={{ fontSize: '28px' }} /> {/* Puedes ajustar este valor */}
              </a>
              <a className="text-white" href="#" aria-label="Instagram">
                <FaInstagram style={{ fontSize: '28px' }} /> {/* Puedes ajustar este valor */}
              </a>
              <a className="text-white" href="#" aria-label="WhatsApp">
                <FaWhatsapp style={{ fontSize: '28px' }} /> {/* Puedes ajustar este valor */}
              </a>
            </div>
          </div>
          
          <div className="col-6 col-md-3">
            <h5 className="fw-bold mb-4">Enlaces Rápidos</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a className="link-light" href="#">Inicio</a></li>
              <li className="mb-2"><a className="link-light" href="#">Quienes Somos</a></li>
              <li className="mb-2"><a className="link-light" href="#">Catálogo</a></li>
              <li className="mb-2"><a className="link-light" href="/blog">Blog</a></li>
              <li className="mb-2"><a className="link-light" href="/contact">Contacto</a></li>
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <h5 className="fw-bold mb-4">Categorías</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a className="link-light" href="/products">Para Perros</a></li>
              <li className="mb-2"><a className="link-light" href="/products">Para Gatos</a></li>
              <li className="mb-2"><a className="link-light" href="#">Alimento</a></li>
              <li className="mb-2"><a className="link-light" href="#">Accesorios</a></li>
              <li className="mb-2"><a className="link-light" href="#">Salud e Higiene</a></li>
            </ul>
          </div>

          <div className="col-12 col-md-3">
            <h5 className="fw-bold mb-4">Contacto</h5>
            <ul className="list-unstyled">
              <li className="mb-3">
                <a className="link-light text-decoration-none" href="tel:+56990023467">
                  📞 +569 80653796
                </a>
              </li>
              <li className="mb-3">
                <a className="link-light text-decoration-none" href="mailto:healthmood@gmail.com">
                  ✉️ info@healthmood.cl
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-light opacity-25 my-4"/>
        
        <div className="row align-items-center">
          <div className="col-md-8">
            <p className="mb-2 mb-md-0">© {new Date().getFullYear()} Tiendita. Todos los derechos reservados.</p>
          </div>
          <div className="col-md-4">
            <ul className="list-inline mb-0 text-md-end">
              <li className="list-inline-item">
                <a className="link-light small" href="#">Términos de Servicio</a>
              </li>
              <li className="list-inline-item ms-3">
                <a className="link-light small" href="#">Política de privacidad</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
