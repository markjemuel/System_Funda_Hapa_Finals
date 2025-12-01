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

    // Validate all fields
    const emptyFields = Object.values(form).some((val) => val === "");
    if (emptyFields) {
      alert("Please fill all fields!");
      return;
    }

    // Add new product
    addProduct({ ...form, id: Date.now() }); // unique id
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

  return (
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
      />
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="category"
        placeholder="Product Category"
        value={form.category}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      ></textarea>
      <textarea
        name="specification"
        placeholder="Specification"
        value={form.specification}
        onChange={handleChange}
      ></textarea>
      <input
        type="number"
        name="rating"
        placeholder="Rating (1-5)"
        value={form.rating}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={form.quantity}
        onChange={handleChange}
      />
      <button
        type="submit"
        style={{
          marginTop: "12px",
          backgroundColor: "#007aff",
          color: "#fff",
          padding: "10px 16px",
          borderRadius: "8px",
        }}
      >
        Add Product
      </button>
    </form>
  );
}

export default AddProductForm;
