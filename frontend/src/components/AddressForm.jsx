import { useState } from "react";

function AddressForm({ onSubmit, disabled }) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    eircode: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (disabled) return;

    const isEmpty = Object.values(formData).some((v) => v.trim() === "");
    if (isEmpty) {
      alert("Please fill all fields");
      return;
    }

    // Kullanıcının girdiği adresi parent'a (Cart) gönder
    onSubmit(formData);

    // Formu temizleyelim
    setFormData({
      fullName: "",
      phone: "",
      address: "",
      city: "",
      eircode: "",
    });
  };

  return (
    <div className="card p-4">
      <h4 className="mb-3">Delivery Address</h4>

      {disabled && (
        <p className="text-danger">Cart is empty. Add products first.</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            className="form-control"
            value={formData.fullName}
            onChange={handleChange}
            disabled={disabled}
            required
          />
        </div>

        <div className="mb-3">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            disabled={disabled}
            required
          />
        </div>

        <div className="mb-3">
          <label>Address</label>
          <input
            type="text"
            name="address"
            className="form-control"
            value={formData.address}
            onChange={handleChange}
            disabled={disabled}
            required
          />
        </div>

        <div className="mb-3">
          <label>City</label>
          <input
            type="text"
            name="city"
            className="form-control"
            value={formData.city}
            onChange={handleChange}
            disabled={disabled}
            required
          />
        </div>

        <div className="mb-3">
          <label>Eircode</label>
          <input
            type="text"
            name="eircode"
            className="form-control"
            value={formData.eircode}
            onChange={handleChange}
            disabled={disabled}
            required
          />
        </div>

        <button className="btn btn-success w-100" disabled={disabled}>
          Complete Purchase
        </button>
      </form>
    </div>
  );
}

export default AddressForm;
