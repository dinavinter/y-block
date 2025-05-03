import { h,c, css, Props, useEffect, useRef, useProp, useHost, useState } from "atomico";
import type * as ts from 'typescript';
import type { EditorView } from "codemirror";
import { connect } from "./connect.ts";



// Define the worker shape interface based on the expected methods
interface WorkerShape {
  initialize(): Promise<void>;
  updateFile(params: { path: string; code: string }): void;
  getLints(params: { path: string; diagnosticCodesToIgnore: number[] }): any[];
  getAutocompletion(params: { path: string; context: any }): Promise<any> | null;
  getHover(params: { path: string; pos: number }): any;
  getGoto(params: { path: string; pos: number }): any;
  getEnv(): any;
}

// Lazy load dependencies
const loadDependencies = async () => {
  const [
    { autocompletion },
    { javascript },
    { tsAutocompleteWorker, tsFacetWorker, tsGotoWorker, tsHoverWorker, tsLinterWorker, tsSyncWorker },
    Comlink,
    { containerStyles, editorTheme, tooltipStyles },
    { cmCollab },
    { default: TSWorker },
    { codeiumCopilot, copilotStyle },
    { EditorView, basicSetup }
  ] = await Promise.all([
    import('@codemirror/autocomplete'),
    import('@codemirror/lang-javascript'),
    import('@valtown/codemirror-ts'),
    import('comlink'),
    import('./styles.ts'),
    import('./collab.ts'),
    import('./worker.ts?worker&inline'),
    import('./copilot.ts'),
    import('codemirror')
  ]);
  return {
    autocompletion,
    javascript,
    tsAutocompleteWorker,
    tsFacetWorker,
    tsGotoWorker,
    tsHoverWorker,
    tsLinterWorker,
    tsSyncWorker,
    Comlink,
    containerStyles,
    editorTheme,
    tooltipStyles,
    cmCollab,
    TSWorker,
    codeiumCopilot,
    copilotStyle,
    EditorView,
    basicSetup
  };
};

type Dependencies = Awaited<ReturnType<typeof loadDependencies>>;

function renderDisplayParts(dp: ts.SymbolDisplayPart[]) {
  const div = document.createElement('div');
  for (const part of dp) {
    const span = div.appendChild(document.createElement('span'));
    span.className = `quick-info-${part.kind}`;
    span.innerText = part.text;
  }
  return div;
}


function TypeScriptEditor({ value, url = "ws://localhost:1234", room = "default", component = "codemirror" }: Props<typeof TypeScriptEditor>) {
  const host = useHost();
  const [_,setValue] = useProp<string>("value");
  const editorRef = useRef<EditorView>();
  const deps = useDeps();

  useEffect(() => {
    let editor: EditorView;
    
    const initializeEditor = async () => {
      if (!deps) return;
  
      const path = 'index.ts';
      const innerWorker = new deps.TSWorker({
        name: "ts-editor-worker",
      });
      const worker = deps.Comlink.wrap<WorkerShape>(innerWorker);
      await worker.initialize();

      const { doc, awareness } = connect(url, room);
      const text = doc.getText(component)

      editor = new deps.EditorView({
        extensions: [
          deps.basicSetup,
          deps.editorTheme,
          deps.javascript({
            typescript: true,
            jsx: true,
          }),
          deps.tsFacetWorker.of({ worker, path }),
          deps.tsSyncWorker(),
          deps.tsLinterWorker(),
          deps.autocompletion({
            override: [
              deps.tsAutocompleteWorker({
                renderAutocomplete: (raw) => {
                  return () => {
                    const div = document.createElement('div');
                    div.classList.add('cm-tooltip');

                    if (raw.displayParts) {
                      const signature = div.appendChild(document.createElement('div'));
                      signature.className = 'quick-info-signature';
                      signature.appendChild(renderDisplayParts(raw.displayParts));
                    }

                    if (raw.documentation) {
                      const docs = div.appendChild(document.createElement('div'));
                      docs.className = 'quick-info-documentation';
                      docs.appendChild(renderDisplayParts(raw.documentation));
                    }

                    return { dom: div };
                  };
                },
              }),
            ],
          }),
          deps.tsHoverWorker(),
          deps.tsGotoWorker(),
          deps.cmCollab({
            awareness,
            component: text
          }),
          deps.codeiumCopilot()
        ],
        parent: host.current,
        root: host.current.shadowRoot || undefined,

      });

      editorRef.current = editor;

      editor.dom.addEventListener('change', () => {
        const newValue = editor.state.doc.toString();
        setValue(newValue);
        host.current?.dispatchEvent(
          new CustomEvent('change', {
            detail: newValue,
            bubbles: true,
            composed: true,
          })
        );
      });

      host.current?.dispatchEvent(
        new CustomEvent('cm:ts:ready', {
          detail: editor,
          bubbles: true,
          composed: true,
        })
      );

      if (value) {
        editor.dispatch({
          changes: {
            from: 0,
            to: editor.state.doc.length,
            insert: value
          }
        });
      }
    };

    initializeEditor();

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
      }
    };
  }, [deps]);

  useEffect(() => {
    if (editorRef.current && value !== undefined && value !== editorRef.current.state.doc.toString()) {
      editorRef.current.dispatch({
        changes: {
          from: 0,
          to: editorRef.current.state.doc.length,
          insert: value
        }
      });
    }
  }, [value]);

  return (
    <host  >
      <style>
        ${deps?.containerStyles + deps?.tooltipStyles + deps?.copilotStyle}
      </style>
      <div autofocus class="codemirror-host cm-s-twilight border-2   ">
                {h(editorRef.current?.dom, {})}
      </div>
    </host>
  );
}

TypeScriptEditor.props = {
  value: String,
  url: String,
  room: String,
  component: String,
};

TypeScriptEditor.styles = css`
  :host {
    display: block;
    width: 100%;
    height: 100%;
  }
  
  #editor {
    height: 100%;
    width: 100%;
  }
  
`;

export const TsEditor = c(TypeScriptEditor);


function useDeps() {
    const [deps, setDeps] = useState<Dependencies>();
    useEffect(() => {
        loadDependencies().then(deps => {
            setDeps(deps);
        });
    }, []);
    return deps;
}



declare global {
  interface HTMLElementTagNameMap {
      'ts-editor': typeof TsEditor  
  }
}

customElements && customElements.define("ts-editor", TsEditor); 
