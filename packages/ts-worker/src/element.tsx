import { autocompletion } from '@codemirror/autocomplete';
import { javascript } from '@codemirror/lang-javascript';
import {
    tsAutocompleteWorker,
    tsFacetWorker,
    tsGotoWorker,
    tsHoverWorker,
    tsLinterWorker,
    tsSyncWorker,
} from '@valtown/codemirror-ts';
import { EditorView, basicSetup } from 'codemirror';
import * as Comlink from 'comlink';
import { containerStyles, editorTheme, tooltipStyles } from './styles';
import { EDITOR_READY_EVENT } from './constants';
import { Extension } from '@codemirror/state';

export function renderDisplayParts(dp: ts.SymbolDisplayPart[]) {
    const div = document.createElement('div');
    for (const part of dp) {
        const span = div.appendChild(document.createElement('span'));
        span.className = `quick-info-${part.kind}`;
        span.innerText = part.text;
    }
    return div;
}

export class TypeScriptEditor extends HTMLElement {
    editor: EditorView | null = null;
    private customExtensions: Extension[] = [];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        // Add styles
        const style = document.createElement('style');
        style.textContent = containerStyles + tooltipStyles;
        this.shadowRoot?.appendChild(style);

        // Create editor container
        const editorContainer = document.createElement('div');
        editorContainer.id = 'editor';
        this.shadowRoot?.appendChild(editorContainer);

        this.dispatchEvent(new CustomEvent("extension", {
            bubbles: true,
            composed: true,
            detail: {
                addExtension: (extension: Extension) => {
                    this.customExtensions.push(extension);
                }
            }
        }));

         const path = 'index.ts';
        const innerWorker = new Worker(new URL('./worker.ts', import.meta.url), {
            type: 'module',
        });
        const worker = Comlink.wrap(innerWorker) as any;
        await worker.initialize();

        this.editor = new EditorView({
            doc: this.getAttribute('value') || '',
            extensions: [
                basicSetup,
                editorTheme,
                javascript({
                    typescript: true,
                    jsx: true,
                }),
                tsFacetWorker.of({ worker, path }),
                tsSyncWorker(),
                tsLinterWorker(),
                autocompletion({
                    override: [
                        tsAutocompleteWorker({
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
                tsHoverWorker(),
                tsGotoWorker(),
                ...this.customExtensions
            ],
            parent: editorContainer,
        });

        // Dispatch ready event
        this.dispatchEvent(new CustomEvent(EDITOR_READY_EVENT, {
            bubbles: true,
            composed: true
        }));
    }

    disconnectedCallback() {
        this.editor?.destroy();
    }

    get value() {
        return this.editor?.state.doc.toString() || '';
    }

    set value(newValue: string) {
        if (this.editor) {
            this.editor.dispatch({
                changes: {
                    from: 0,
                    to: this.editor.state.doc.length,
                    insert: newValue
                }
            });
        }
    }
}

customElements.define('typescript-editor', TypeScriptEditor);