import { useSelector } from "react-redux"
import { decode } from "html-entities"

import ArrowTopRight from "@/assets/icons/ArrowTopRight.svg?react"
import ArrowDownLeft from "@/assets/icons/ArrowDownLeft.svg?react"
import { WidgetContainer } from ".."
import { selectCurrency } from "@/redux/user/slice"
import { CURRENCY_SYMBOL } from "@/constants"
import styles from "./TransactionsTotal.module.css"

export const TransactionsTotal = ({ className, title, amount }) => {
  const currency = useSelector(selectCurrency)
  const currencySymbol = decode(CURRENCY_SYMBOL[currency?.toUpperCase()])
  const amountParts = amount?.toFixed(3).split(".")

  return (
    <WidgetContainer className={className}>
      <div className={styles.flexWrap}>
        <div className={styles.iconWrap}>
          {title.toLowerCase() === "all expenses" ? (
            <ArrowDownLeft className={styles.icon} />
          ) : (
            <ArrowTopRight className={styles.icon} />
          )}
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>
            {`${currencySymbol}${`${amountParts[0]}.${amountParts[1].padEnd(
              3,
              0,
            )}`}`}
          </p>
        </div>
      </div>
    </WidgetContainer>
  )
}
