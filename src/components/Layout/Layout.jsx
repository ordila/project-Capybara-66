import { Outlet } from "react-router-dom"
import { Container, HeaderComponent, Loader } from "../index"
import { useSelector } from "react-redux"
import { selectIsLoading } from "@/redux/auth/slice"

export const Layout = () => {
  const isLoading = useSelector(selectIsLoading)

  return (
    <Container>
      <HeaderComponent />
      
      {isLoading ? <Loader /> : <Outlet />}
    </Container>
  )
}
