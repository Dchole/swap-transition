export type Display =
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

export interface Component {
  element: HTMLElement;
  keyframes: Keyframe[];
  keyframesOptions: KeyframeAnimationOptions;
}

export type StyleProperties = Exclude<
  keyof Omit<
    CSSStyleDeclaration,
    | "getPropertyPriority"
    | "getPropertyValue"
    | "item"
    | "length"
    | "removeProperty"
    | "setProperty"
    | "parentRule"
    | "index"
  >,
  number | typeof Symbol.iterator
>;
