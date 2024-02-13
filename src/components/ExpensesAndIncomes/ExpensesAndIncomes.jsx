import { useSelector } from "react-redux"
import { TransactionsTotal } from ".."
import { selectTransactionsTotal } from "@/redux/transactions/slice"

import styles from "@/pages/TarnsactionsHistoryPage/TarnsactionsHistoryPage.module.css"

export const ExpensesAndIncomes = () => {
  const { expenses, incomes } = useSelector(selectTransactionsTotal)

  return (
    <div className={styles.totalStatistics}>
      <TransactionsTotal
        title='All Income'
        amount={incomes}
        className={styles.statisticsBlock}
      />
      <TransactionsTotal
        title='All Expense'
        amount={expenses}
        className={styles.statisticsBlock}
      />
    </div>
  )
}
