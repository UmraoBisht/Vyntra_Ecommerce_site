import React from "react";
import ShoppingCart from "../components/ShoppingCart";
import Navbar from "../components/Navbar";

function ShoppingCartPage() {
  return (
    <>
      <Navbar>
        <ShoppingCart />
      </Navbar>
    </>
  );
}

export default ShoppingCartPage;
