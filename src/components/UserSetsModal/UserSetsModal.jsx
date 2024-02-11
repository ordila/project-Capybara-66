import React from "react";
import styles from "./UserSetsModal.module.css";
import UserBaseImg from "@/assets/icons/UserBaseImg.svg?react";
import CloseSure from "@/assets/icons/CloseSure.svg?react";

export const UserSetsModal = () => {
  return (
    <div className={styles.backDrop}>
      <div className={styles.wrapperSettings}>
        <div className={styles.boxForTitle}>
          <h3 className={styles.titleProfileSettings}>Profile settings</h3>
          <button className={styles.buttonClose}>
            <CloseSure className={styles.svgCloseStyles} />
          </button>
        </div>
        <span className={styles.userImg}>
          <UserBaseImg className={styles.svgBaseImg} />
        </span>
        <ul className={styles.listButtonUR}>
          <li>
            <button className={styles.buttonUpload}>Upload new photo</button>
          </li>
          <li>
            <button className={styles.buttonRemove}>Remove</button>
          </li>
        </ul>
        <ul className={styles.listWithSelect}>
          <li>
            <select className={styles.selectStyle}></select>
          </li>
          <li>
            <p className={styles.nameUser}>Name User</p>
          </li>
        </ul>
        <button className={styles.buttonSave}>Save</button>
      </div>
    </div>
  );
};
