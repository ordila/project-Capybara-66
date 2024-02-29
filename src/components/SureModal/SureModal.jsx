import React from "react"
import styles from "./SureModal.module.css"
import { useDispatch, useSelector } from "react-redux"
import { selectSid } from "@/redux/auth/slice"
import { logoutThunk } from "@/redux/auth/operations"
import { deleteTransactionThunk } from "@/redux/transactions/operations"

export const SureModal = ({ closeModal, text, id }) => {
  const seed = useSelector(selectSid)
  const dispatch = useDispatch()

  const action = () => {
    if (text === "Log out") dispatch(logoutThunk(seed))
    else dispatch(deleteTransactionThunk(id))
  }

  return (
    <div className={styles.backDropSure}>
      <div className={styles.wrapperModalSure}>
        <p className={styles.textSure}>
          Are you sure you want to {text.toLowerCase()}?
        </p>
        <ul className={styles.listButtonSure}>
          <li>
            <button className={styles.buttonLogOut} onClick={action}>
              {text}
            </button>
          </li>
          <li>
            <button
              className={styles.buttonCancel}
              onClick={() => closeModal(false)}
            >
              Cancel
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}
