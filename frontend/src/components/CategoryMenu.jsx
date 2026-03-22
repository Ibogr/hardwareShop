function CategoryMenu({ categories, onSelect }) {
  return (
    <div className="list-group mb-4">
      <button
        className="list-group-item list-group-item-action"
        onClick={() => onSelect("")}
      >
        Categories
      </button>
      {categories.map((cat, index) => (
        <button
          key={index}
          className="list-group-item list-group-item-action"
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
