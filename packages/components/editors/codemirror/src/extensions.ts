// import {quietlight} from "@uiw/codemirror-theme-quietlight";
// import {drawSelection, EditorView, keymap} from "@codemirror/view";
// import {indentWithTab} from "@codemirror/commands";
// import theme from "./theme";
// import {indentOnInput, indentUnit} from "@codemirror/language";
// import {EditorState} from "@codemirror/state";
// import {langs} from "@uiw/codemirror-extensions-langs";
// import {javascript} from "@codemirror/lang-javascript";
// import {color} from "@uiw/codemirror-extensions-color";
// import {basicSetup} from "@uiw/codemirror-extensions-basic-setup";

export const extensions = [
    // quietlight,
    // keymap.of([indentWithTab]),
    // EditorView.lineWrapping,
    // theme,
    // drawSelection(),
    // indentOnInput(),
    // indentUnit.of(" "),
    // EditorState.tabSize.of(1),


    // langs.html({
    //     matchClosingTags: true,
    //     autoCloseTags: true,
    //     selfClosingTags: true,
    //
    //
    //     nestedLanguages: [{
    //         tag: 'script',
    //         parser: javascript({ jsx: true, typescript: true}).language.parser
    //     },{
    //         tag: 'style',
    //         parser: langs.css().language.parser
    //     }]
    // }),
    // color,
    // basicSetup({
    //     lineNumbers:false,
    //     autocompletion:true,
    //     foldGutter:true,
    //     dropCursor:true,
    //     crosshairCursor:true,
    //     indentOnInput:true,
    //     tabSize:1,
    //     highlightSelectionMatches:true,
    // })
];
