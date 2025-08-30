import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Products from "./pages/Products.jsx";
import { ProductProvider } from "./contexts/ProductContext.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/products", element: <Products /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProductProvider>
      <RouterProvider router={router} />
    </ProductProvider>
  </StrictMode>
);
