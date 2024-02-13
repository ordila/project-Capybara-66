import React from "react"
import styles from "./HeaderComponent.module.css"
import LogoIcon from "@/assets/icons/Logo.svg?react"
import { BurgerComponent } from "../BurgerComponent/BurgerComponent"
import classNames from "classnames"
import { TransactionHistoryNav } from "../TransactionHistoryNav/TransactionHistoryNav"
import { UserBarBtn } from "../UserBarBtn/UserBarBtn"
import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "@/redux/auth/slice"
import { selectName } from "@/redux/user/slice"
import { Link } from "react-router-dom"

export const HeaderComponent = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const name = useSelector(selectName)
  const classNamess = classNames(styles.sectionStyle, {
    [styles.stylesIsLogin]: isLoggedIn,
  })
  return (
    <section className={classNamess}>
      <div>
        <Link className={styles.wrapperLogo} to='/'>
          <LogoIcon className={styles.logo} />
          <h2 className={styles.titleLogo}>ExpenseTracker</h2>
        </Link>
      </div>
      {isLoggedIn && <TransactionHistoryNav />}
      {isLoggedIn && <UserBarBtn />}
      {isLoggedIn && <BurgerComponent />}
    </section>
  )
}
