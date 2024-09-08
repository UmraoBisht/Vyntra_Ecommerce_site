import React, { useEffect } from "react";
import Home from "./pages/Home";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductViewPage from "./pages/ProductViewPage";
import Protected from "./components/auth/Protected";
import { fetchCartByUserIdAsync } from "./features/shopingCart/shoppingCartSlice";
import { useDispatch, useSelector } from "react-redux";
import PageNotFound from "./pages/404";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderPage from "./pages/OrderPage";
import ProfilePage from "./pages/ProfilePage";
import Logout from "./components/Logout";
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
    path: "/logout",
    element: <Logout />,
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
    path: "/productview/:id",
    element: (
      <Protected>
        <ProductViewPage />
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
    path: "/order-success",
    element: (
      <Protected>
        <OrderSuccessPage />
      </Protected>
    ),
  },
  {
    path: "/order-confirmation/:id",
    element: (
      <Protected>
        <OrderConfirmation />
      </Protected>
    ),
  },
  {
    path: "/orders",
    element: (
      <Protected>
        <OrderPage />
      </Protected>
    ),
  },
  {
    path: "/orders/:id",
    element: (
      <Protected>
        <PageNotFound />
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <ProfilePage />
      </Protected>
    ),
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
