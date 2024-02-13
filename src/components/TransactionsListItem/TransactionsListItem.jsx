import { format } from "date-fns"
import { useSelector } from "react-redux"
import clsx from "clsx"

import { selectCurrency } from "@/redux/user/slice"

import styles from "./TransactionsListItem.module.css"
import EditIcon from "@/assets/icons/EditPensil.svg?react"
import DeleteIcon from "@/assets/icons/DeleteTrash.svg?react"
import { useWindowSizeHook } from "@/hooks/WindowSizeHook"

const trim = (text, windowWidth) => {
  const limit = windowWidth >= 1440 ? 12 : 9

  if (text.length > limit) {
    return `${text.slice(0, limit - 3)}...`
  }

  return text
}

export const TransactionsListItem = ({ transaction }) => {
  const currency = useSelector(selectCurrency)
  const { windowSize } = useWindowSizeHook()

  return (
    <tr>
      <td>
        {windowSize.innerWidth < 1440
          ? trim(transaction.category.categoryName, windowSize.innerWidth)
          : transaction.category.categoryName}
      </td>
      <td>{trim(transaction.comment, windowSize.innerWidth)}</td>
      <td>
        {windowSize.innerWidth < 1440
          ? trim(
              format(transaction.date, "EEEEEE, d.MM.yyyy"),
              windowSize.innerWidth,
            )
          : format(transaction.date, "EEEEEE, d.MM.yyyy")}
      </td>
      <td>
        {windowSize.innerWidth < 1440
          ? trim(transaction.time, windowSize.innerWidth)
          : transaction.time}
      </td>
      <td>{`${transaction.sum} / ${currency?.toUpperCase()}`}</td>
      <td>
        <button className={clsx(styles.btn, styles.btnAccent)}>
          <EditIcon className={styles.pensilIcon} />
          {windowSize.innerWidth >= 1440 && "Edit"}
        </button>
        <button className={clsx(styles.btn, styles.btnDefault)}>
          <DeleteIcon className={styles.trashIcon} />
          {windowSize.innerWidth >= 1440 && "Delete"}
        </button>
      </td>
    </tr>
  )
}
