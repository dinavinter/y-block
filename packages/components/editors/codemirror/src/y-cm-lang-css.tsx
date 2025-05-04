import { c, useEffect, useProp, Type } from "atomico";
import { css as cmCss } from "@codemirror/lang-css";
import { color, colorTheme, colorView } from "@uiw/codemirror-extensions-color";
import { Extension } from "@codemirror/state";

export const YCmLangCSS = c(function YCmLangCSS() {
  const [_, setExtension] = useProp("extension");

  useEffect(() => {
    setExtension([
      cmCss().extension,
      color
    ]);
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

customElements.define("y-cm-lang-css", YCmLangCSS);