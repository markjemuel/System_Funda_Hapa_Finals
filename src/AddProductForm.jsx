import { useState } from "react";

function AddProductForm({ addProduct }) {
  const [form, setForm] = useState({
    image: "",
    name: "",
    category: "",
    description: "",
    specification: "",
    rating: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emptyFields = Object.values(form).some((val) => val === "");
    if (emptyFields) {
      alert("Please fill all fields!");
      return;
    }

    addProduct({
      ...form,
      id: Date.now(),
      price: Number(form.price),
      quantity: Number(form.quantity),
      rating: Number(form.rating),
    });

    setForm({
      image: "",
      name: "",
      category: "",
      description: "",
      specification: "",
      rating: "",
      price: "",
      quantity: "",
    });
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #555",
    backgroundColor: "#1c1c1e",
    color: "#f5f5f7",
    fontSize: "16px",
    boxSizing: "border-box",
  };

  return (
    <div id="add-product">
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "600px",
          margin: "20px auto",
          background: "#2c2c2e",
          padding: "24px",
          borderRadius: "12px",
          color: "#f5f5f7",
        }}
      >
        <h2>Add New Product</h2>

        <input
          type="text"
          name="image"
          placeholder="Feature Image URL"
          value={form.image}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="category"
          placeholder="Product Category"
          value={form.category}
          onChange={handleChange}
          style={inputStyle}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          style={inputStyle}
          rows={3}
        />
        <textarea
          name="specification"
          placeholder="Specification"
          value={form.specification}
          onChange={handleChange}
          style={inputStyle}
          rows={3}
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating (1-5)"
          value={form.rating}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            marginTop: "12px",
            backgroundColor: "#007aff",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: "8px",
            width: "100%",
            fontSize: "16px",
            cursor: "pointer",
            border: "none",
          }}
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProductForm;
