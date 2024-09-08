import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { singOutAsync } from "../features/auth/authSlice";

function Logout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(singOutAsync());
  });
  return <Navigate to={"/signin"} replace={true} />;
}

export default Logout;
