import { selectIsLoggedIn } from "@/redux/auth/slice"
import { useSelector } from "react-redux"
import React from "react"
import { Navigate, useLocation } from "react-router-dom"

export const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const location = useLocation()

  return isLoggedIn ? (
    children
  ) : (
    <Navigate state={{ from: location }} to={"/login"} />
  )
}
