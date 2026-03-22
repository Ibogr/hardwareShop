import { useState } from "react";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("image", image);

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/products/add`,
      {
        method: "POST",
        headers: {
          token: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("Product added!");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-center">Add Product (Admin)</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Product Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Category</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Desciption</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Product Image</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button className="btn btn-primary w-100">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
