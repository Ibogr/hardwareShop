import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import CategoryMenu from "../components/CategoryMenu";
import { useSearchParams } from "react-router-dom";

function Products() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [user, setUser] = useState(null); // user info

  // Products fetch
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // fetch başlarken loading true
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
        const data = await res.json();
        setProducts(data);

        if (token) {
          const resUser = await fetch(
            `${import.meta.env.VITE_API_URL}/api/users/me`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (resUser.ok) {
            const dataUser = await resUser.json();
            setUser(dataUser);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // fetch bittiğinde loading false
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (deletedId) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/products/${deletedId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Delete failed");

      setProducts((prev) => prev.filter((p) => p._id !== deletedId));
    } catch (err) {
      console.error(err);
      alert("Error deleting product");
    }
  };

  const categories = [...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((p) => {
    const matchCategory = selectedCategory
      ? p.category === selectedCategory
      : true;
    const matchSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Categories</h2>
      <div className="row mb-4">
        <div className="col-md-3">
          <CategoryMenu
            categories={categories}
            onSelect={setSelectedCategory}
          />
        </div>
        <div className="col-md-9">
          <SearchBar onSearch={setSearchQuery} />
          <div className="row">
            {loading ? (
              <p>Loading products...</p>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  user={user}
                  handleDelete={handleDelete}
                />
              ))
            ) : (
              <p className="text-muted">Cannot find the product</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
