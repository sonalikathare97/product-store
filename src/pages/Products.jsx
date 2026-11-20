import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async (category = "all") => {
    try {
      setLoading(true);
      setError("");

      let url = "https://fakestoreapi.com/products";

      if (category !== "all") {
        url = `https://fakestoreapi.com/products/category/${category}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed");
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    fetchProducts(category);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <h2>Loading products...</h2>;
  }

  if (error) {
    return (
      <div>
        <h2>{error}</h2>

        <button
          onClick={() =>
            fetchProducts(selectedCategory)
          }
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Product Store</h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <select
        value={selectedCategory}
        onChange={(e) =>
          handleCategoryChange(e.target.value)
        }
      >
        <option value="all">All</option>

        {categories.map((category) => (
          <option
            key={category}
            value={category}
          >
            {category}
          </option>
        ))}
      </select>

      {filteredProducts.length === 0 ? (
        <h3>No products found.</h3>

      ) : (
      <ProductList products={filteredProducts} />
      )}
    </div>
  );
}

export default Products;