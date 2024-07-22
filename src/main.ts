import "@fontsource/raleway/600.css";
import "@fontsource/raleway/700.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/500.css";
import "./style.css";
import { reset, transitionSwap } from ".";

const START_BUTTON = document.getElementById(
  "swap-button"
) as HTMLButtonElement;

const LEAVING_ELEMENT = document.getElementById(
  "leaving-element"
) as HTMLElement;
const ENTERING_ELEMENT = document.getElementById(
  "entering-element"
) as HTMLElement;

let transitionDone = false;

START_BUTTON.addEventListener("click", () => {
  if (transitionDone) {
    START_BUTTON.innerText = "Start Transition";
    reset(LEAVING_ELEMENT, ENTERING_ELEMENT);
    transitionDone = false;

    return;
  }

  transitionSwap(
    {
      element: LEAVING_ELEMENT,
      keyframes: [{ opacity: 1 }, { opacity: 0 }],
      keyframesOptions: { duration: 200, easing: "ease-in" }
    },
    {
      element: ENTERING_ELEMENT,
      keyframes: [{ opacity: 0 }, { opacity: 1 }],
      keyframesOptions: { duration: 200, easing: "ease-out" }
    }
  );

  transitionDone = true;
  START_BUTTON.innerText = "Reset Transition";
});
