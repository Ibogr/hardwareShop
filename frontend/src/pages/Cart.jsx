import { useState, useEffect } from "react";
import CartItem from "../components/CartItem";
import AddressForm from "../components/AddressForm";

function Cart() {
  const [cart, setCart] = useState([]);

  // 🔹 CART FETCH
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:4000/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  // 🔹 REMOVE
  const handleRemove = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:4000/api/cart/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to remove item");

      setCart(cart.filter((item) => item.product._id !== productId));
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 UPDATE QUANTITY
  const handleQuantityChange = async (productId, quantity) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:4000/api/cart/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      });

      if (!res.ok) throw new Error("Failed to update quantity");

      setCart(
        cart.map((item) =>
          item.product._id === productId ? { ...item, quantity } : item
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 TOTAL
  const total = cart.reduce(
    (sum, item) => sum + (item.product.price || 0) * (item.quantity || 1),
    0
  );

  // 🔹 ORDER SUBMIT
  const handleOrder = async (addressData) => {
    try {
      const token = localStorage.getItem("token");

      if (!cart.length) {
        alert("Cart is empty!");
        return;
      }

      // Backend'e order gönderiyoruz
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          address: addressData,
          products: cart.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
          })),
          total: cart.reduce(
            (sum, item) =>
              sum + (item.product.price || 0) * (item.quantity || 1),
            0
          ),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      alert("Order placed successfully!");

      // 🧹 Cart temizle (UI)
      setCart([]);
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* 🟢 SAĞ → CART */}
        <div className="col-md-7">
          <h2 className="mb-4">Your Cart</h2>

          {cart.length === 0 ? (
            <p className="text-muted">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <CartItem
                key={item.product._id}
                item={item.product}
                quantity={item.quantity}
                onRemove={() => handleRemove(item.product._id)}
                onQuantityChange={(qty) =>
                  handleQuantityChange(item.product._id, qty)
                }
              />
            ))
          )}

          <div className="text-end mt-3">
            <h4>Total: € {total}</h4>
          </div>
        </div>
        {/* 🔵 SOL → ADDRESS */}
        <div className="col-md-5">
          <AddressForm disabled={cart.length === 0} onSubmit={handleOrder} />
        </div>
      </div>
    </div>
  );
}

export default Cart;
