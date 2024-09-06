"use client";
import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartByUserIdAsync,
  removeCartItemAsync,
  updateCartAsync,
} from "../features/shopingCart/shoppingCartSlice";
import { useEffect } from "react";

export default function ShoppingCart() {
  const { cartItems } = useSelector((state) => state.cart);
  const { loggedInUser } = useSelector((state) => state.auth);
  const totalPrice = cartItems.reduce(
    (amount, cartItem) => cartItem.price * cartItem.quantity + amount,
    0
  );
  const totalItems = cartItems.reduce(
    (total, cartItem) => cartItem.quantity + total,
    0
  );

  const dispatch = useDispatch();
  const handleQuantity = (e, cartItem) => {
    dispatch(
      updateCartAsync({
        ...cartItem,
        quantity: +e.target.textContent,
      })
    );
  };

  const handleRemoveItem = (item) => {
    dispatch(removeCartItemAsync(item.id));
  };

  useEffect(() => {
    dispatch(fetchCartByUserIdAsync(loggedInUser.id));
  }, [dispatch]);

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-14">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Shopping Cart
            </h1>
            {cartItems.length === 0 ? (
              <div className="flex flex-col gap-3 items-center h-[60vh] justify-center">
                <p className="text-sm text-gray-500">
                  Your shopping cart is empty. Add items to continue.
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
              <>
                <div className="flow-root py-6">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {cartItems.map((cartItem) => (
                      <li key={cartItem.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            alt={cartItem.title}
                            src={cartItem.thumbnail}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <Link to={`/productview/${cartItem.id}`}>
                                  {cartItem.title}
                                </Link>
                              </h3>
                              <p className="ml-4">
                                ₹
                                {
                                  (cartItem.price * cartItem.quantity * 80).toFixed(2)
                                }
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {cartItem.brand}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div>
                              Qty{" "}
                              <Menu
                                as="div"
                                className="relative inline-block text-left"
                              >
                                <div>
                                  <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                    {cartItem.quantity}
                                    <ChevronDownIcon
                                      aria-hidden="true"
                                      className="-mr-1 h-5 w-5 text-gray-400"
                                    />
                                  </MenuButton>
                                </div>

                                <MenuItems
                                  transition
                                  className="absolute right-0 z-10 mt-2 w-fit origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                  <div className="py-1">
                                    <MenuItem>
                                      <p
                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                        onClick={(e) =>
                                          handleQuantity(e, cartItem)
                                        }
                                      >
                                        1
                                      </p>
                                    </MenuItem>
                                    <MenuItem>
                                      <p
                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                        onClick={(e) =>
                                          handleQuantity(e, cartItem)
                                        }
                                      >
                                        2
                                      </p>
                                    </MenuItem>
                                    <MenuItem>
                                      <p
                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                        onClick={(e) =>
                                          handleQuantity(e, cartItem)
                                        }
                                      >
                                        3
                                      </p>
                                    </MenuItem>
                                    <MenuItem>
                                      <p
                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                        onClick={(e) =>
                                          handleQuantity(e, cartItem)
                                        }
                                      >
                                        4
                                      </p>
                                    </MenuItem>
                                    <MenuItem>
                                      <p
                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                        onClick={(e) =>
                                          handleQuantity(e, cartItem)
                                        }
                                      >
                                        5
                                      </p>
                                    </MenuItem>
                                  </div>
                                </MenuItems>
                              </Menu>
                            </div>

                            <div className="flex">
                              <button
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                onClick={() => handleRemoveItem(cartItem)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between py-2 text-base font-medium text-gray-900">
                    <p>Total Items</p>
                    <p>{totalItems} items</p>
                  </div>
                  <div className="flex justify-between py-2 text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>₹{(totalPrice * 80).toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <Link
                      to={"/checkout"}
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Checkout
                    </Link>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
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
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
