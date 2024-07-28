import "@fontsource/raleway/600.css";
import "@fontsource/raleway/700.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/500.css";
import "./style.css";
import { restore, transitionSwap } from ".";

const START_BUTTON = document.getElementById(
  "swap-button"
) as HTMLButtonElement;

const LEAVING_ELEMENT = document.getElementById(
  "leaving-element"
) as HTMLElement;
const ENTERING_ELEMENT = document.getElementById(
  "entering-element"
) as HTMLElement;

const SIMPLE_TRANSITIONS_CONTROLS = document.querySelector<HTMLFormElement>(
  "#simple-transitions-controls"
);

let transitionDone = false;

START_BUTTON.addEventListener("click", () => {
  if (transitionDone) {
    START_BUTTON.innerText = "Start Transition";
    restore(LEAVING_ELEMENT, ENTERING_ELEMENT);
    transitionDone = false;

    return;
  }

  const { leavingOptions, enteringOptions } = setOptionsWithFormValues();

  transitionSwap(leavingOptions, enteringOptions);

  transitionDone = true;
  START_BUTTON.innerText = "Reset Transition";
});

function setOptionsWithFormValues() {
  if (!SIMPLE_TRANSITIONS_CONTROLS) {
    throw new Error("Element not found");
  }

  const formData = new FormData(SIMPLE_TRANSITIONS_CONTROLS);
  const enteringDuration = formData.get("entering-duration") as string;
  const enteringEasing = formData.get("entering-easing") as string;
  const leavingDuration = formData.get("leaving-duration") as string;
  const leavingEasing = formData.get("leaving-easing") as string;

  return {
    leavingOptions: {
      element: LEAVING_ELEMENT,
      keyframes: [{ opacity: 1 }, { opacity: 0 }],
      keyframesOptions: {
        duration: Number(leavingDuration),
        easing: leavingEasing
      }
    },
    enteringOptions: {
      element: ENTERING_ELEMENT,
      keyframes: [{ opacity: 0 }, { opacity: 1 }],
      keyframesOptions: {
        duration: Number(enteringDuration),
        easing: enteringEasing
      }
    }
  };
}
