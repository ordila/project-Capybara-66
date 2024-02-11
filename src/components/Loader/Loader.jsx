import { InfinitySpin } from "react-loader-spinner"
import styles from "./Loader.module.css"

export const Loader = () => {
  return (
    <div className={styles.loader_wrapper}>
      <InfinitySpin color='#4fa94d' ariaLabel='infinity-spin-loading' />
    </div>
  )
}
