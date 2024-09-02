import { Link, Navigate } from "react-router-dom";
import { assets } from "../../assets/frontend_assets/assets";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUserAsync } from "../../features/auth/authSlice";
export default function SignIn() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const { error, loggedInUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      {loggedInUser && <Navigate to={"/"} replace={true} />}
      <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="my-4 text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          {error && <p className="text-red-600">{error.message}</p>}
          <form
            action="#"
            method="POST"
            className="space-y-6"
            onSubmit={handleSubmit((data) => {
              dispatch(
                checkUserAsync({ email: data.email, password: data.password })
              );
            })}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: "email is required",
                    pattern: { value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi },
                  })}
                  type="email"
                  autoComplete="current-email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors?.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex relative w-full">
                  <input
                    id="password"
                    {...register("password", {
                      required: "password is required",
                    })}
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                   <span
                    className="flex w-8 h-8 absolute cursor-pointer right-1 items-center"
                    onClick={handleShowPassword}
                  >
                    {
                      showPassword?"🙈":"👁️"
                    }
                  </span>
                </div>
                {errors?.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not have Account?{" "}
            <Link
              to={"/signup"}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              signUp for account
            </Link>
          </p>
        </div>

        <div className="hidden sm:block sm:mx-auto sm:w-full sm:max-w-sm ">
          <img
            alt="WearWell"
            src={assets.logo_dark}
            className="mx-auto h-24 w-auto"
          />
        </div>
      </div>
    </>
  );
}
