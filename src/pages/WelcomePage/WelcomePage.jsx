import { AuthNav, BgImageWrapper, AllUsersTab } from "../../components/index";
import styles from "./WelcomePage.module.css";

export const WelcomePage = () => {
  return (
    <div className={styles.wrapperWelcomePageDesktop}>
      <div className={styles.wrapperWelcomePage}>
        <div className={styles.wrapper}>
          <p className={styles.description}>Expense log</p>
          <h1 className={styles.mainTitle}>
            Manage Your <span className={styles.mainTitleSpan}>Finances</span>{" "}
            Masterfully!
          </h1>
          <p className={styles.mainDescription}>
            ExpenseTracker effortlessly empowers you to take control of your
            finances! With intuitive features, it simplifies the process of
            tracking and managing expenses, allowing for a stress-free mastery
            over your financial world.
          </p>
        </div>
        <AuthNav />
      </div>
      <div className={styles.bgImage}>
        <BgImageWrapper className={styles.bgImage} />
        <AllUsersTab />
      </div>
    </div>
  );
};
