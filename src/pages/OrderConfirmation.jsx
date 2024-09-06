import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { resetCartAsync } from "../features/shopingCart/shoppingCartSlice";
import { resetCurrentOrder } from "../features/order/orderSlice";

function OrderConfirmation() {
  const { currentOrder } = useSelector((state) => state.order);
  const { loggedInUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetCartAsync(loggedInUser.id));
    // dispatch(resetCurrentOrder());
  }, [dispatch, loggedInUser]);
  return (
    <>
      {!currentOrder && <Navigate to={"/"} replace={true} />}
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-lg text-purple-600">Payment successful</p>
          <h1 className="text-3xl md:text-4xl font-bold">
            Thanks for ordering
          </h1>
          <p className="text-gray-600 mt-2">
            We appreciate your order, we’re currently processing it. So hang
            tight and we’ll send you confirmation very soon!
          </p>
        </div>

        {/* Tracking Number */}
        <div className="text-center mb-4">
          <p className="text-sm text-gray-500">Tracking number</p>
          <a href="#" className="text-blue-500 underline">
            51547878755545848512
          </a>
          <p className="text-sm text-gray-500">Order number #</p>
          <a href="#" className="text-blue-500 underline">
            {currentOrder?.id}
          </a>
        </div>

        {/* Order Items */}
        <div className="border-t border-b border-gray-200 py-4">
          {currentOrder?.cartItems?.map((orderItem, index) => (
            <div
              className="flex flex-col md:flex-row items-center mb-4 "
              key={index}
            >
              <img
                src={orderItem?.thumbnail}
                alt={orderItem?.title}
                className="w-20 h-20 rounded-md object-cover"
              />
              <div className="ml-4 mt-2 md:mt-0 text-center md:text-left">
                <h3 className="text-gray-900">{orderItem?.title}</h3>
                <p className="text-sm text-gray-500">
                  {orderItem?.description}
                </p>
              </div>
              <p className="ml-auto mt-2 md:mt-0 font-medium text-gray-900">
                ₹{(orderItem?.price * 80).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Pricing Summary */}
        <div className="mt-4">
          <div className="flex justify-between text-gray-700">
            <p>Subtotal</p>
            <p>₹{currentOrder?.totalPrice}</p>
          </div>
          {/* <div className="flex justify-between text-gray-700">
            <p>Shipping</p>
            <p>$8.00</p>
          </div>
          <div className="flex justify-between text-gray-700">
            <p>Taxes</p>
            <p>$6.40</p>
          </div> */}
          {/* <div className="flex justify-between font-bold text-gray-900 mt-2">
            <p>Total</p>
            <p>$86.40</p>
          </div> */}
        </div>

        {/* Shipping and Payment Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-gray-900">Shipping Address</h3>
            <p className="text-gray-600">
              {currentOrder?.selectedAddress?.name}
            </p>
            <p className="text-gray-600">
              {currentOrder?.selectedAddress?.street}
            </p>
            <p className="text-gray-600">
              {currentOrder?.selectedAddress?.city +
                " " +
                currentOrder?.selectedAddress?.pinCode +
                " " +
                currentOrder?.selectedAddress?.country}
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Payment Information</h3>
            <p className="text-gray-600">
              {currentOrder?.selectedPaymentMethod}
            </p>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="text-center mt-6">
          <Link to={"/"} className="text-purple-600 font-medium">
            Continue Shopping &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}

export default OrderConfirmation;
