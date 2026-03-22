import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
