import styles from "./TransactionsTotalAmount.module.css";
import ArrowTopRight from "../../../src/assets/icons/ArrowTopRight.svg?react";
import selectTransactionsTotal from "../../redux/transactions/slice";
 
  
export const TransactionsTotalAmount = ({ selectTransactionsTotal }) => {
  const { incomes, expenses } = selectTransactionsTotal;
  
  return (
    <div className={styles.block}>
      <div className={styles.total_div}>
        <div className={styles.box_svg}><ArrowTopRight className={styles.svg_income} /></div>
      <div className={styles.block_text}>
        <h3 className={styles.income_text}>Total Income</h3>
        <p className={styles.income_money}>{incomes}</p>
      </div>
    </div>,
    <div className={styles.total_div}>
        <div className={styles.box_svg}><ArrowTopRight className={styles.svg_expense} /></div>
        <div className={styles.block_text}> 
          <h3 className={styles.income_text}>Total Expense</h3>
          <p className={styles.income_money}>{expenses}</p>
        </div> 
      </div>
      </div>
  )
};