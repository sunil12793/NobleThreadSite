import { useNavigate } from "react-router-dom";
import { useCart } from "../store/CartContext";
import { useAuth } from "../store/AuthContext";

export default function CartPage() {
  const { items, removeFromCart, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Your Cart</h1>
      {items.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.product} className="row cart-item">
              <span>{item.name}</span>
              <span>
                {item.quantity} x Rs. {item.price}
              </span>
              <button onClick={() => removeFromCart(item.product)}>Remove</button>
            </div>
          ))}
          <h2>Total: Rs. {total}</h2>
          <button onClick={() => (user ? navigate("/checkout") : navigate("/login"))}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}
