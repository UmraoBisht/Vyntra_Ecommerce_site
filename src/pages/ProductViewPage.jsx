import React from "react";
import Navbar from "../components/Navbar";
import ProductView from "../components/ProductView";

function ProductViewPage() {
  return (
    <>
      <Navbar>
        <ProductView />
      </Navbar>
    </>
  );
}

export default ProductViewPage;
