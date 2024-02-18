import React from "react"
import styles from "./DecorationTab.module.css"
import MoveDecorationTab from "./MoveDecorationTab"
import ArrowTopRight from "@/assets/icons/ArrowTopRight.svg?react"

export const DecorationTab = () => {
  return (
    <div className={styles.decorationTab}>
      <div className={styles.arrowWrapper}>
        <ArrowTopRight className={styles.arrowTopRight} />
      </div>
      <div>
        <h1 className={styles.text}>Your balance</h1>
        <ul className={styles.incomeList}>
          <li className={styles.income}>&#36;{/* balance */ 637.249}</li>
          <li className={styles.icomePercentage}>
            &#43;{/* percentage */ 25.34}&#37;
          </li>
        </ul>
      </div>
    </div>
  )
}
