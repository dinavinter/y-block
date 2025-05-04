import { c, useEffect, useProp, Type } from "atomico";
import { basicSetup } from "@uiw/codemirror-extensions-basic-setup";
import { Extension } from "@codemirror/state";

export const YCmBasicSetup = c(function YCmBasicSetup() {
  const [extension,setExtension] = useProp<Extension>("extension");
  useEffect(() => {
    setExtension(basicSetup({
        lineNumbers: true,
        foldGutter: true,
        highlightActiveLine: true,
        highlightSelectionMatches: true,
        highlightActiveLineGutter: true
    }));
  }, []);

  return <host ></host>
},{
  props:{
  extension: {
    type: Array as Type<Extension[]>,
    reflect: false,
  }
}
});

customElements.define("y-cm-basic-setup", YCmBasicSetup); 