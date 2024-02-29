import React from "react"
import styles from "./DecorationTab.module.css"
import MoveDecorationTab from "./MoveDecorationTab"
import ArrowTopRight from "@/assets/icons/ArrowTopRight.svg?react"

export const DecorationTab = () => {
  return (
    <MoveDecorationTab>
      {(position, balance, percentage) => (
        <div
          style={{
            position: "absolute",
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
        >
          <div className={styles.decorationTab}>
            <div className={styles.arrowWrapper}>
              <ArrowTopRight className={styles.arrowTopRight} />
            </div>
            <div>
              <h1 className={styles.text}>Your balance</h1>
              <ul className={styles.incomeList}>
                <li className={styles.income}>&#36;{balance}</li>
                <li className={styles.icomePercentage}>
                  &#43;{percentage}&#37;
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </MoveDecorationTab>
  )
}
