import React, { useEffect, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  fetchLoggedInUserInfoAsync,
  updateUserAsync,
} from "../features/user/userSlice";

function UserProfile() {
  const { userInfo } = useSelector((state) => state.user);
  const { loggedInUser } = useSelector((state) => state.auth);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const handleForm = (address) => {
    const newUser = {
      ...userInfo,
      addresses: [...userInfo.addresses],
    };
    newUser?.addresses?.splice(selectedAddressIndex, 1, address);
    dispatch(updateUserAsync(newUser));
    setSelectedAddressIndex(null);
  };

  const handleEditForm = (index) => {
    const address = userInfo.addresses[index];
    setSelectedAddressIndex(index);
    // console.log(address);
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("phone", address.phone);
    setValue("street", address.street);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("country", address.country);
    setValue("pinCode", address.pinCode);
  };

  useEffect(() => {
    dispatch(fetchLoggedInUserInfoAsync(loggedInUser.id));
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-8 sm:py-6 lg:max-w-7xl lg:px-16">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-xl font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  {!userInfo ? (
                    <UserCircleIcon
                      aria-hidden="true"
                      className="h-12 w-12 text-gray-300"
                    />
                  ) : (
                    <img
                      src="/src/assets/cat.png"
                      alt="profile-image"
                      className="h-12 w-12 text-gray-300"
                    />
                  )}

                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Change
                  </button>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    defaultValue={userInfo?.email?.split("@")[0]}
                    autoComplete="user-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          {selectedAddressIndex !== null && (
            <form
              className="lg:col-span-3"
              noValidate
              onSubmit={handleSubmit((address) => {
                handleForm(address);
                reset();
              })}
            >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-3xl font-semibold leading-7 text-gray-900">
                    Edit Address
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Edit Shipping Address , Happy Shopping and Shipping❤️
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
                      onClick={() => setSelectedAddressIndex(null)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add Address
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Addresses
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Choose from existing Addresses
          </p>

          <ul role="list" className="divide-y divide-gray-100">
            {userInfo?.addresses?.map((address, index) => (
              <li key={index} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 items-center gap-x-4">
                  <input
                    id={"address" + address.id}
                    name="addressses"
                    type="radio"
                    onChange={() => handleEditForm(index)}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor={"address" + address.id}>
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {address.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address.street} , {address.zip}, {address.city},{" "}
                        {address.state} , {address.country}
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
                <div>
                  <button
                    type="button"
                    className="text-sm font-medium leading-6 text-red-900"
                    onClick={() => handleDeleteAddress(index)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
