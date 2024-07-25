import { Extension } from '@codemirror/state';
import { LanguageDescription } from '@codemirror/language';
import { html } from 'atomico';
export interface CodeBlockConfig {
    extensions: Extension[];
    languages: LanguageDescription[];
    searchPlaceholder: string;
    expandIcon: () => ReturnType<typeof html>;
    searchIcon: () => ReturnType<typeof html>;
    clearSearchIcon: () => ReturnType<typeof html>;
    renderLanguage: (language: string, selected: boolean) => ReturnType<typeof html>;
}
export declare const DefaultConfig: CodeBlockConfig;
