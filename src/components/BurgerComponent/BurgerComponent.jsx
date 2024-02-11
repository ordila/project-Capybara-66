import React from "react";
import styles from "./BurgerComponent.module.css";
import BurgerIcon from "@/assets/icons/Burger.svg?react";

export const BurgerComponent = () => {
  return (
    <div className={styles.wrapperBurger}>
      <button className={styles.buttonBurger}>
        <BurgerIcon className={styles.svgBurger} />
      </button>
    </div>
  );
};
