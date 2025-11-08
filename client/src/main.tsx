import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App";
import ProductsList from "./routes/ProductsList";
import ProductDetail from "./routes/ProductDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/products/apple-iphone-17-pro" replace /> },
      { path: "mobiles", element: <ProductsList /> },
      { path: "electronics", element: <div className="p-8 text-center text-gray-500">Electronics section coming soon</div> },
      { path: "tv-appliances", element: <div className="p-8 text-center text-gray-500">TV & Appliances section coming soon</div> },
      { path: "kitchen-home", element: <div className="p-8 text-center text-gray-500">Kitchen & Home section coming soon</div> },
      { path: "health-wellness", element: <div className="p-8 text-center text-gray-500">Health & Wellness section coming soon</div> },
      { path: "fashion", element: <div className="p-8 text-center text-gray-500">Fashion section coming soon</div> },
      { path: "baby-kids", element: <div className="p-8 text-center text-gray-500">Baby & Kids section coming soon</div> },
      { path: "sports-fitness", element: <div className="p-8 text-center text-gray-500">Sports & Fitness section coming soon</div> },
      { path: "products/:slug", element: <ProductDetail /> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
