import {c, useEffect, useProp, Type, useRef} from "atomico";
import { langs } from "@uiw/codemirror-extensions-langs";
import { Extension } from "@codemirror/state";
import {useSlot} from "@atomico/hooks/use-slot";
import {LanguageSupport} from "@codemirror/language";

type LanguageSNode = Node & {parser:  LanguageSupport["language"]["parser"], tag: string};


export const YCmLangHTML = c(function YCmLangHTML() {
  const [_, setExtension] = useProp("extension");
  const slotRef = useRef();
  const childNodes = useSlot<LanguageSNode>(slotRef);

  useEffect(() => {
    setExtension(
        langs.html({
          matchClosingTags: true,
          autoCloseTags: true,
          selfClosingTags: true,
          nestedLanguages: childNodes.filter((node) =>node.tag && node.parser).map((node) => {
            return {
              parser: node.parser,
              tag: node.tag,
            };
          })
        }).extension
    );
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

customElements.define("y-cm-lang-html", YCmLangHTML);