import {LanguageDescription} from "@codemirror/language";

export const languages = [  LanguageDescription.of({
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