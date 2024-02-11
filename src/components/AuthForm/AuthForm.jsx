import { Link, useLocation } from "react-router-dom";

import styles from "./AuthForm.module.css";
import { Fragment, useState } from "react";

import OpenEye from "../../../src/assets/icons/OpenEye.svg?react";
import ClosedEye from "../../../src/assets/icons/ClosedEye.svg?react";
import ErrorIcon from "../../../src/assets/icons/ErrorIcon.svg?react";
import SuccessIcon from "../../../src/assets/icons/SuccessIcon.svg?react";

export const AuthForm = ({
  onSumbit,
  formData,
  buttonText,
  errors,
  register,
  navigation,
}) => {
  const location = useLocation();
  const getClassNameDivWrapper = () => {
    return location.pathname === "/login"
      ? styles.inputsWrapperLogin
      : styles.inputsWrapperRegister;
  };
  const classNamesDiv = getClassNameDivWrapper();
  const getClassNameBtn = () => {
    return location.pathname === "/login"
      ? styles.btnLogin
      : styles.btnLRegister;
  };
  const classNamesBtn = getClassNameBtn();

  const [showPass, setShowPass] = useState(false);
  const passVisibility = () => {
    setShowPass((prevState) => !prevState);
  };

  return (
    <form onSubmit={onSumbit} className={styles.form}>
      <div className={classNamesDiv}>
        {formData?.map((input) => (
          <Fragment key={input.name}>
            <div className={styles.divWrapperRelative}>
              <input
                {...register(input.name)}
                placeholder={input.placeholder}
                className={styles.input}
                type={
                  input.name === "password"
                    ? showPass
                      ? "text"
                      : "password"
                    : input.type
                }
                name={input.name}
              />
              {input.name === "password" && (
                <button
                  type="button"
                  className={styles.eyeIconBtn}
                  onClick={passVisibility}
                >
                  {showPass ? (
                    <OpenEye className={styles.eyeIcon} />
                  ) : (
                    <ClosedEye className={styles.eyeIcon} />
                  )}
                </button>
              )}
              {errors[input.name] && (
                <p className={styles.errors}>{errors[input.name].message}</p>
              )}
            </div>
          </Fragment>
        ))}
      </div>
      <button className={classNamesBtn} type="submit">
        {buttonText}
      </button>
      <p className={styles.text}>
        {navigation.text}{" "}
        <Link to={navigation.route} className={styles.link}>
          {navigation.textLink}
        </Link>
      </p>
    </form>
  );
};
