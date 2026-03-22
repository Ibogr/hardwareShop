import { useEffect, useState } from "react";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:4000/api/admin/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/orders/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!res.ok) throw new Error("Failed to update status");

      // 🔄 UI güncelle
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="container mt-5">Loading orders...</p>;


  return (
    <div className="container mt-5">
      <h2>All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Products</th>
              <th>Total (€)</th>
              <th>Address</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={order._id}>
                <td>{idx + 1}</td>
                <td>
                  {order.user?.name || "Unknown"} (
                  {order.user?.email || "No email"})
                </td>
                <td>
                  {order.products?.length > 0
                    ? order.products.map((p) => (
                        <div key={p.product?._id || Math.random()}>
                          {p.product?.name || "Unknown"} x {p.quantity}
                        </div>
                      ))
                    : "No products"}
                </td>
                <td>{order.total || 0}</td>
                <td>
                  {order.address?.fullName}, {order.address?.address},{" "}
                  {order.address?.city}, {order.address?.eircode},{" "}
                  {order.address?.phone}
                </td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="form-select"
                  >
                    <option value="Pending">Pending</option>
                    <option value="On the way">On the way</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>{" "}
                <td>
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminOrders;
