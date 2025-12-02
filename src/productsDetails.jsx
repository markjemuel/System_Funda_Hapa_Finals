import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetail({ allProducts, formatPHP }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const found = allProducts.find((p) => p.id.toString() === id);
    setProduct(found);
  }, [id, allProducts]);

  if (!product) return <p style={{ color: "#f5f5f7" }}>Product not found</p>;

  return (
    <div
      style={{
        padding: "24px",
        color: "#f5f5f7",
        backgroundColor: "#1c1c1e",
        minHeight: "100vh",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "24px",
          backgroundColor: "#007aff",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "8px 12px",
          cursor: "pointer",
        }}
      >
        Back
      </button>

      <h2>{product.name}</h2>
      <img
        src={product.image || product.img || product.imageUrl}
        alt={product.name}
        style={{ width: "300px", borderRadius: "8px", marginBottom: "12px" }}
      />
      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <p>
        <strong>Description:</strong> {product.description}
      </p>
      <p>
        <strong>Specification:</strong> {product.specification}
      </p>
      <p>
        <strong>Rating:</strong> {product.rating}
      </p>
      <p>
        <strong>Price:</strong> {formatPHP(product.price)}
      </p>
      <p>
        <strong>Quantity:</strong> {product.quantity}
      </p>
      <p>
        <strong>Subtotal:</strong> {formatPHP(product.price * product.quantity)}
      </p>
    </div>
  );
}

export default ProductDetail;
