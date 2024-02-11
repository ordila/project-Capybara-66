import { selectIsLoggedIn } from "@/redux/auth/slice"
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

export const PublicRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const location = useLocation()

  return isLoggedIn ? <Navigate to={location.state?.from || "/"} /> : children
}
