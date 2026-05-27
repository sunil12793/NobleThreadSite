import { Link } from "react-router-dom";
import { useCart } from "../store/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const price = product.discountPrice || product.price;

  return (
    <div className="card">
      <img src={product.image || "https://via.placeholder.com/300x300"} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.category}</p>
      <p className="price">Rs. {price}</p>
      <div className="row">
        <Link to={`/product/${product._id}`}>View</Link>
        <button onClick={() => addToCart(product)}>Add</button>
      </div>
    </div>
  );
}
