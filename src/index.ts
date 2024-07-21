export interface Options {
  disableDelay?: boolean;
  keepLeavingElementMounted?: boolean;
}

interface Component {
  element: HTMLElement;
  keyframes: Keyframe[];
  keyframesOptions: KeyframeAnimationOptions;
}

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

  // Apply the leaving animation
  const leavingAnimation = leavingElement.animate(
    leavingKeyframes,
    leavingOptions
  );

  function revealEnteringElement() {
    // Show the entering element
    enteringElement.style.display = "block";

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
    } else {
      leavingElement.style.display = "none";
    }

    if (!options?.disableDelay) {
      revealEnteringElement();
    }
  };

  if (options?.disableDelay) {
    revealEnteringElement();
  }
}
