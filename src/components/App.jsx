import { Route, Routes } from "react-router-dom"
import { Layout, Loader } from "../components"
import { LoginPage, RegisterPage } from "../pages"
import { ROUTES } from "../constants"
import { PublicRoute } from "@/routes/PublicRoute"
import { useDispatch, useSelector } from "react-redux"
import { selectIsLoggedIn, selectRefreshToken } from "@/redux/auth/slice"
import { useEffect } from "react"
import { refreshThunk } from "@/redux/auth/operations"

const { HOME, SIGN_IN, SIGN_UP, TRANSACTION, HISTORY } = ROUTES

function App() {
  console.log("FIX3")
  const dispatch = useDispatch()
  const refreshToken = useSelector(selectRefreshToken)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  useEffect(() => {
    if (refreshToken && !isLoggedIn) dispatch(refreshThunk())
  }, [dispatch, isLoggedIn, refreshToken])

  return (
    <Routes>
      <Route path={HOME} element={<Layout />}>
        <Route index element />
        <Route
          path={SIGN_IN}
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path={SIGN_UP}
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route path={`${TRANSACTION}/:transactionsType`} element />
        <Route path={`${TRANSACTION}/${HISTORY}/:transactionsType`} element />
      </Route>
    </Routes>
  )
}

export default App
