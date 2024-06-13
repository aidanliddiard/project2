import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/userContext";

export default function PrivateRoutes() {
  const { currentUser } = useUserContext();

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}
