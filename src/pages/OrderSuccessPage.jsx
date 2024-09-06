import React from "react";

function OrderSuccessPage() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Order Details */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Order #54879</h2>
        <a href="#" className="text-blue-600 underline">
          View invoice &rarr;
        </a>
      </div>

      {/* Order Item 1 */}
      <div className="bg-white shadow-sm rounded-lg p-6 mb-6 border-2">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Image and Details */}
          <div className="sm:flex">
            <img
              src="https://via.placeholder.com/100"
              alt="Nomad Tumbler"
              className="sm:w-24 sm:h-24 w-full h-full object-cover rounded-lg"
            />
            <div className="sm:ml-4 mt-2 sm:mt-0">
              <h3 className="font-semibold text-gray-900">Nomad Tumbler</h3>
              <p className="text-gray-600">$35.00</p>
              <p className="text-sm text-gray-500 mt-2">
                This durable and portable insulated tumbler will keep your
                beverage at the perfect temperature during your next adventure.
              </p>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="mt-4 md:mt-2 md:text-right">
            <h4 className="font-semibold text-gray-900">Delivery address</h4>
            <p className="text-gray-600">Floyd Miles</p>
            <p className="text-gray-600">7363 Cynthia Pass</p>
            <p className="text-gray-600">Toronto, ON N3Y 4H8</p>

            <h4 className="font-semibold text-gray-900 mt-4">
              Shipping updates
            </h4>
            <p className="text-gray-600">f•••@example.com</p>
            <p className="text-gray-600">1••••••••40</p>
            <a href="#" className="text-blue-600 underline">
              Edit
            </a>
          </div>
        </div>

        {/* Order Progress */}
        {/* <div className="mt-6">
          <p className="text-sm text-gray-500">
            Preparing to ship on March 24, 2021
          </p>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
            <div className="bg-purple-600 h-1.5 rounded-full w-1/2"></div>
          </div>
          <div className="flex justify-between text-sm mt-2 text-purple-600">
            <p>Order placed</p>
            <p>Processing</p>
            <p>Shipped</p>
            <p>Delivered</p>
          </div>
        </div> */}
      </div>

      {/* Order Item 2 */}
      <div className="bg-white shadow-sm rounded-lg p-6 mb-6 border-2">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Image and Details */}
          <div className="sm:flex">
            <img
              src="https://via.placeholder.com/100"
              alt="Minimalist Wristwatch"
              className="sm:w-24 sm:h-24 w-full h-full object-cover rounded-lg"
            />
            <div className="sm:ml-4 mt-2 sm:mt-0">
              <h3 className="font-semibold text-gray-900">
                Minimalist Wristwatch
              </h3>
              <p className="text-gray-600">$149.00</p>
              <p className="text-sm text-gray-500 mt-2">
                This contemporary wristwatch has a clean, minimalist look and
                high quality components.
              </p>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="mt-4 md:mt-0 md:text-right">
            <h4 className="font-semibold text-gray-900">Delivery address</h4>
            <p className="text-gray-600">Floyd Miles</p>
            <p className="text-gray-600">7363 Cynthia Pass</p>
            <p className="text-gray-600">Toronto, ON N3Y 4H8</p>

            <h4 className="font-semibold text-gray-900 mt-4">
              Shipping updates
            </h4>
            <p className="text-gray-600">f•••@example.com</p>
            <p className="text-gray-600">1••••••••40</p>
            <a href="#" className="text-blue-600 underline">
              Edit
            </a>
          </div>
        </div>

        {/* Order Progress */}
        {/* <div className="mt-6">
          <p className="text-sm text-gray-500">Shipped on March 23, 2021</p>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
            <div className="bg-purple-600 h-1.5 rounded-full w-full"></div>
          </div>
          <div className="flex justify-between text-sm mt-2 text-purple-600">
            <p>Order placed</p>
            <p>Processing</p>
            <p>Shipped</p>
            <p>Delivered</p>
          </div>
        </div> */}
      </div>

      {/* Billing Information */}
      <div className="bg-gray-100 shadow-sm rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Billing Address */}
          <div>
            <h3 className="font-semibold text-gray-900">Billing address</h3>
            <p className="text-gray-600">Floyd Miles</p>
            <p className="text-gray-600">7363 Cynthia Pass</p>
            <p className="text-gray-600">Toronto, ON N3Y 4H8</p>
          </div>

          {/* Payment Information */}
          <div>
            <h3 className="font-semibold text-gray-900">Payment information</h3>
            <p className="text-gray-600">VISA ending with 4242</p>
            <p className="text-gray-600">Expires 02/24</p>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 ">
          <div className="flex justify-between text-gray-600">
            <p>Subtotal</p>
            <p>$72</p>
          </div>
          <div className="flex justify-between text-gray-600">
            <p>Shipping</p>
            <p>$5</p>
          </div>
          <div className="flex justify-between text-gray-600">
            <p>Tax</p>
            <p>$6.16</p>
          </div>
          <div className="flex justify-between text-gray-900 font-semibold mt-2">
            <p>Order total</p>
            <p>$83.16</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccessPage;
