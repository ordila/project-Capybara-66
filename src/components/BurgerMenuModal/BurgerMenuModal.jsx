import React from "react";
import styles from "./BurgerMenuModal.module.css";
import CloseIcon from "@/assets/icons/Close.svg?react";
import { UserBarBtnBox } from "../UserBarBtnBox/UserBarBtnBox";

export const BurgerMenuModal = () => {
  return (
    <div className={styles.backDrop}>
      <div className={styles.wrapperModal}>
        <UserBarBtnBox />
        <button className={styles.closeButton}>
          <CloseIcon className={styles.closeSvg} />
        </button>
        <ul className={styles.buttonList}>
          <button className={styles.expenseButton}>All Expense</button>
          <button className={styles.incomeButton}>All Income</button>
        </ul>
      </div>
    </div>
  );
};
