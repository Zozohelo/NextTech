import { Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import Register from "./components/Account/Register";
import Login from "./components/Account/Login";
import AllProduct from "./components/Products/AllProduct";
import Cart from "./components/Cart";
import ProfileSettings from "./components/Account/ProfileSettings";
import Product from "./components/Products/Product";
import Orders from "./components/Account/Orders";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<AllProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<ProfileSettings />} />
        <Route path="/device/:id" element={<Product />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </>
  );
}

export default App;
