import { useParams, Link } from "react-router-dom";
import { iphoneProducts, ipadProducts, macbookProducts } from "./products";
import "./productsDetails.css"; // updated import

const allProducts = [...iphoneProducts, ...ipadProducts, ...macbookProducts];

function ProductDetail() {
  const { id } = useParams();
  const product = allProducts.find((p) => p.id === Number(id));

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="product-detail-container">
      <Link to="/">← Back to Inventory</Link>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
      <p>
        <strong>Description:</strong>{" "}
        {product.description || "No description available."}
      </p>
    </div>
  );
}

export default ProductDetail;
