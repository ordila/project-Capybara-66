import { Link, useLocation } from "react-router-dom"

import styles from "./AuthForm.module.css"
import { Fragment, useState } from "react"

import OpenEye from "@/assets/icons/OpenEye.svg?react"
import ClosedEye from "@/assets/icons/ClosedEye.svg?react"
import ErrorIcon from "@/assets/icons/ErrorIcon.svg?react"
import SuccessIcon from "@/assets/icons/SuccessIcon.svg?react"
import { useForm } from "react-hook-form"

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

export const AuthForm = ({ onSubmit, formData, buttonText, navigation }) => {
  const location = useLocation()
  const getClassNameDivWrapper = () => {
    return location.pathname === "/login"
      ? styles.inputsWrapperLogin
      : styles.inputsWrapperRegister
  }
  const classNamesDiv = getClassNameDivWrapper()
  const getClassNameBtn = () => {
    return location.pathname === "/login"
      ? styles.btnLogin
      : styles.btnLRegister
  }
  const classNamesBtn = getClassNameBtn()

  const [showPass, setShowPass] = useState(false)
  const passVisibility = () => {
    setShowPass(prevState => !prevState)
  }

  const [touched, setTouched] = useState({})

  const handleInputChange = (inputName, event) => {
    trigger(event.target.name)
    formRegister(inputName).onChange(event)
    setTouched(prev => ({ ...prev, [inputName]: true }))
    const value = event.target.value
  }
  const getClassNameInput = inputName => {
    if (errors[inputName]) {
      return styles.error
    } else if (touched[inputName] && !errors[inputName]) {
      return styles.success
    }
    return styles.input
  }

  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  })

  const registerSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  })
  const {
    handleSubmit,
    register: formRegister,
    trigger,
    formState: { errors },
  } = useForm({
    resolver:
      location.pathname === "/login"
        ? yupResolver(loginSchema)
        : yupResolver(registerSchema),
  })
  const handleFormSubmit = data => {
    onSubmit(data)
  }
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      <div className={classNamesDiv}>
        {formData?.map(input => (
          <Fragment key={input.name}>
            <div className={styles.divWrapperRelative}>
              <input
                {...formRegister(input.name)}
                placeholder={input.placeholder}
                className={`${styles.input} ${getClassNameInput(input.name)}`}
                type={
                  input.name === "password"
                    ? showPass
                      ? "text"
                      : "password"
                    : input.type
                }
                name={input.name}
                onChange={event => {
                  handleInputChange(input.name, event)
                }}
                onInput={event => {
                  handleInputChange(input.name, event)
                }}
              />
              {input.name === "password" && (
                <button
                  type='button'
                  className={styles.eyeIconBtn}
                  onClick={passVisibility}
                >
                  {errors[input.name] ? (
                    <ErrorIcon className={styles.eyeIcon} />
                  ) : touched[input.name] && !errors[input.name] ? (
                    <SuccessIcon className={styles.eyeIcon} />
                  ) : showPass ? (
                    <OpenEye className={styles.eyeIcon} />
                  ) : (
                    <ClosedEye className={styles.eyeIcon} />
                  )}
                </button>
              )}
              {errors[input.name] ? (
                <p className={styles.errors}>{errors[input.name].message}</p>
              ) : touched[input.name] && !errors[input.name] ? (
                input.name === "password" ? (
                  <p className={styles.valid}>Password is secure</p>
                ) : null
              ) : (
                ""
              )}
            </div>
          </Fragment>
        ))}
      </div>
      <button className={classNamesBtn} type='submit'>
        {buttonText}
      </button>
      <p className={styles.text}>
        {navigation.text}{" "}
        <Link to={navigation.route} className={styles.link}>
          {navigation.textLink}
        </Link>
      </p>
    </form>
  )
}
