import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://fakestoreapi.com/products/${id}`
      );

      if (!response.ok) {
        throw new Error("Failed");
      }

      const data = await response.json();
      setProduct(data);
    } catch (err) {
      setError("Failed to fetch product.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return <h2>Loading product...</h2>;
  }

  if (error) {
    return (
      <div>
        <h2>{error}</h2>
        <button onClick={fetchProduct}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <img
        src={product.image}
        alt={product.title}
        width="250"
      />

      <h2>{product.title}</h2>

      <p>{product.description}</p>

      <p>
        <strong>Price:</strong> ${product.price}
      </p>

      <p>
        <strong>Category:</strong> {product.category}
      </p>

      <p>
        <strong>Rating:</strong>{" "}
        {product.rating.rate} ⭐
      </p>

      <button onClick={() => navigate("/")}>
        Back to Products
      </button>
    </div>
  );
}

export default ProductDetails;