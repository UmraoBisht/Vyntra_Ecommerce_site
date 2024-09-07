import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrdersAsync } from "../features/user/userSlice";
import { Link } from "react-router-dom";

function UserOrders() {
  const { loggedInUser } = useSelector((state) => state.auth);
  const { userOrders } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserOrdersAsync(loggedInUser.id));
  }, [dispatch]);

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-0 ">
            <div className="mt-2 flex justify-end items-center text-sm text-gray-500 py-4">
              <p>
                or{" "}
                <Link
                  to={"/"}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">My Orders</h1>
            <div className="flex flex-col gap-8 ">
              {userOrders.map((order) => (
                <div className="bg-gray-100 rounded-lg py-6 px-4" key={order.id}>
                  <div>
                    <div>
                      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Order Id#{order.id}
                      </h1>
                      <h1 className="text-lg mt-2 font-semibold tracking-tight text-gray-600">
                        Order Status: {order.status}
                      </h1>
                      {order.cartItems.length === 0 ? (
                        <div className="flex flex-col gap-3 items-center h-[60vh] justify-center">
                          <p className="text-sm text-gray-500">
                            Your orders is empty. order items to see.
                          </p>
                          <img
                            src="src/assets/shopping.png"
                            alt="shopping-cart-image"
                            className="min-w-40 max-h-40"
                          />
                          <Link
                            to={"/"}
                            className="py-2 flex items-center justify-center px-2.5 gap-1 w-fit rounded-md bg-blue-700 text-white"
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </Link>
                        </div>
                      ) : (
                        <div>
                          <div className="flow-root py-6">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {order.cartItems.map((cartItem) => (
                                <li
                                  key={cartItem.id}
                                  className="flex py-6 px-4 sm:px-6"
                                >
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      alt={cartItem.title}
                                      src={cartItem.thumbnail}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col ">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <Link
                                            to={`/productview/${cartItem.id}`}
                                          >
                                            {cartItem.title}
                                          </Link>
                                        </h3>
                                        <p className="ml-4">
                                          ₹
                                          {(
                                            cartItem.price *
                                            cartItem.quantity *
                                            80
                                          ).toFixed(2)}
                                        </p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {cartItem.brand}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div>Qty: {cartItem.quantity}</div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex justify-between py-2 text-base font-medium text-gray-900">
                              <p>Total Items</p>
                              <p>{order.totalItems} items</p>
                            </div>
                            <div className="flex justify-between py-2 text-base font-medium text-gray-900">
                              <p>Subtotal</p>
                              <p>₹{(order.totalPrice * 1).toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserOrders;
