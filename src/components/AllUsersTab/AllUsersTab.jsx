import styles from "./AllUsersTab.module.css"

import user1Img1 from "@/assets/images/women1@1x.png"
import user1Img2 from "@/assets/images/women1@2x.png"

import user2Img1 from "@/assets/images/men@1x.png"
import user2Img2 from "@/assets/images/men@2x.png"

import user3Img1 from "@/assets/images/women2@1x.png"
import user3Img2 from "@/assets/images/women2@2x.png"

export const AllUsersTab = () => {
  return (
    <div className={styles.usersWrapper}>
      <ul className={styles.usersPhotosList}>
        <li className={styles.usersPhotosElem}>
          <picture>
            <source
              srcSet={`${user1Img1} 1x, ${user1Img2} 2x`}
              type='image/png'
            />
            <img
              className={styles.userPhoto}
              src={user1Img1}
              alt='Photo of the user'
            />
          </picture>
        </li>
        <li className={styles.usersPhotosElemTwo}>
          <picture>
            <source
              srcSet={`${user2Img1} 1x, ${user2Img2} 2x`}
              type='image/png'
            />
            <img
              className={styles.userPhoto}
              src={user2Img1}
              alt='Photo of the user'
            />
          </picture>
        </li>
        <li>
          <picture>
            <source
              srcSet={`${user3Img1} 1x, ${user3Img2} 2x`}
              type='image/png'
            />
            <img
              className={styles.userPhoto}
              src={user3Img1}
              alt='Photo of the user'
            />
          </picture>
        </li>
      </ul>
      <div className={styles.usersAmountInfo}>
        <h2 className={styles.usersAmount}>1000 users &#43;</h2>
        <p className={styles.description}>
          Trusted by users for reliable expense tracking!
        </p>
      </div>
    </div>
  )
}
