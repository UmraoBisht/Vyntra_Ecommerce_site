import React from "react";
import Navbar from "../components/Navbar";
import UserOrders from "../components/UserOrders";
import Footer from "./Footer";

function OrderPage() {
  return (
    <>
      <Navbar>
        <UserOrders />
      </Navbar>
      <Footer />
    </>
  );
}

export default OrderPage;
