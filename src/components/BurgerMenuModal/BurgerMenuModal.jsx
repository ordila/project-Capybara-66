import styles from "./BurgerMenuModal.module.css"
import CloseIcon from "@/assets/icons/Close.svg?react"
import { UserBarBtnBox } from "../UserBarBtnBox/UserBarBtnBox"
import { NavLink, useNavigate } from "react-router-dom"

export const BurgerMenuModal = ({
  isOpened,
  onClose,
  setIsVisibleProfile,
  setIsVisibleLogout,
}) => {
  const navigate = useNavigate()

  const handleNavigate = to => {
    onClose(true)
    navigate(to)
  }
  if (!isOpened) return null
  return (
    <>
      <div className={styles.specialBox}>
        <div className={styles.backDrop} onClick={() => onClose(true)}></div>
        <div
          className={isOpened ? `${styles.wrapperModal} ${styles.active}` : ""}
        >
          <UserBarBtnBox
            onClose={onClose}
            setIsVisibleLogout={setIsVisibleLogout}
            setIsVisibleProfile={setIsVisibleProfile}
          />
          <button className={styles.closeButton} onClick={() => onClose(true)}>
            <CloseIcon className={styles.closeSvg} />
          </button>
          <ul className={styles.buttonList}>
            <NavLink
              className={styles.expenseButton}
              to='/transactions/history/expenses'
              onClick={() => handleNavigate("/transactions/history/expenses")}
            >
              All Expense
            </NavLink>
            <NavLink
              className={styles.incomeButton}
              to='/transactions/history/incomes'
              onClick={() => handleNavigate("/transactions/history/incomes")}
            >
              All Income
            </NavLink>
          </ul>
        </div>
      </div>
    </>
  )
}
