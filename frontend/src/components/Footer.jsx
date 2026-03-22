import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 pt-4 pb-4">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        {/* Sol: İsim + Email */}
        <div className="mb-3 mb-md-0">
          <strong>Ufuk Şahin</strong> | ufuk@example.com
        </div>

        {/* Orta: Linkler */}
        <div className="mb-3 mb-md-0 text-center">
          <Link to="/" className="text-white text-decoration-none mx-2">
            Home
          </Link>
          <Link to="/products" className="text-white text-decoration-none mx-2">
            Products
          </Link>
          <Link to="/cart" className="text-white text-decoration-none mx-2">
            Cart
          </Link>
          <Link to="/contact" className="text-white text-decoration-none mx-2">
            Contact
          </Link>
        </div>

        {/* Sağ: Sosyal medya veya boş */}
        <div>
          <a href="#" className="text-white mx-2">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="#" className="text-white mx-2">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="#" className="text-white mx-2">
            <i className="bi bi-instagram"></i>
          </a>
        </div>
      </div>

      <div className="text-center mt-3 small">
        © 2026 HardWare Shop. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
