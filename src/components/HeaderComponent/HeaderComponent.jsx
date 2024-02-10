import React from "react";
import styles from "./HeaderComponent.module.css";
import LogoIcon from "@/assets/icons/Logo.svg?react";
import { BurgerComponent } from "../BurgerComponent/BurgerComponent";
import classNames from "classnames";

export const HeaderComponent = () => {
  const isLoggedIn = false;
  const classNamess = classNames(styles.sectionStyle, {
    [styles.stylesIsLogin]: isLoggedIn,
  });
  return (
    <section className={classNamess}>
      <div className={styles.wrapperLogo}>
        <LogoIcon className={styles.logo} />
        <h2 className={styles.titleLogo}>ExpenseTracker</h2>
      </div>
      {isLoggedIn && <BurgerComponent />}
    </section>
  );
};