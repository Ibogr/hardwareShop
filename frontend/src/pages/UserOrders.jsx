import { useEffect, useState } from "react";

function UserOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/orders/my`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) {
          const text = await res.text();
          console.error("Backend error:", text);
          return;
        }

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "green";
      case "On the way":
        return "blue";
      case "Pending":
      case "Processing":
        return "orange";
      default:
        return "black";
    }
  };

  return (
    <div className="container mt-5">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="card p-3 mb-3"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {/* Left side: Product details */}
            <div style={{ flex: 3 }}>
              <h5>Order #{order._id.slice(-6)}</h5>
              {order.products?.length > 0 ? (
                order.products.map((p, index) => (
                  <div key={p.product?._id || index} className="mb-1">
                    {p.product?.name || "Product not found"} x {p.quantity}
                  </div>
                ))
              ) : (
                <p>No products</p>
              )}
              <p>Total: € {order.total}</p>
            </div>

            {/* Right side: Status */}
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <span
                style={{
                  fontWeight: "bold",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  backgroundColor: getStatusColor(order.status),
                  color: "white",
                }}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default UserOrders;
