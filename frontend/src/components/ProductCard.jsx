import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            className="card-img-top"
            alt={product.name}
            style={{
              height: "200px", // Sabit yükseklik
              objectFit: "cover", // Resim taşma vs. olmadan kesilir
            }}
          />
        </Link>

        <div className="card-body">
          <h5 className="card-title">
            <Link
              to={`/product/${product._id}`}
              className="text-decoration-none text-dark"
            >
              {product.name}
            </Link>
          </h5>

          <p className="card-text">€ {product.price}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
