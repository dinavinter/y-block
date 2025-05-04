import { c, useEffect, useProp, Type } from "atomico";
import { EditorView } from "@codemirror/view";
import { Extension } from "@codemirror/state";

const darkTheme = EditorView.theme({
  "&": {
    color: "#d4d4d4",
    backgroundColor: "#1e1e1e",
  },
  ".cm-content": {
    caretColor: "#d4d4d4",
  },
  ".cm-gutters": {
    backgroundColor: "#1e1e1e",
    color: "#858585",
    border: "none",
  },
}, { dark: true });

export const YCmThemeDark = c(function YCmThemeDark() {
  const [extension, setExtension] = useProp("extension");

  useEffect(() => {
    setExtension(darkTheme);
  }, []);

  return <host></host>;
}, {
  props: {
    extension: {
      type: Array as Type<Extension[]>,
      reflect: false,
    },
  },
});

customElements.define("y-cm-theme-dark", YCmThemeDark);