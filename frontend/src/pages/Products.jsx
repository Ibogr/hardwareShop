import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import CategoryMenu from "../components/CategoryMenu";
import { useSearchParams } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Products fetch
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);
  
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
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
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
