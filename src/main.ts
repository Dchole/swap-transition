import { transitionSwap } from "../dist";

const startButton = document.getElementById("start") as HTMLButtonElement;

const leavingElement = document.getElementById("leaving") as HTMLElement;
const enteringElement = document.getElementById("entering") as HTMLElement;

startButton.addEventListener("click", () => {
  transitionSwap(
    {
      element: leavingElement,
      keyframes: [
        { transform: "translateX(0)" },
        { transform: "translateX(100%)" }
      ],
      keyframesOptions: { duration: 5500 }
    },
    {
      element: enteringElement,
      keyframes: [
        { transform: "translateX(-100%)" },
        { transform: "translateX(0)" }
      ],
      keyframesOptions: { duration: 5500 }
    },
    { keepLeavingElementMounted: true, disableDelay: true }
  );
});
