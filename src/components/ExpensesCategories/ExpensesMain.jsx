import React, { useEffect, useRef } from "react"
import styles from "./styles/ExpensesMain.module.css"
import { Cell, Pie, PieChart } from "recharts"
import { useDispatch, useSelector } from "react-redux"
import { fetchTransactionsThunk } from "@/redux/transactions/operations"
import { ExpensesDonut } from "./ExpensesDonut"
import { selectTransactions } from "@/redux/transactions/slice"
import { selectIsLoading } from "@/redux/auth/slice"

const ExpensesMain = () => {
  const dispatch = useDispatch()
  const expenses = useSelector(selectTransactions)

  useEffect(() => {
    dispatch(fetchTransactionsThunk("expenses"))
  }, [dispatch])

  console.log(expenses)

  return (
    <div className={styles.container}>
      <p className={styles.text}>Expenses categories</p>
      <div className={styles.content}>
        <ExpensesDonut />
        <div className={styles.list}></div>
      </div>
    </div>
  )
}

export default ExpensesMain
