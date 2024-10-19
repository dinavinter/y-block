import {
    drawSelection,
    dropCursor,
    EditorView, highlightActiveLine,
    highlightActiveLineGutter,
    highlightSpecialChars, rectangularSelection
} from "@codemirror/view";
import {EditorState, Extension} from "@codemirror/state";
import {  closeBrackets} from "@codemirror/autocomplete";
import {tsTheme, typescript} from "./ts";
import {javascript} from "@codemirror/lang-javascript";
import {html} from "@codemirror/lang-html";
import { highlightSelectionMatches } from '@codemirror/search'
import { history } from '@codemirror/commands'
import { baseKeymap } from './keymap'
 import {indentOnInput,bracketMatching} from '@codemirror/language'
export const baseTheme = EditorView.theme({
    '&': {
        fontSize: '14px',
        fontFamily: 'JetBrains Mono',
        width: 'calc(100% - 30px)',
        backgroundColor: 'var(--primary-color) !important',
    },
    '.cm-activeLine': {
        backgroundColor: 'rgba(var(--secondary-color-triplet), .5) !important',
    },
    '.cm-selectionBackground': {
        backgroundColor: '#323232 !important',
    },
})

export const thisTsTheme = EditorView.theme({
    '.cm-foldMarker': {
        width: '12px',
        height: '12px',
        marginLeft: '8px',

        '&.folded': {
            transform: 'rotate(-90deg)',
        },
    },
    '.cm-foldPlaceholder': { background: 'transparent', border: 'none' },
    '.cm-tooltip': {
        maxWidth: '800px',
        zIndex: '999',
    },
    '.cm-diagnostic, .cm-quickinfo-tooltip': {
        fontFamily: 'JetBrains Mono',
    },
})


export const baseExtension: Extension = [
    baseTheme
]

const basicSetup: Extension = [
    highlightActiveLineGutter(),
    highlightSpecialChars(),
    history(),
    drawSelection(),
    dropCursor(),
    EditorState.allowMultipleSelections.of(true),
    indentOnInput(),
    bracketMatching(),
    closeBrackets(),
    rectangularSelection(),
    highlightActiveLine(),
    highlightSelectionMatches(),
    baseKeymap(),
]


export const tsExtension: Extension = [
    basicSetup,
    baseExtension,
    thisTsTheme,
    tsTheme,
    html(),
    // javascript({ typescript: true }),
    // typescript()
]

