import "@fontsource/fira-code/400.css";
import "@fontsource/raleway/600.css";
import "@fontsource/raleway/700.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/500.css";
import "./style.css";
import "highlight.js/styles/github.css";
import { restore, transitionSwap } from ".";

const SIMPLE_START_BUTTON = document.getElementById(
  "swap-button"
) as HTMLButtonElement;

const SIMPLE_TOGGLE_CODE_BUTTON = document.getElementById(
  "simple-toggle-button"
) as HTMLButtonElement;

const SIMPLE_COPY_CODE_BUTTON = document.getElementById(
  "simple-copy-button"
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
const SIMPLE_TRANSITIONS_CODE = document.querySelector<HTMLFormElement>(
  "#simple-transitions-code"
);

window.addEventListener("load", async () => {
  const { default: hljs } = await import("highlight.js");
  const { default: typescript } = await import(
    "highlight.js/lib/languages/typescript"
  );

  hljs.registerLanguage("typescript", typescript);

  document.querySelectorAll("pre code").forEach(el => {
    const code = hljs.highlight(el.innerHTML, {
      language: "typescript"
    });

    // Create a DOM parser to convert the HTML string into a document
    const parser = new DOMParser();
    const doc = parser.parseFromString(code.value, "text/html");

    const optionKeys = ["duration", "easing"];
    let variant: "leaving" | "entering" = "leaving";

    for (const [index, child] of Array.from(doc.body.children).entries()) {
      const previousChild = doc.body.children.item(index - 1);
      if (child.classList.contains("hljs-variable")) {
        variant = child.textContent?.split("_")[0].toLowerCase() as
          | "leaving"
          | "entering";
      }

      if (
        previousChild?.textContent &&
        optionKeys.includes(previousChild.textContent)
      ) {
        child.setAttribute("contenteditable", "true");
        child.setAttribute(
          "data-key",
          `${variant}-${previousChild.textContent}`
        );
      }
    }

    el.innerHTML = "\n" + doc.body.innerHTML;
  });
});

if (!SIMPLE_TRANSITIONS_CONTROLS || !SIMPLE_TRANSITIONS_CODE) {
  throw new Error("Element not found");
}

const formData = new FormData(SIMPLE_TRANSITIONS_CONTROLS);
const enteringDuration = formData.get("entering-duration");
const enteringEasing = formData.get("entering-easing");
const leavingDuration = formData.get("leaving-duration");
const leavingEasing = formData.get("leaving-easing");

const simpleKeyFrameOptions = {
  entering: {
    duration: Number(enteringDuration),
    easing: String(enteringEasing)
  },
  leaving: {
    duration: Number(leavingDuration),
    easing: String(leavingEasing)
  }
};

let transitionDone = false;
let inputView: "form" | "code" = "form";

SIMPLE_TOGGLE_CODE_BUTTON.addEventListener("click", () => {
  inputView = inputView === "form" ? "code" : "form";

  if (inputView === "code") {
    SIMPLE_TRANSITIONS_CONTROLS.style.display = "none";
    SIMPLE_TRANSITIONS_CODE.style.display = "block";
  } else {
    SIMPLE_TRANSITIONS_CONTROLS.style.display = "flex";
    SIMPLE_TRANSITIONS_CODE.style.display = "none";
  }
});

SIMPLE_COPY_CODE_BUTTON.addEventListener("click", () => {
  if (navigator && navigator.clipboard) {
    navigator.clipboard
      .writeText(SIMPLE_TRANSITIONS_CODE.innerText || "")
      .then(() => {
        console.log("Content copied to clipboard");
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
      });
  }
});

SIMPLE_START_BUTTON.addEventListener("click", () => {
  if (transitionDone) {
    SIMPLE_START_BUTTON.innerText = "Start Transition";
    restore(LEAVING_ELEMENT, ENTERING_ELEMENT);
    transitionDone = false;

    return;
  }

  if (inputView === "form") setSimpleOptionsWithFormValues();

  const { entering, leaving } = simpleKeyFrameOptions;

  transitionSwap(
    {
      element: LEAVING_ELEMENT,
      keyframes: [{ opacity: 1 }, { opacity: 0 }],
      keyframesOptions: {
        duration: Number(leaving.duration),
        easing: leaving.easing
      }
    },
    {
      element: ENTERING_ELEMENT,
      keyframes: [{ opacity: 0 }, { opacity: 1 }],
      keyframesOptions: {
        duration: Number(entering.duration),
        easing: entering.easing
      }
    }
  );

  transitionDone = true;

  SIMPLE_START_BUTTON.innerText = "Reset Transition";
});

function setSimpleOptionsWithFormValues() {
  if (!SIMPLE_TRANSITIONS_CONTROLS) {
    throw new Error("Element not found");
  }

  const formData = new FormData(SIMPLE_TRANSITIONS_CONTROLS);
  const enteringDuration = formData.get("entering-duration") as string;
  const enteringEasing = formData.get("entering-easing") as string;
  const leavingDuration = formData.get("leaving-duration") as string;
  const leavingEasing = formData.get("leaving-easing") as string;

  simpleKeyFrameOptions.entering.duration = Number(enteringDuration);
  simpleKeyFrameOptions.entering.easing = enteringEasing;
  simpleKeyFrameOptions.leaving.duration = Number(leavingDuration);
  simpleKeyFrameOptions.leaving.easing = leavingEasing;
}

window.addEventListener("keyup", event => {
  const eventTarget = event.target as HTMLElement;
  const value = eventTarget.textContent;
  const [variant, key] = eventTarget.dataset.key?.split("-") as [
    "entering" | "leaving",
    "duration" | "easing"
  ];

  if (eventTarget.className.includes("hljs")) {
    switch (key) {
      case "duration":
        simpleKeyFrameOptions[variant][key] = Number(value);
        break;
      case "easing":
        simpleKeyFrameOptions[variant][key] = String(value);
        break;

      default:
        break;
    }
  }
});
