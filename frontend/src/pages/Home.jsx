import { useNavigate, Link } from "react-router-dom";
import hardware from "../assets/hardware.webp";

function Home() {
  const navigate = useNavigate();

  const goCategory = (category) => {
    navigate(`/products?category=${category}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="position-relative text-center text-white"
        style={{
          marginTop: "100px",
          height: "60vh",
          backgroundImage: `url(${hardware})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Koyu overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        ></div>

        {/* Yazı */}
        <div className="position-relative d-flex flex-column justify-content-center align-items-center h-100">
          <h1 className="display-4">WELCOME</h1>
          <p className="lead text-center px-3"> Meath -Trade Supply-</p>
          <Link to="/products" className="btn btn-primary btn-lg mt-3">
            Products
          </Link>
        </div>
      </div>

      {/* Kategori Kutuları */}
      <div className="container mt-5">
        <div className="row">
          <div
            className="col-md-4 text-center mb-4"
            onClick={() => goCategory("El Aletleri")}
            style={{ cursor: "pointer" }}
          >
            <i className="bi bi-hammer fs-1"></i>
            <h5 className="mt-2">Hand Tools</h5>
            <p>Hammer, pliers, screwdriver and more.</p>
          </div>
          <div
            className="col-md-4 text-center mb-4"
            onClick={() => goCategory("Elektrikli Aletler")}
            style={{ cursor: "pointer" }}
          >
            <i className="bi bi-lightning-charge fs-1"></i>
            <h5 className="mt-2">Electrical Appliances</h5>
            <p>Drills, saws, and other power tools.</p>
          </div>
          <div
            className="col-md-4 text-center mb-4"
            onClick={() => goCategory("Boya & Hırdavat")}
            style={{ cursor: "pointer" }}
          >
            <i className="bi bi-brush fs-1"></i>
            <h5 className="mt-2">Paint Line & Hardware</h5>
            <p>Paint, screws, adhesives, and other materials.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
