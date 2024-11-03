import { type Extension} from '@codemirror/state'
import {  LanguageDescription} from '@codemirror/language'
import { html } from 'atomico'
import {chevronDown, search, xCircle} from "./icons";

import { extensions } from './extensions';
import {languages} from "./languages";
export interface CodeBlockConfig {
    extensions: Extension[]
    languages: LanguageDescription[]
    searchPlaceholder: string
    expandIcon: () => ReturnType<typeof html>
    searchIcon: () => ReturnType<typeof html>
    clearSearchIcon: () => ReturnType<typeof html>
    renderLanguage: (language: string, selected: boolean) => ReturnType<typeof html>
}


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