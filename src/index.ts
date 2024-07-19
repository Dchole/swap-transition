export interface AnimationOptions extends KeyframeAnimationOptions {
  duration: number;
  hideLeavingElement?: boolean;
}

/**
 * Transitions content by animating the leaving element out and the entering element in.
 *
 * @param leavingElement - The element that is leaving the view.
 * @param enteringElement - The element that is entering the view.
 * @param leavingKeyframes - Keyframes for the leaving element's animation.
 * @param enteringKeyframes - Keyframes for the entering element's animation.
 * @param options - Animation options, including duration, easing, and whether to hide the leaving element after the animation.
 *
 * @example
 * ```typescript
 * // Define keyframes with percentage offsets
 * const fadeOutKeyframes: Keyframe[] = [
 *   { offset: 0, opacity: 1 },
 *   { offset: 0.2, opacity: 0.8 },
 *   { offset: 0.4, opacity: 0.5 },
 *   { offset: 1, opacity: 0 }
 * ];
 *
 * const fadeInKeyframes: Keyframe[] = [
 *   { offset: 0, opacity: 0 },
 *   { offset: 0.6, opacity: 0.5 },
 *   { offset: 0.8, opacity: 0.8 },
 *   { offset: 1, opacity: 1 }
 * ];
 *
 * // Get the elements to animate
 * const leavingElement = document.getElementById('content1') as HTMLElement;
 * const enteringElement = document.getElementById('content2') as HTMLElement;
 *
 * // Define animation options
 * const options: AnimationOptions = {
 *   duration: 500,
 *   easing: 'ease-in-out',
 *   hideLeavingElement: true // Set this option based on user preference
 * };
 *
 * // Initialize the entering element as hidden
 * enteringElement.style.opacity = '0';
 * enteringElement.style.display = 'none';
 *
 * // Execute the transition
 * transitionSwap(leavingElement, enteringElement, fadeOutKeyframes, fadeInKeyframes, options);
 * ```
 */
export function transitionSwap(
  leavingElement: HTMLElement,
  enteringElement: HTMLElement,
  leavingKeyframes: Keyframe[],
  enteringKeyframes: Keyframe[],
  { hideLeavingElement, ...options }: AnimationOptions
) {
  // Apply the leaving animation
  const leavingAnimation = leavingElement.animate(leavingKeyframes, options);

  // When the leaving animation is complete
  leavingAnimation.onfinish = () => {
    // Hide the leaving element if the option is set
    if (hideLeavingElement) {
      leavingElement.style.display = "none";
    }

    // Show the entering element
    enteringElement.style.display = "block";

    // Apply the entering animation
    enteringElement.animate(enteringKeyframes, options);
  };
}
