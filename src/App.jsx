import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Card from "./card";
import ProductDetail from "./productsDetails";
import AddProductForm from "./AddProductForm";
import "./app.css";
import { iphoneProducts, ipadProducts, macbookProducts } from "./products";

const formatPHP = (amount) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
};

const initialProducts = [
  { title: "Iphone", items: iphoneProducts },
  { title: "Ipad", items: ipadProducts },
  { title: "MacBook", items: macbookProducts },
];

function App() {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState(initialProducts);

  const addProduct = (newProduct) => {
    setProducts((prev) => {
      const categoryExists = prev.some(
        (cat) => cat.title === newProduct.category
      );

      if (categoryExists) {
        return prev.map((cat) =>
          cat.title === newProduct.category
            ? { ...cat, items: [...cat.items, newProduct] }
            : cat
        );
      } else {
        return [...prev, { title: newProduct.category, items: [newProduct] }];
      }
    });
  };

  const allProductsFlat = products.flatMap((cat) => cat.items);

  const filteredCards = products
    .filter((cat) => !categoryFilter || cat.title === categoryFilter)
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  const overallTotal = products.reduce(
    (total, cat) =>
      total + cat.items.reduce((sub, p) => sub + p.price * p.quantity, 0),
    0
  );

  return (
    <Router>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          background: "#3f3f3fff",
          backdropFilter: "blur(70px)",
          padding: "14px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 1000,
          boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
        }}
      >
        <Link
          to="/"
          style={{
            color: "#fff",
            fontSize: "22px",
            fontWeight: "600",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <img
            src="/images/apple_logo.png"
            alt="Apple"
            style={{ width: "80px", height: "80px" }}
          />
          Apple Products
        </Link>

        <a
          href="#add-product"
          style={{
            color: "#007aff",
            fontSize: "18px",
            fontWeight: "500",
            marginRight: "50px",
          }}
        >
          Add Product
        </a>
      </nav>

      <div
        style={{
          padding: "100px 24px 24px",
          minHeight: "100vh",
          backgroundColor: "#252525",
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="filter-search-container">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {products.map((cat) => (
                      <option key={cat.title} value={cat.title}>
                        {cat.title}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    placeholder="Search by product name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {filteredCards.map((cat) => (
                  <Card
                    key={cat.title}
                    title={cat.title}
                    products={cat.items}
                    formatPHP={formatPHP}
                  />
                ))}

                <AddProductForm addProduct={addProduct} />

                <h2 style={{ textAlign: "center", marginTop: "24px" }}>
                  Overall Total: {formatPHP(overallTotal)}
                </h2>
              </>
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProductDetail
                allProducts={allProductsFlat}
                formatPHP={formatPHP}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
