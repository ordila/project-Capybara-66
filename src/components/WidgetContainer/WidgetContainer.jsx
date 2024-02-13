import clsx from "clsx"
import styles from "./WidgetContainer.module.css"

export const WidgetContainer = ({ className, children }) => {
  return (
    <article className={clsx(styles.widgetContainer, className)}>
      {children}
    </article>
  )
}
