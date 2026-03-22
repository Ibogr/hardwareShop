import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products/${id}`
        );
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to add to cart");
        return;
      }

      alert("Added to cart ✅");
    } catch (err) {
      console.error(err);
      alert("Error adding to cart");
    }
  };

  if (!product) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid"
            style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
          />
        </div>

        <div className="col-md-6">
          <h2>{product.name}</h2>
          <h4 className="text-primary">€ {product.price}</h4>
          <p>{product.description}</p>

          <button className="btn btn-success btn-lg" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
