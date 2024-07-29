import {EditorState, Extension} from '@codemirror/state'
import {indentOnInput, indentUnit, LanguageDescription} from '@codemirror/language'
import { html } from 'atomico'
import {javascript} from "@codemirror/lang-javascript";
import {color, colorTheme, colorView} from "@uiw/codemirror-extensions-color";
import {chevronDown, search, xCircle} from "./icons";
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup';
import {EditorView, keymap, drawSelection} from "@codemirror/view";
import {indentWithTab} from "@codemirror/commands";
import {quietlight} from "@uiw/codemirror-theme-quietlight";
import theme from "./theme";
import {langs} from "@uiw/codemirror-extensions-langs";
export interface CodeBlockConfig {
    extensions: Extension[]
    languages: LanguageDescription[]
    searchPlaceholder: string
    expandIcon: () => ReturnType<typeof html>
    searchIcon: () => ReturnType<typeof html>
    clearSearchIcon: () => ReturnType<typeof html>
    renderLanguage: (language: string, selected: boolean) => ReturnType<typeof html>
}

let languages = [  LanguageDescription.of({
    name: 'css',
    alias: ['css'],
    extensions: ['.css'],
    load: async () => {
        return (await import('@codemirror/lang-css')).css();
    }
} ),LanguageDescription.of({
    name: 'html',
    alias: ['html'],
    extensions: ['.html'],
    load: async () => {
        return (await import('@codemirror/lang-html')).html();
    }
}),LanguageDescription.of({
    name: 'javascript',
    alias: ['javascript', 'js'],
    extensions: ['.js'],
    load: async () => {
        return (await import('@codemirror/lang-javascript')).javascript();
    }
})


];
let extensions = [
    quietlight,
    keymap.of([indentWithTab]),
    EditorView.lineWrapping,
    theme,
    drawSelection(),
    indentOnInput(),
    indentUnit.of(" "),
    EditorState.tabSize.of(1),
    EditorState.lineSeparator.of('\n'),
  


    langs.html({
        matchClosingTags: true,
        autoCloseTags: true,
        selfClosingTags: true,
        


        nestedLanguages: [{
            tag: 'script',
            parser: javascript({ jsx: true, typescript: true}).language.parser
        },{
            tag: 'style',
            parser: langs.css().language.parser
        }]
    }),
    color,
    basicSetup({
        lineNumbers:false,
        autocompletion:true,
        foldGutter:true,
        dropCursor:true,
        crosshairCursor:true,
        indentOnInput:true,
        tabSize:1,
        
        highlightSelectionMatches:true
    }),];
export const DefaultConfig: CodeBlockConfig = {
    extensions: extensions,
    languages: languages,
    searchPlaceholder: 'Search language',
    expandIcon: () => chevronDown,
    searchIcon: () => search,
    clearSearchIcon: () => xCircle,
    renderLanguage: language => html`${language}`,

}


// withMeta(codeBlockConfig, {
//     displayName: 'Config<code-block>',
//     group: 'CodeBlock',
// })