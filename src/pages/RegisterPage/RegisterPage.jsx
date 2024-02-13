import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

import { useForm } from "react-hook-form"

import { toast } from "react-toastify"

import { AuthForm, BgImageWrapper } from "../../components/index"

import { registerThunk } from "@/redux/auth/operations"
import { selectError } from "@/redux/auth/slice"
import styles from "./RegisterPage.module.css"
import { useNavigate } from "react-router"
import { useWindowSizeHook } from "@/hooks/WindowSizeHook"

export const RegisterPage = () => {
  const dispatch = useDispatch()
  const error = useSelector(selectError)
  const navigate = useNavigate()
  const { windowSize } = useWindowSizeHook()

  const formData = [
    { name: "name", type: "text", placeholder: "Name" },
    { name: "email", type: "email", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Password" },
  ]

  const { register } = useForm({})

  const onSubmit = async data => {
    try {
      await dispatch(registerThunk(data))
      navigate("/login")
    } catch (error) {
      toast.error(`Something went wrong, please try again`)
    }
  }

  useEffect(() => {
    if (error) toast.error(error)
  }, [error])

  const navigation = {
    text: "Already have account?",
    textLink: "Sign In",
    route: "/login",
  }

  return (
    <>
      <div className={styles.wrapperMain}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Sign Up</h1>
          <p className={styles.description}>
            Step into a world of hassle-free expense{" "}
            <span className={styles.descriptionBreak}>
              management! Your journey towards financial mastery begins here.
            </span>
          </p>
          <AuthForm
            formData={formData}
            buttonText='Sign Up'
            onSubmit={onSubmit}
            register={register}
            navigation={navigation}
          />
        </div>
      </div>
      {windowSize.innerWidth >= 1440 && <BgImageWrapper />}
    </>
  )
}
