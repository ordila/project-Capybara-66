import { useState, useEffect } from "react"
import bgImageStyles from "../BgImageWrapper/BgImageWrapper.module.css"
import { useWindowSizeHook } from "@/hooks/WindowSizeHook"

const MoveDecorationTab = ({ children }) => {
  const [position, setPosition] = useState({ top: 240, left: -10 })
  const [direction, setDirection] = useState({ top: 1, left: 1 })
  const [balance, setBalance] = useState("632.000")
  const [percentage, setPercentage] = useState("1.29")
  const { windowSize } = useWindowSizeHook()

  useEffect(() => {
    const bgImgWrapper = document.querySelector(
      `.${bgImageStyles.bgImgWrapper}`,
    )
    const parentWidth = bgImgWrapper.clientWidth
    const parentHeight = bgImgWrapper.clientHeight

    const moveDecorationTab = () => {
      setPosition(prevPosition => {
        let heightAdjustment = parentHeight - 122
        let widthAdjustment = parentWidth - 305

        const newTop = prevPosition.top + 5 * direction.top
        const newLeft = prevPosition.left + 5 * direction.left

        if (windowSize.innerWidth < 768) {
          heightAdjustment = parentHeight - 80
          widthAdjustment = parentWidth - 245
        }

        const clampedTop = Math.max(0, Math.min(newTop, heightAdjustment))
        const clampedLeft = Math.max(0, Math.min(newLeft, widthAdjustment))

        const newDirection = {
          top:
            clampedTop === 0 || clampedTop === heightAdjustment
              ? -direction.top
              : direction.top,
          left:
            clampedLeft === 0 || clampedLeft === widthAdjustment
              ? -direction.left
              : direction.left,
        }

        setDirection(newDirection)

        if (
          clampedTop === 0 ||
          clampedTop === heightAdjustment ||
          clampedLeft === 0 ||
          clampedLeft === widthAdjustment
        ) {
          updateBalance()
          updatePercentage()
        }

        return {
          top: clampedTop,
          left: clampedLeft,
        }
      })
    }

    const updateBalance = () => {
      setBalance(generateRandomBalance())
    }

    const updatePercentage = () => {
      setPercentage(generateRandomPercentage())
    }

    const generateRandomBalance = () => {
      const randomValue = Math.random() * (1000 - 10) + 10
      return parseFloat(randomValue).toFixed(3)
    }

    const generateRandomPercentage = () => {
      return (Math.random() * 100).toFixed(2)
    }

    const intervalId = setInterval(moveDecorationTab, 50)

    return () => clearInterval(intervalId)
  }, [direction, windowSize.innerWidth])

  return children(position, balance, percentage)
}

export default MoveDecorationTab
