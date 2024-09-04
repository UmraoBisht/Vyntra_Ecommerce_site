import { Link } from "react-router-dom";
import { ShoppingCartIcon, StarIcon } from "@heroicons/react/20/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync } from "../features/shopingCart/shoppingCartSlice";

export default function ProductList({ products }) {
  const { loggedInUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(
      addToCartAsync({ ...product, quantity: 1, user: loggedInUser.id })
    );
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-3 lg:max-w-7xl lg:px-8">
        <div className=" grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  alt={product.title}
                  src={product.thumbnail}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link to={`/productview/${product.id}`}>
                      {product.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    <StarIcon className="w-5 h-5 inline" />
                    <span className="align-bottom"> {product.rating}</span>
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    ₹
                    {Math.round(
                      (product.price -
                        (product.price * product.discountPercentage) / 100) *
                        80
                    )}
                  </p>
                  <p className="text-sm font-medium text-gray-700 line-through">
                    ₹{Math.round(product.price * 80)}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <button>
                  <HeartIcon className="w-5 h-5 text-red-500 inline" />
                </button>
                <button
                  className="py-2 flex items-center justify-center px-2.5 gap-1 w-fit rounded-md bg-blue-700 text-white"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCartIcon className="w-5 h-5 inline text-white" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
