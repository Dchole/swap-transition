type Display =
  | "block"
  | "inline"
  | "inline-block"
  | "flex"
  | "grid"
  | "flow-root"
  | "none"
  | "contents"
  | "table"
  | "table-row"
  | "table-cell"
  | "table-caption"
  | "table-column"
  | "table-column-group"
  | "table-footer-group"
  | "table-header-group"
  | "table-row-group"
  | "list-item"
  | "inline-flex"
  | "inline-grid"
  | "inline-table"
  | "run-in"
  | "ruby"
  | "ruby-base"
  | "ruby-text"
  | "ruby-base-container"
  | "ruby-text-container"
  | "subgrid" // CSS Grid Level 2
  | "initial"
  | "inherit"
  | "unset";

export interface Options {
  disableDelay?: boolean;
  keepLeavingElementMounted?: boolean;
  leavingElementDisplayType?: Display;
  enteringElementDisplayType?: Display;
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

  function revealEnteringElement(displayType: Display = "block") {
    // Show the entering element
    enteringElement.style.display = displayType;

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
      revealEnteringElement(options?.enteringElementDisplayType);
    }
  };

  if (options?.disableDelay) {
    revealEnteringElement(options?.enteringElementDisplayType);
  }
}
