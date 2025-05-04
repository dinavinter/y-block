import { c, useEffect, useHost, useProp, Type } from "atomico";
import { javascript, typescriptLanguage } from "@codemirror/lang-javascript";
import { Extension } from "@codemirror/state";

export const YCmLangJS = c(function yCmLangJS({}) {
  const [typescript, setTypescript] = useProp("typescript");
  const [jsx, setJsx] = useProp("jsx");

  const [_, setExtension] = useProp("extension");

  useEffect(() => {
    setExtension(javascript({ typescript: typescript , jsx: true}).extension);
  }, [jsx, typescript]);

  return  <host></host>
}, {
  props: {
    typescript: {
      type: Boolean,
      default: false,
      reflect: true,
    },
    jsx: {
      type: Boolean,
      default: false,
      reflect:true
    },
    extension: {
      type: Array as Type<Extension[]>,
      reflect: false,
    },
  },
});



customElements.define("y-cm-lang-ts", YCmLangJS); 