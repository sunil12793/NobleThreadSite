import { useEffect, useState } from "react";
import { api } from "../api";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");

  const load = async (search = "") => {
    const { data } = await api.get("/products", { params: { keyword: search } });
    setProducts(data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <form
        className="search"
        onSubmit={(e) => {
          e.preventDefault();
          load(keyword);
        }}
      >
        <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Search products" />
        <button type="submit">Search</button>
      </form>
      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}
