function CartItem({ item, quantity = 1, onRemove, onQuantityChange }) {
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-2">
          <img src={item.image} className="img-fluid" alt={item.name} />
        </div>

        <div className="col-md-7 p-3">
          <h5>{item.name}</h5>
          <p> {item.price} </p>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => onQuantityChange(Number(e.target.value))}
          />
        </div>

        <div className="col-md-3 d-flex align-items-center">
          <button className="btn btn-danger" onClick={onRemove}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
