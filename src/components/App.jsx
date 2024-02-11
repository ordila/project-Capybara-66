import { Route, Routes } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

import { Layout } from "../components"
import { PublicRoute } from "@/routes/PublicRoute"
import { LoginPage, RegisterPage, WelcomePage } from "../pages"
import Expenses from "./ExpensesCategories"

import { ROUTES } from "../constants"
import { selectIsLoggedIn, selectRefreshToken } from "@/redux/auth/slice"
import { refreshThunk } from "@/redux/auth/operations"
import { PrivateRoute } from "@/routes/PrivateRoute"

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
        <Route index element={<WelcomePage />} />
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
        <Route
          path={`/exp`}
          element={
            <PrivateRoute>
              <Expenses />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
