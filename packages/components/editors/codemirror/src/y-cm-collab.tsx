import { c, useEffect, useHost, Props,Type, useProp } from "atomico";
import { yCollab } from "y-codemirror.next";
import * as awarenessProtocol from "y-protocols/awareness";
import * as Y from "yjs";
import { Extension } from "@codemirror/state";
export const ycmCollab = function YCmCollab({ awareness, text }: Props<typeof YCmCollab>) {
 const [_extension,setExtensions] = useProp<Extension>("extension");
  useEffect(() => {
    if (!awareness || !text) return;
    setExtensions(yCollab(text, awareness));

  }, [text]);

  return <host />;
};

const doc = new Y.Doc({guid: "y-cm-collab"});

ycmCollab.props = {
  extension: {
    type: Array as Type<Extension[]>,
    reflect: false,
  },
  awareness: {
    type: Object as Type<awarenessProtocol.Awareness>,
    default: new awarenessProtocol.Awareness(doc),
  },
  text: {
    type: Object as Type<Y.Text>,
    default: doc.getText("y-cm-collab"),
  },
 };

export const YCmCollab = c(ycmCollab);

customElements.define("y-cm-collab", YCmCollab); 