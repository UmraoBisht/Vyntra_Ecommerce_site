"use client";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartByUserIdAsync,
  removeCartItemAsync,
  updateCartAsync,
} from "../features/shopingCart/shoppingCartSlice";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createOrderAsync } from "../features/order/orderSlice";
import { updateUserAsync } from "../features/user/userSlice";

export default function CheckoutPage() {
  const { cartItems } = useSelector((state) => state.cart);
  const { loggedInUser } = useSelector((state) => state.auth);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cod");
  const { currentOrder } = useSelector((state) => state.order);
  const navigate=useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
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

  const handleAddress = (e) => {
    setSelectedAddress(loggedInUser.addresses[e.target.value]);
  };

  const handlePaymentMethod = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const handleOrder = () => {
    if (!selectedAddress || !selectedPaymentMethod) {
      alert("Please select address and payment method.");
      return;
    }
    const order = {
      user: loggedInUser,
      cartItems,
      totalPrice: (totalPrice * 80).toFixed(2),
      totalItems,
      selectedAddress,
      selectedPaymentMethod,
      status: "pending",
    };
    dispatch(createOrderAsync(order));
    navigate(`/order-confirmation/${currentOrder.id}`);
  };

  useEffect(() => {
    dispatch(fetchCartByUserIdAsync(loggedInUser.id));
  }, [dispatch]);

  return (
    <>
      {!cartItems.length && <Navigate to={"/shoppingcart"} replace={true} />}
      {/* {currentOrder && (
        <Navigate
          to={`/order-confirmation/${currentOrder.id}`}
          replace={true}
        />
      )} */}
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
            <form
              className="lg:col-span-3"
              noValidate
              onSubmit={handleSubmit((address) => {
                console.log(address);
                dispatch(
                  updateUserAsync({
                    ...loggedInUser,
                    addresses: [...loggedInUser.addresses, address],
                  })
                );
                reset();
              })}
            >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-3xl font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a shipping address where you can receive ptoducts.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Name (nickname for place eg. Home ,Office)
                      </label>
                      <div className="mt-2">
                        <input
                          id="name"
                          name="name"
                          {...register("name", {
                            required: "Name for shipping address required",
                          })}
                          type="text"
                          autoComplete="givenName"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors?.name && (
                          <p className="text-red-600">{errors.name.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          {...register("email", {
                            required: "Email required",
                          })}
                          type="email"
                          autoComplete="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors?.email && (
                          <p className="text-red-600">{errors.email.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone number
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          name="phone"
                          {...register("phone", {
                            required: "Phone required",
                          })}
                          type="tel"
                          autoComplete="tel"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors?.phone && (
                          <p className="text-red-600">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2">
                        <select
                          id="country"
                          name="country"
                          {...register("country", {
                            required: "Country required",
                          })}
                          autoComplete="country-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>India</option>
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                        {errors?.country && (
                          <p className="text-red-600">
                            {errors.country.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          id="street"
                          name="street"
                          {...register("street", {
                            required: "Street required",
                          })}
                          type="text"
                          autoComplete="street-address"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors?.street && (
                          <p className="text-red-600">
                            {errors.street.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          id="city"
                          name="city"
                          {...register("city", {
                            required: "City required",
                          })}
                          type="text"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors?.city && (
                          <p className="text-red-600">{errors.city.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          id="state"
                          name="state"
                          {...register("state", {
                            required: "State required",
                          })}
                          type="text"
                          autoComplete="address-level1"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors?.state && (
                          <p className="text-red-600">{errors.state.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pinCode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          id="pinCode"
                          name="pinCode"
                          {...register("pinCode", {
                            required: "Pin code required",
                          })}
                          type="text"
                          autoComplete="pin-code"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors?.pinCode && (
                          <p className="text-red-600">
                            {errors.pinCode.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      className="text-sm font-semibold leading-6 text-gray-900"
                      onClick={() => reset()}
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add Address
                    </button>
                  </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Addresses
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose from existing Addresses
                  </p>

                  <ul role="list" className="divide-y divide-gray-100">
                    {loggedInUser.addresses.map((address, index) => (
                      <li
                        key={index}
                        className="flex justify-between gap-x-6 py-5"
                      >
                        <div className="flex min-w-0 items-center gap-x-4">
                          <input
                            id={"address" + address.id}
                            name="addressses"
                            type="radio"
                            onChange={handleAddress}
                            value={index}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label htmlFor={"address" + address.id}>
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                {address.name}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                {address.street} , {address.zip}, {address.city}
                                , {address.state} , {address.country}
                              </p>
                            </div>
                          </label>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-900">
                            {address.email}
                          </p>
                          <p className="text-sm leading-6 text-gray-900">
                            {address?.phone}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="text-base font-semibold leading-7 text-gray-900">
                        Payment methods
                      </legend>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        choose one
                      </p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            id="cod"
                            name="paymentMethods"
                            type="radio"
                            onChange={handlePaymentMethod}
                            value={"cod"}
                            checked={selectedPaymentMethod === "cod"}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="cod"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cash on Delivery (COD)
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="upi"
                            name="paymentMethods"
                            type="radio"
                            onChange={handlePaymentMethod}
                            value={"upi"}
                            checked={selectedPaymentMethod === "upi"}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="upi"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            UPI
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
            <div className="bg-slate-100 lg:col-span-2">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mt-6">
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
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
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
                                      <Link to={`/productview${cartItem.id}`}>
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
                          <p>{totalItems}</p>
                        </div>
                        <div className="flex justify-between py-2 text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>₹{(totalPrice * 80).toFixed(2)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <button
                            onClick={handleOrder}
                            className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            Pay Now
                          </button>
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
          </div>
        </div>
      </div>
    </>
  );
}
