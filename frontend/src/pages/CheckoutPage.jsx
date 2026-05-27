import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { useCart } from "../store/CartContext";
import { useAuth } from "../store/AuthContext";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, total, clearCart } = useCart();
  const [address, setAddress] = useState({
    address: "",
    city: "",
    pincode: "",
    country: "India"
  });
  const [message, setMessage] = useState("");

  if (!user) {
    navigate("/login");
    return null;
  }

  const placeOrder = async () => {
    try {
      await api.post("/orders", {
        orderItems: items.map((i) => ({ product: i.product, quantity: i.quantity })),
        shippingAddress: address,
        paymentMethod: "COD"
      });
      clearCart();
      setMessage("Order placed successfully");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Order failed");
    }
  };

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <input
        placeholder="Address"
        value={address.address}
        onChange={(e) => setAddress((s) => ({ ...s, address: e.target.value }))}
      />
      <input
        placeholder="City"
        value={address.city}
        onChange={(e) => setAddress((s) => ({ ...s, city: e.target.value }))}
      />
      <input
        placeholder="Pincode"
        value={address.pincode}
        onChange={(e) => setAddress((s) => ({ ...s, pincode: e.target.value }))}
      />
      <h3>Payable: Rs. {total}</h3>
      <button onClick={placeOrder} disabled={items.length === 0}>
        Place Order (COD)
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
