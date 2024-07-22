import { StyleProperties } from "./types";

const updatedProperties = {
  leavingElement: [] as StyleProperties[],
  enteringElement: [] as StyleProperties[]
};

const initialStyles = {
  leavingElement: {} as CSSStyleDeclaration,
  enteringElement: {} as CSSStyleDeclaration
};

export function setInitialStyles(
  leavingElement: HTMLElement,
  enteringElement: HTMLElement
) {
  initialStyles.leavingElement = { ...leavingElement.style };
  initialStyles.enteringElement = { ...enteringElement.style };
}

export function getInitialStyles() {
  return initialStyles;
}

export function setUpdatedProperties(
  element: "leavingElement" | "enteringElement",
  ...properties: StyleProperties[]
) {
  updatedProperties[element].push(...properties);
}

export function getUpdatedProperties() {
  return updatedProperties;
}
