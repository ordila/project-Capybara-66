import { DecorationTab } from "../DecorationTab/DecorationTab";
import styles from "./BgImageWrapper.module.css";

export const BgImageWrapper = () => {
  return (
    <div className={styles.bgImgWrapper}>
      <DecorationTab />
    </div>
  );
};
