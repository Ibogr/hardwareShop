import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Checkout() {
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    eircode: "",
    city: "",
    phone: "",
    address: "",
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    try {
      // 🛒 cart data (örnek)
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      // 1️⃣ Order oluştur
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          products: cart.map((c) => ({
            product: c._id,
            quantity: c.quantity,
          })),
          address,
          total,
        }),
      });

      const order = await res.json();

      // 2️⃣ Fake payment
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/${order._id}/pay`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      localStorage.removeItem("cart");

      navigate("/my-orders");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Checkout</h2>

      <input
        name="fullName"
        placeholder="Full Name"
        onChange={handleChange}
        className="form-control mb-2"
      />
      <input
        name="address"
        placeholder="Address"
        onChange={handleChange}
        className="form-control mb-2"
      />
      <input
        name="city"
        placeholder="City"
        onChange={handleChange}
        className="form-control mb-2"
      />
      <input
        name="eircode"
        placeholder="Eircode"
        onChange={handleChange}
        className="form-control mb-2"
      />
      <input
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
        className="form-control mb-2"
      />

      <button className="btn btn-success mt-3" onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
}

export default Checkout;
