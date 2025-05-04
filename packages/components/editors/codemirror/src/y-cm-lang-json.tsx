import { c, useEffect, useProp, Type } from "atomico";
import { json } from "@codemirror/lang-json";
import { Extension } from "@codemirror/state";

export const YCmJSON = c(function YCmJSON() {
  const [_, setExtension] = useProp("extension");

  useEffect(() => {
    setExtension(json().extension);
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

customElements.define("y-cm-json", YCmJSON);