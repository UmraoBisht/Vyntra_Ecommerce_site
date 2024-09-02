import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  const { loggedInUser } = useSelector((state) => state.auth);

  return (
    <>{loggedInUser ? children : <Navigate to="/signin" replace={true} />}</>
  );
}

export default Protected;
