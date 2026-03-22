import { useEffect, useState } from "react";

function UserOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mt-5">
      <h2>My Orders</h2>

      {orders.map((order) => (
        <div key={order._id} className="card p-3 mb-3">
          <h5>Status: {order.status}</h5>

          {order.products.map((p) => (
            <div key={p.product._id}>
              {p.product.name} x {p.quantity}
            </div>
          ))}

          <p>Total: € {order.total}</p>
        </div>
      ))}
    </div>
  );
}

export default UserOrders;
