import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="card">
      <img
        src={product.image}
        alt={product.title}
        width="150"
        height="150"
      />

      <h3>{product.title}</h3>

      <p>
        <strong>Category:</strong> {product.category}
      </p>

      <p>
        <strong>Price:</strong> ${product.price}
      </p>

      <p>
        <strong>Rating:</strong> ⭐ {product.rating?.rate}
      </p>

      <Link to={`/product/${product.id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
}

export default ProductCard;