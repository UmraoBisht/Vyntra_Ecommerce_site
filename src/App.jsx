import React, { useEffect } from "react";
import Home from "./pages/Home";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import NotFound from "./components/NotFound";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShoppingCartPage from "./pages/shoppingCartPage";
import CheckoutPage from "./pages/CheckOutPage";
import ProductViewPage from "./pages/ProductViewPage";
import Protected from "./components/auth/Protected";
import { fetchCartByUserIdAsync } from "./features/shopingCart/shoppingCartSlice";
import { useDispatch, useSelector } from "react-redux";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/signin",
    element: <SignInPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/shoppingcart",
    element: (
      <Protected>
        <ShoppingCartPage />
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <CheckoutPage />
      </Protected>
    ),
  },
  {
    path: "/productview/:id",
    element: (
      <Protected>
        <ProductViewPage />
      </Protected>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
