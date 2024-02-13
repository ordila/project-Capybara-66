import React, { useState } from "react"
import styles from "./BurgerComponent.module.css"
import BurgerIcon from "@/assets/icons/Burger.svg?react"
import { BurgerMenuModal } from "../BurgerMenuModal/BurgerMenuModal"
import { Modal } from "../Modal/Modal"
import { SureLogOutModal } from "../SureLogOutModal/SureLogOutModal"
import { UserSetsModal } from "../UserSetsModal/UserSetsModal"

export const BurgerComponent = () => {
  const [isModal, setIsModal] = useState(false)
  const [isVisibleLogout, setIsVisibleLogout] = useState(false)
  const [isVisibleProfile, setIsVisibleProfile] = useState(false)
  return (
    <>
      <div className={styles.wrapperBurger}>
        <button
          className={styles.buttonBurger}
          onClick={() => setIsModal(true)}
        >
          <BurgerIcon className={styles.svgBurger} />
        </button>

        <BurgerMenuModal
          isOpened={isModal}
          setIsVisibleLogout={setIsVisibleLogout}
          setIsVisibleProfile={setIsVisibleProfile}
          onClose={() => setIsModal(false)}
        />
      </div>

      <Modal
        isOpened={isVisibleLogout}
        onClose={() => setIsVisibleLogout(false)}
      >
        <SureLogOutModal closeModal={setIsVisibleLogout} />
      </Modal>
      <Modal
        isOpened={isVisibleProfile}
        onClose={() => setIsVisibleProfile(false)}
      >
        <UserSetsModal closeModal={setIsVisibleProfile} />
      </Modal>
    </>
  )
}
