import { c, useEffect, useProp, Type } from "atomico";
import { Extension } from "@codemirror/state";

import {codeiumOtherDocumentsConfig, copilotPlugin, Language, startCompletion} from "@valtown/codemirror-codeium";
import { keymap } from "@codemirror/view";


const urls:string[]=[
  // "https://esm.town/v/dinavinter/htmx_layout",
  // "https://esm.town/v/dinavinter/cxai/yjs/store",
  // "https://esm.town/v/dinavinter/cxai/yjs/faker",
  // "https://esm.town/v/dinavinter/cxai/yjs/job",
  // "https://esm.town/v/dinavinter/cxai/yjs/last",  
  // "https://esm.town/v/dinavinter/cxai/yjs/react-hooks",
  // "https://esm.town/v/dinavinter/dcom/spotlight",

]

// const otherDocuments =await Promise.all( urls.map(async (url) => ({

//         absolutePath: url,
//         text: await fetch(url).then((res) => res.text()),
//         language: Language.JAVASCRIPT,
//         editorLanguage: "typescript",
//     })));


export const copilotStyle = `
.cm-ghostText,
.cm-ghostText * {
  opacity: 0.6;
  filter: grayscale(20%);
  cursor: pointer;
}

.cm-ghostText:hover {
  background: #eee;
}
`;

export const YCmCodieum = c(function YCmCodieum() {
  const [_, setExtension] = useProp("extension");

  useEffect(() => {
    setExtension( [
      // codeiumOtherDocumentsConfig.of({
      //     override: () =>otherDocuments,
      // }),
      copilotPlugin({
        apiKey: "d49954eb-cfba-4992-980f-d8fb37f0e942",
        shouldComplete(context) {
          if (context.tokenBefore(["String"])) {
            return true;
          }
          const match = context.matchBefore(/(@(?:\w*))(?:[./](\w*))?/);
          return !match;
        },
      }),
      keymap.of([
        {
          key: "Cmd-k",
          run: startCompletion,
        },
      ])
    ]);
  }, []);

  return <host>
    <style>{copilotStyle}</style>
   
  </host>;
}, {
  props: {
    extension: {
      type: Array as Type<Extension[]>,
      reflect: false,
    },
  },
});

customElements.define("y-cm-codieum", YCmCodieum);