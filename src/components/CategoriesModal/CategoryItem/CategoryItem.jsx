import styles from "./CategoryItem.module.css"
import SuccessIcon from "icons/Vector.svg?react"
import EditPensil from "icons/EditPensil.svg?react"
import DeleteTrash from "icons/DeleteTrash.svg?react"

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
            type='button'
            onClick={() => approve({ id, name })}
            disabled={isBeingEdited}
          >
            <SuccessIcon className={styles.categoryActionButtonIcon} />
          </button>
        </li>
        <li>
          <button
            className={styles.categoryActionButton}
            type='button'
            onClick={() => edit({ id, name })}
          >
            <EditPensil className={styles.categoryActionButtonIcon} />
          </button>
        </li>
        <li>
          <button
            className={styles.categoryActionButton}
            type='button'
            onClick={() => remove(id)}
            disabled={isBeingEdited}
          >
            <DeleteTrash className={styles.categoryActionButtonIcon} />
          </button>
        </li>
      </ul>
    </li>
  )
}
