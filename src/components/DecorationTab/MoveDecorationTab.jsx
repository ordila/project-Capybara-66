import { useState, useEffect } from "react";
import bgImageStyles from "../BgImageWrapper/BgImageWrapper.module.css";

const MoveDecorationTab = ({ children }) => {
  const [position, setPosition] = useState({ top: 141, left: -10 });
  const [direction, setDirection] = useState({ top: 1, left: 1 });
  const [balance, setBalance] = useState("632.000");
  const [percentage, setPercentage] = useState("1.29");

  useEffect(() => {
    const bgImgWrapper = document.querySelector(
      `.${bgImageStyles.bgImgWrapper}`
    );
    const parentWidth = bgImgWrapper.clientWidth;
    const parentHeight = bgImgWrapper.clientHeight;

    const moveDecorationTab = () => {
      setPosition((prevPosition) => {
        const newTop = prevPosition.top + 5 * direction.top;
        const newLeft = prevPosition.left + 5 * direction.left;

        const clampedTop = Math.max(0, Math.min(newTop, parentHeight - 141));
        const clampedLeft = Math.max(0, Math.min(newLeft, parentWidth - 335));

        const newDirection = {
          top:
            clampedTop === 0 || clampedTop === parentHeight - 141
              ? -direction.top
              : direction.top,
          left:
            clampedLeft === 0 || clampedLeft === parentWidth - 335
              ? -direction.left
              : direction.left,
        };

        setDirection(newDirection);

        if (
          clampedTop === 0 ||
          clampedTop === parentHeight - 141 ||
          clampedLeft === 0 ||
          clampedLeft === parentWidth - 335
        ) {
          updateBalance();
          updatePercentage();
        }

        return {
          top: clampedTop,
          left: clampedLeft,
        };
      });
    };

    const updateBalance = () => {
      setBalance(generateRandomBalance());
    };

    const updatePercentage = () => {
      setPercentage(generateRandomPercentage());
    };

    const generateRandomBalance = () => {
      const randomValue = Math.random() * (1000 - 10) + 10;
      return parseFloat(randomValue).toFixed(3);
    };

    const generateRandomPercentage = () => {
      return (Math.random() * 100).toFixed(2);
    };

    const intervalId = setInterval(moveDecorationTab, 50);

    return () => clearInterval(intervalId);
  }, [direction]);

  return children(position, balance, percentage);
};

export default MoveDecorationTab;
