import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DeviceContextProvider } from "./contexts/DeviceContext.tsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <DeviceContextProvider>
      <CartProvider>
        <ToastContainer
          position="bottom-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <App />
      </CartProvider>
    </DeviceContextProvider>
  </BrowserRouter>
);
