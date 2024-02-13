import React from "react"
import { NavLink } from "react-router-dom"
import styles from "./TransactionHistoryNav.module.css"

export const TransactionHistoryNav = () => {
  return (
    <div className={styles.wrapperNavigate}>
      <ul className={styles.listNavigate}>
        <li>
          <NavLink
            className={styles.linkStyleNav}
            to={"/transactions/history/expenses"}
          >
            All Expense
          </NavLink>
        </li>
        <li>
          <NavLink
            className={styles.linkStyleNav}
            to={"/transactions/history/incomes"}
          >
            All Income
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
