import { setInitialStyles, setUpdatedProperties } from "./shared";
import type { Component, Display, Options } from "./types";

export function transitionSwap(
  leavingComponent: Component,
  enteringComponent: Component,
  options?: Options
) {
  const {
    element: leavingElement,
    keyframes: leavingKeyframes,
    keyframesOptions: leavingOptions
  } = leavingComponent;

  const {
    element: enteringElement,
    keyframes: enteringKeyframes,
    keyframesOptions: enteringOptions
  } = enteringComponent;

  setInitialStyles(leavingElement, enteringElement);

  // Apply the leaving animation
  const leavingAnimation = leavingElement.animate(
    leavingKeyframes,
    leavingOptions
  );

  function revealEnteringElement(displayType: Display = "block") {
    // Show the entering element
    enteringElement.style.display = displayType;
    setUpdatedProperties("enteringElement", "display");

    // Apply the entering animation
    enteringElement.animate(enteringKeyframes, enteringOptions);
  }

  // When the leaving animation is complete
  leavingAnimation.onfinish = () => {
    // Hide the leaving element if the option is set
    if (options?.keepLeavingElementMounted) {
      leavingElement.style.position = "absolute";
      leavingElement.style.zIndex = "-1";
      leavingElement.style.width = "1px";
      leavingElement.style.height = "1px";
      leavingElement.style.opacity = "0";

      setUpdatedProperties(
        "leavingElement",
        "position",
        "zIndex",
        "width",
        "height",
        "opacity"
      );
    } else {
      leavingElement.style.display = "none";
      setUpdatedProperties("leavingElement", "display");
    }

    if (!options?.disableDelay) {
      revealEnteringElement(options?.enteringElementDisplayType);
    }
  };

  if (options?.disableDelay) {
    revealEnteringElement(options?.enteringElementDisplayType);
  }
}
