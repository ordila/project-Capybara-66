import React from "react";
import styles from "./SureLogOutModal.module.css";
import CloseSure from "@/assets/icons/CloseSure.svg?react";

export const SureLogOutModal = () => {
  return (
    <div className={styles.backDropSure}>
      <div className={styles.wrapperModalSure}>
        <button className={styles.sureClose}>
          <CloseSure className={styles.svgCloseSure} />
        </button>
        <p className={styles.textSure}>Are you sure you want to log out?</p>
        <ul className={styles.listButtonSure}>
          <li>
            <button className={styles.buttonLogOut}>Log out</button>
          </li>
          <li>
            <button className={styles.buttonCancel}>Cancel</button>
          </li>
        </ul>
      </div>
    </div>
  );
};
