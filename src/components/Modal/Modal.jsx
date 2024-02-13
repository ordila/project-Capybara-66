import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import { useCallback, useEffect } from "react";
import icons from "icons/icons.svg";

export const Modal = ({ children, isOpened, onClose }) => {
  const handleKeyPress = useCallback(
    (event) => {
      if (
        event.key === "Escape" ||
        event.key === "Esc" ||
        event.keyCode === 27 ||
        event.keyCode === 9
      ) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  if (!isOpened) return null;

  return createPortal(
    <>
      <div className={styles.modalWindow} onClick={() => onClose()} />
      <div className={styles.modalWindowContent}>
        <button className={styles.closeModalButton} onClick={() => onClose()}>
          <svg width={20} height={20}>
            <use href={`${icons}#icon-close`}></use>
          </svg>
        </button>
        {children}
      </div>
    </>,
    document.getElementById(`modal-window`)
  );
};
