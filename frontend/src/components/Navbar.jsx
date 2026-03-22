import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null); // kullanıcı bilgisi
  const [showLogin, setShowLogin] = useState(true); // toggle için
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // User bilgilerini al
  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data); // { _id, name, email, role }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [token]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${query}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          HardWare
        </Link>

        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>

            {token && (
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  Cart
                </Link>
              </li>
            )}
            {user?.role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin/orders">
                  Orders
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>

            {/* Admin ise Add Product */}
            {user?.role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin/add_product">
                  Add Product
                </Link>
              </li>
            )}
            {user?.role === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin/orders">
                  admin orders
                </Link>
              </li>
            )}
            {token && (
              <li className="nav-item">
                <Link className="nav-link" to="/my-orders">
                  My Orders
                </Link>
              </li>
            )}
          </ul>

          <form className="d-flex me-3" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit">
              Search
            </button>
          </form>

          {!token ? (
            <div className="d-flex align-items-center">
              {showLogin ? (
                <>
                  <Link to="/login" className="btn btn-outline-light me-2">
                    Login
                  </Link>
                  <span className="text-light">|</span>
                  <button
                    className="btn btn-link btn-sm text-warning ms-2"
                    onClick={() => setShowLogin(false)}
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signup" className="btn btn-warning me-2">
                    Sign Up
                  </Link>
                  <span className="text-light">|</span>
                  <button
                    className="btn btn-link btn-sm text-light ms-2"
                    onClick={() => setShowLogin(true)}
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="d-flex align-items-center">
              <span className="text-light me-3">
                Hello, {user?.name || "null"}
              </span>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
