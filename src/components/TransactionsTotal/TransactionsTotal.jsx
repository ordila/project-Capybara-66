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
  const moneyDeal = title.split(" ")[1].toLowerCase() + "s"
  return (
    <WidgetContainer className={className} moneyDeal={moneyDeal}>
      <div className={styles.flexWrap}>
        <div className={styles.iconWrap}>
          {title.toLowerCase() === "all expense" ? (
            <ArrowDownLeft className={styles.icon} />
          ) : (
            <ArrowTopRight className={styles.icon} />
          )}
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>
            {`${currencySymbol}${amount
              .toFixed()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
          </p>
        </div>
      </div>
    </WidgetContainer>
  )
}
