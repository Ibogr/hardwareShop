import { useState, useEffect } from "react";
import CartItem from "../components/CartItem";
import AddressForm from "../components/AddressForm";
import Payment from "./Payment";

function Cart() {
  const [cart, setCart] = useState([]);
  const [showPayment, setShowPayment] = useState(false); // ödeme formu toggle
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch cart");
        const data = await res.json();
        setCart(data.products || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCart();
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + (item.product.price || 0) * (item.quantity || 1),
    0
  );

  const handleOrderSubmit = (addressData) => {
    // Adres formu doldurulduktan sonra ödeme formunu göster
    setOrderData({ address: addressData });
    setShowPayment(true);
  };

  const handlePaymentSuccess = async () => {
    try {
      const token = localStorage.getItem("token");

      // 1️⃣ Order oluştur
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          address: orderData.address,
          products: cart.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
          })),
          total,
          payment: { isPaid: true },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Payment successful! Order placed.");
      setCart([]);
      setShowPayment(false);
    } catch (err) {
      console.error(err);
      alert("Payment failed. Try again.");
    }
  };

  const handleRemove = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`${import.meta.env.VITE_API_URL}/api/cart/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 🔥 UI güncelle
      setCart((prev) => prev.filter((i) => i.product._id !== productId));
    } catch (err) {
      console.error(err);
      alert("Failed to remove item");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* CART */}
        <div className="col-md-7">
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-muted">Cart is empty</p>
          ) : (
            cart.map((item) => (
              <CartItem
                key={item.product._id}
                item={item.product}
                quantity={item.quantity}
                onRemove={() => handleRemove(item.product._id)}
                onQuantityChange={(qty) =>
                  setCart(
                    cart.map((i) =>
                      i.product._id === item.product._id
                        ? { ...i, quantity: qty }
                        : i
                    )
                  )
                }
              />
            ))
          )}
          <div className="text-end mt-3">
            <h4>Total: € {total}</h4>
          </div>
        </div>

        {/* ADDRESS + PAYMENT */}
        <div className="col-md-5">
          {!showPayment ? (
            <AddressForm
              disabled={cart.length === 0}
              onSubmit={handleOrderSubmit}
            />
          ) : (
            <div className="card p-3">
              <h4>Payment</h4>
              <p>Total: € {total}</p>
              <Payment total={total} onSuccess={handlePaymentSuccess} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
