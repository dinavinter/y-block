import { c, useEffect, useProp, Type } from "atomico";
import { markdown } from "@codemirror/lang-markdown";
import { Extension } from "@codemirror/state";

export const YCmLangMD = c(function yCmLangMD({}) {
  const [_, setExtension] = useProp("extension");

  useEffect(() => {
    setExtension(markdown().extension);
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

customElements.define("y-cm-lang-md", YCmLangMD);