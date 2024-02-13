import React from "react"
import styles from "./SureLogOutModal.module.css"
import { useDispatch, useSelector } from "react-redux"
import { selectSid } from "@/redux/auth/slice"
import { logoutThunk } from "@/redux/auth/operations"

export const SureLogOutModal = ({closeModal}) => {
  const seed = useSelector(selectSid)
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(logoutThunk(seed))
  }

  return (
    <div className={styles.backDropSure}>
      <div className={styles.wrapperModalSure}>
        <p className={styles.textSure}>Are you sure you want to log out?</p>
        <ul className={styles.listButtonSure}>
          <li>
            <button className={styles.buttonLogOut} onClick={logout}>
              Log out
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
