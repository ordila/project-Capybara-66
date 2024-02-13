import styles from "./CategoryItem.module.css";
import icons from "icons/icons.svg";

export const CategoryItem = ({
  id,
  name,
  approve,
  edit,
  remove,
  isBeingEdited,
}) => {
  return (
    <li className={styles.categoryItem}>
      <span style={{ color: "white" }}>{name || "Empty"}</span>
      <ul className={styles.categoryItemActionsList}>
        <li className={styles.categoryItemAction}>
          <button
            className={styles.categoryActionButton}
            type="button"
            onClick={() => approve({ id, name })}
            disabled={isBeingEdited}
          >
            <svg
              className={styles.categoryActionButtonIcon}
              width="16"
              height="16"
            >
              <use href={`${icons}#icon-check-mark`}></use>
            </svg>
          </button>
        </li>
        <li>
          <button
            className={styles.categoryActionButton}
            type="button"
            onClick={() => edit({ id, name })}
          >
            <svg
              className={styles.categoryActionButtonIcon}
              width="16"
              height="16"
            >
              <use href={`${icons}#icon-edit-pencil`}></use>
            </svg>
          </button>
        </li>
        <li>
          <button
            className={styles.categoryActionButton}
            type="button"
            onClick={() => remove(id)}
            disabled={isBeingEdited}
          >
            <svg
              className={styles.categoryActionButtonIcon}
              width="16"
              height="16"
            >
              <use href={`${icons}#icon-trash-can`}></use>
            </svg>
          </button>
        </li>
      </ul>
    </li>
  );
};
