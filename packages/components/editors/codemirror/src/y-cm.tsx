import { c, h, useRef, useEffect, useState, useHost, useEvent, useMemo } from "atomico";
import {EditorView, keymap} from "@codemirror/view";
import { useRender } from "@atomico/hooks/use-render";
import { useSlot } from "@atomico/hooks/use-slot";
import { Extension ,EditorState} from "@codemirror/state";
import {DefaultConfig as config} from "~/config";
import {yCollab, yUndoManagerKeymap} from "y-codemirror.next";


type ExtensionNode = Node & {extension: Extension}

export const YCm = c(function YCm() {
  const ref = useRef();
  const [extensions, setExtensions] = useState([] as Extension[]);
  const slotRef = useRef();
  const childNodes = useSlot<ExtensionNode>(slotRef);
  const dispatch = useEvent("change", {bubbles: true});

  const watcher = useMemo(() => EditorView.updateListener.of((view) => {
    if (!view.docChanged) return;
    dispatch({value: `${view.state.doc}`.trim()})
    console.debug('cmCode:watcher', { transactions:view.transactions, view })
}), [])

  // Collect extensions from children
  useEffect(() => {
    const ext = childNodes.map(node => node.extension).filter(Boolean);
    setExtensions(ext);
  }, [childNodes.length]);

    const codemirror = useMemo(() => {
        return new EditorView({
            state: EditorState.create({
                extensions: [
                    ...extensions,
                    watcher

                ]
            }),
            parent: document.createElement('div'),
 
        })

    }, [extensions]);
    
 

  useRender(function(){
    return (
        <div slot={"editor"} ref={ref} autofocus class="codemirror-host cm-s-twilight border-2   h-full w-full rounded-md">
            {h(codemirror?.dom, {})}
        </div>
    )
  })

    return (<host shadowDom>
            <slot name="editor"></slot>
            <slot ref={slotRef}></slot>
        </host>
    );
});

customElements.define("y-cm", YCm); 