import clsx from "clsx";
import styles from "./Icon.module.css";
import icons from "icons/icons.svg";

export const Icon = ({
  iconPath = `${icons}#icon-clock`,
  iconClassName = "",
}) => {
  return (
    <svg className={clsx(styles.timeFieldIcon, iconClassName)}>
      <use href={iconPath}></use>
    </svg>
  );
};
