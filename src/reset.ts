import { getInitialStyles, getUpdatedProperties } from "./shared";

export function reset(
  leavingElement: HTMLElement,
  enteringElement: HTMLElement
) {
  const initialStyles = getInitialStyles();
  const updatedProperties = getUpdatedProperties();

  for (const property of updatedProperties.leavingElement) {
    leavingElement.style.setProperty(
      property,
      initialStyles.leavingElement[property]
    );
  }

  for (const property of updatedProperties.enteringElement) {
    enteringElement.style[property] = String(
      initialStyles.enteringElement[property]
    );
  }

  leavingElement.computedStyleMap();
}
