import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import AddProduct from "./pages/AddProduct";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminOrders from "./pages/AdminOrders";
import UserOrders from "./pages/UserOrders.jsx";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/product/:id" element={<ProductDetail />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/admin/add_product" element={<AddProduct />} />

        <Route path="/admin/orders" element={<AdminOrders />} />

        <Route path="/my-orders" element={<UserOrders />} />

        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
