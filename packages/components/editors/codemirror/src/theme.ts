import {EditorView} from "@codemirror/view";
// import classes from './main.module.css?raw'
// import {css} from 'atomico'
import * as colors  from "tailwindcss/colors" ;
import "@uiw/codemirror-extensions-langs"
import {materialLight, materialInit, defaultSettingsMaterialLight} from '@uiw/codemirror-theme-material'
// 
// const cssss = css`
// /* BASICS */
//
// .CodeMirror {
//     /* Set height, width, borders, and global font properties here */
//     font-family: Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
//     monospace;
//     font-size: 16px;
//     line-height: 24px;
//     height: 100%;
//     color: theme('colors.gray.800');
//     direction: ltr;
// }
//
// /* PADDING */
//
// .CodeMirror-lines {
//     padding: 4px 0; /* Vertical padding around content */
// }
// .CodeMirror pre.CodeMirror-line,
// .CodeMirror pre.CodeMirror-line-like {
//     padding: 0 4px; /* Horizontal padding of content */
// }
//
// .CodeMirror-scrollbar-filler,
// .CodeMirror-gutter-filler {
//     background-color: white; /* The little square between H and V scrollbars */
// }
//
// /* GUTTER */
//
// .CodeMirror-gutters {
//     background: #fff;
//     white-space: nowrap;
// }
// .CodeMirror-linenumbers {
// }
// .CodeMirror-linenumber {
//     padding: 0 3px 0 5px;
//     min-width: 20px;
//     text-align: right;
//     color: theme('colors.gray.200');
//     white-space: nowrap;
// }
//
// .CodeMirror-guttermarker {
//     color: black;
// }
// .CodeMirror-guttermarker-subtle {
//     color: #999;
// }
//
// /* CURSOR */
//
// .CodeMirror-cursor {
//     border-left: 2px solid black;
//     border-right: none;
//     width: 0;
// }
// /* Shown when moving in bi-directional text */
// .CodeMirror div.CodeMirror-secondarycursor {
//     border-left: 1px solid silver;
// }
// .cm-fat-cursor .CodeMirror-cursor {
//     width: auto;
//     border: 0 !important;
//     background: #7e7;
// }
// .cm-fat-cursor div.CodeMirror-cursors {
//     z-index: 1;
// }
// .cm-fat-cursor-mark {
//     background-color: rgba(20, 255, 20, 0.5);
//     -webkit-animation: blink 1.06s steps(1) infinite;
//     -moz-animation: blink 1.06s steps(1) infinite;
//     animation: blink 1.06s steps(1) infinite;
// }
// .cm-animate-fat-cursor {
//     width: auto;
//     border: 0;
//     -webkit-animation: blink 1.06s steps(1) infinite;
//     -moz-animation: blink 1.06s steps(1) infinite;
//     animation: blink 1.06s steps(1) infinite;
//     background-color: #7e7;
// }
// @-moz-keyframes blink {
//     0% {
//     }
//     50% {
//         background-color: transparent;
//     }
//     100% {
//     }
// }
// @-webkit-keyframes blink {
//     0% {
//     }
//     50% {
//         background-color: transparent;
//     }
//     100% {
//     }
// }
// @keyframes blink {
//     0% {
//     }
//     50% {
//         background-color: transparent;
//     }
//     100% {
//     }
// }
//
// /* Can style cursor different in overwrite (non-insert) mode */
// .CodeMirror-overwrite .CodeMirror-cursor {
// }
//
// .cm-tab {
//     display: inline-block;
//     text-decoration: inherit;
// }
//
// .CodeMirror-rulers {
//     position: absolute;
//     left: 0;
//     right: 0;
//     top: -50px;
//     bottom: 0;
//     overflow: hidden;
// }
// .CodeMirror-ruler {
//     border-left: 1px solid #ccc;
//     top: 0;
//     bottom: 0;
//     position: absolute;
// }
//
// /* DEFAULT THEME */
//
// .cm-s-light .cm-header {
//     color: blue;
// }
// .cm-s-light .cm-quote {
//     color: #090;
// }
// .cm-negative {
//     color: #d44;
// }
// .cm-positive {
//     color: #292;
// }
// .cm-header,
// .cm-strong {
//     font-weight: bold;
// }
// .cm-em {
//     font-style: italic;
// }
// .cm-link {
//     text-decoration: underline;
// }
// .cm-strikethrough {
//     text-decoration: line-through;
// }
//
// .cm-s-light .cm-keyword {
//     color: theme('colors.sky.600');
// }
// .cm-s-light .cm-def {
//     color: theme('colors.sky.600');
// }
// .cm-s-light .cm-def.cm-m-javascript {
//     color: inherit;
// }
// .cm-s-light .cm-property {
//     color: theme('colors.indigo.600');
// }
// .cm-s-light .cm-comment {
//     color: theme('colors.gray.500');
// }
// .cm-s-light .cm-string,
// .cm-s-light .cm-string-2 {
//     color: theme('colors.indigo.600');
// }
// .cm-s-light .cm-qualifier {
//     color: theme('colors.sky.600');
// }
// .cm-s-light .cm-tag {
//     color: theme('colors.sky.600');
// }
// .cm-s-light .cm-bracket {
//     color: theme('colors.gray.300');
// }
// /* HTML attribute `=` */
// .cm-s-light .cm-bracket + .cm-tag ~ .cm-attribute + [class='cm-m-xml'] {
//     color: theme('colors.gray.300');
// }
// .cm-s-light .cm-tag.cm-m-tailwindcss {
//     color: theme('colors.gray.800');
// }
// .cm-s-light .cm-attribute {
//     color: theme('colors.sky.400');
// }
// .cm-s-light .cm-hr {
//     color: #999;
// }
// .cm-s-light .cm-link {
//     color: #00c;
// }
// .cm-s-light .cm-callee {
//     color: theme('colors.teal.600');
// }
// .cm-s-light .cm-variable.cm-m-javascript,
// .cm-s-light .cm-operator.cm-m-javascript,
// .cm-s-light .cm-property.cm-m-javascript {
//     color: inherit;
// }
//
// .cm-s-light .cm-error {
//     color: #f00;
// }
// .cm-invalidchar {
//     color: #f00;
// }
//
// .CodeMirror-composing {
//     border-bottom: 2px solid;
// }
//
// /* Default styles for common addons */
//
// div.CodeMirror span.CodeMirror-matchingbracket {
//     color: #0b0;
// }
// div.CodeMirror span.CodeMirror-nonmatchingbracket {
//     color: #a22;
// }
// .CodeMirror-matchingtag {
//     background: rgba(255, 150, 0, 0.3);
// }
// .CodeMirror-activeline-background {
//     background: #e8f2ff;
// }
//
// /* STOP */
//
// /* The rest of this file contains styles related to the mechanics of
//    the editor. You probably shouldn't touch them. */
//
// .CodeMirror {
//     position: relative;
//     overflow: hidden;
//     background: white;
// }
//
// .CodeMirror-scroll {
//     overflow: scroll !important; /* Things will break if this is overridden */
//     /* 50px is the magic margin used to hide the element's real scrollbars */
//     /* See overflow: hidden in .CodeMirror */
//     margin-bottom: -50px;
//     margin-right: -50px;
//     padding-bottom: 50px;
//     height: 100%;
//     outline: none; /* Prevent dragging from highlighting the element */
//     position: relative;
// }
// .CodeMirror-sizer {
//     position: relative;
//     border-right: 50px solid transparent;
// }
//
// /* The fake, visible scrollbars. Used to force redraw during scrolling
//    before actual scrolling happens, thus preventing shaking and
//    flickering artifacts. */
// .CodeMirror-vscrollbar,
// .CodeMirror-hscrollbar,
// .CodeMirror-scrollbar-filler,
// .CodeMirror-gutter-filler {
//     position: absolute;
//     z-index: 6;
//     display: none;
// }
// .CodeMirror-vscrollbar {
//     right: 0;
//     top: 0;
//     overflow-x: hidden;
//     overflow-y: scroll;
// }
// .CodeMirror-hscrollbar {
//     bottom: 0;
//     left: 0;
//     overflow-y: hidden;
//     overflow-x: scroll;
// }
// .CodeMirror-scrollbar-filler {
//     right: 0;
//     bottom: 0;
// }
// .CodeMirror-gutter-filler {
//     left: 0;
//     bottom: 0;
// }
//
// .CodeMirror-gutters {
//     position: absolute;
//     left: 0;
//     top: 0;
//     min-height: 100%;
//     z-index: 3;
// }
// .CodeMirror-gutter {
//     white-space: normal;
//     height: 100%;
//     display: inline-block;
//     vertical-align: top;
//     margin-bottom: -50px;
// }
// .CodeMirror-gutter-wrapper {
//     position: absolute;
//     z-index: 4;
//     background: none !important;
//     border: none !important;
// }
// .CodeMirror-gutter-background {
//     position: absolute;
//     top: 0;
//     bottom: 0;
//     z-index: 4;
// }
// .CodeMirror-gutter-elt {
//     position: absolute;
//     cursor: default;
//     z-index: 4;
// }
// .CodeMirror-gutter-wrapper ::selection {
//     background-color: transparent;
// }
// .CodeMirror-gutter-wrapper ::-moz-selection {
//     background-color: transparent;
// }
//
// .CodeMirror-lines {
//     cursor: text;
//     min-height: 1px; /* prevents collapsing before first draw */
// }
// .CodeMirror pre.CodeMirror-line,
// .CodeMirror pre.CodeMirror-line-like {
//     /* Reset some styles that the rest of the page might have set */
//     -moz-border-radius: 0;
//     -webkit-border-radius: 0;
//     border-radius: 0;
//     border-width: 0;
//     background: transparent;
//     font-family: inherit;
//     font-size: inherit;
//     margin: 0;
//     white-space: pre;
//     word-wrap: normal;
//     line-height: inherit;
//     color: inherit;
//     z-index: 2;
//     position: relative;
//     overflow: visible;
//     -webkit-tap-highlight-color: transparent;
//     -webkit-font-variant-ligatures: contextual;
//     font-variant-ligatures: contextual;
// }
// .CodeMirror-wrap pre.CodeMirror-line,
// .CodeMirror-wrap pre.CodeMirror-line-like {
//     word-wrap: break-word;
//     white-space: pre-wrap;
//     word-break: normal;
// }
//
// .CodeMirror-linebackground {
//     position: absolute;
//     left: 0;
//     right: 0;
//     top: 0;
//     bottom: 0;
//     z-index: 0;
// }
//
// .CodeMirror-linewidget {
//     position: relative;
//     z-index: 2;
//     padding: 0.1px; /* Force widget margins to stay inside of the container */
// }
//
// .CodeMirror-widget {
// }
//
// .CodeMirror-rtl pre {
//     direction: rtl;
// }
//
// .CodeMirror-code {
//     outline: none;
// }
//
// /* Force content-box sizing for the elements where we expect it */
// .CodeMirror-scroll,
// .CodeMirror-sizer,
// .CodeMirror-gutter,
// .CodeMirror-gutters,
// .CodeMirror-linenumber {
//     -moz-box-sizing: content-box;
//     box-sizing: content-box;
// }
//
// .CodeMirror-measure {
//     position: absolute;
//     width: 100%;
//     height: 0;
//     overflow: hidden;
//     visibility: hidden;
// }
//
// .CodeMirror-cursor {
//     position: absolute;
//     pointer-events: none;
// }
// .CodeMirror-measure pre {
//     position: static;
// }
//
// div.CodeMirror-cursors {
//     visibility: hidden;
//     position: relative;
//     z-index: 3;
// }
// div.CodeMirror-dragcursors {
//     visibility: visible;
// }
//
// .CodeMirror-focused div.CodeMirror-cursors {
//     visibility: visible;
// }
//
// .CodeMirror-selected {
//     background: #e5ebf1;
// }
// .CodeMirror-focused .CodeMirror-selected {
//     background: #add6ff;
// }
// .CodeMirror-crosshair {
//     cursor: crosshair;
// }
// .CodeMirror-line::selection,
// .CodeMirror-line > span::selection,
// .CodeMirror-line > span > span::selection {
//     background: #add6ff;
// }
// .CodeMirror-line::-moz-selection,
// .CodeMirror-line > span::-moz-selection,
// .CodeMirror-line > span > span::-moz-selection {
//     background: #add6ff;
// }
//
// .cm-searching {
//     background-color: #ffa;
//     background-color: rgba(255, 255, 0, 0.4);
// }
//
// /* Used to force a border model for a node */
// .cm-force-border {
//     padding-right: 0.1px;
// }
//
// @media print {
//     /* Hide the cursor when printing */
//     .CodeMirror div.CodeMirror-cursors {
//         visibility: hidden;
//     }
// }
//
// /* See issue #2901 */
// .cm-tab-wrap-hack:after {
//     content: '';
// }
//
// /* Help users use markselection to safely style text background */
// span.CodeMirror-selectedtext {
//     background: none;
// }
export const defaultLightThemeOption = EditorView.theme(
    {
        '&': {
            backgroundColor: '#fff',
        },
    },
    {
        dark: false,
    },
);

export const editorTheme = EditorView.baseTheme({

    "&": {
        fontFamily: "Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
        fontSize: "16px",
        lineHeight: "24px",
        height: "100%",
        color: colors.gray["800"],
        direction: "ltr",
    },

    "$.lines": {
        padding: "4px 0",
    },
    "$.pre.cm-line, $.pre.line-like": {
        padding: "0 4px",
    },

    "$.scrollbar-filler, $.gutter-filler": {
        backgroundColor: "white",
    },

    ".cm-gutters": {
        backgroundColor: "white",
        whiteSpace: "nowrap",
    },


    ".cm-linenumber": {
        padding: "0 3px 0 5px",
        minWidth: "20px",
        textAlign: "right",
        color: colors.gray["200"],
        whiteSpace: "nowrap",
    },
    //continue copying the css from the snippet above
    ".cm-guttermarker": {
        color: "black",
    },
    ".cm-guttermarker-subtle": {
        color: "#999",
    },
    ".cm-cursor": {
        borderLeft: "2px solid black",
        borderRight: "none",
        width: "0",
    },
    ".cm-secondarycursor": {
        borderLeft: "1px solid silver",
    },
    ".cm-fat-cursor .cm-cursor": {
        width: "auto",
        border: "0 !important",
        background: "#7e7",
    },
    ".cm-fat-cursor div.cm-cursors": {
        zIndex: 1,
    },
    ".cm-fat-cursor-mark": {
        backgroundColor: "rgba(20, 255, 20, 0.5)",
        WebkitAnimation: "blink 1.06s steps(1) infinite",
        MozAnimation: "blink 1.06s steps(1) infinite",
        animation: "blink 1.06s steps(1) infinite",
    },
    ".cm-animate-fat-cursor": {
        width: "auto",
        border: "0",
        WebkitAnimation: "blink 1.06s steps(1) infinite",
        MozAnimation: "blink 1.06s steps(1) infinite",
        animation: "blink 1.06s steps(1) infinite",
        backgroundColor: "#7e7",
    },
    // "@-moz-keyframes blink": {
    //     "0%": {
    //        
    //     },
    //     "50%": {
    //         backgroundColor: "transparent",
    //     },
    //     "100%": {},
    // },
    // "@-webkit-keyframes blink": {
    //     "0%": {},
    //     "50%": {
    //         backgroundColor: "transparent",
    //     },
    //     "100%": {},
    // },
    // "@keyframes blink": {
    //     "0%": {},
    //     "50%": {
    //         backgroundColor: "transparent",
    //     },
    //     "100%": {},
    // },
    ".cm-overwrite .cm-cursor": {},
    ".cm-rulers": {
        position: "absolute",
        left: "0",
        right: "0",
        top: "-50px",
        bottom: "0",
        overflow: "hidden",
    },
    ".cm-ruler": {
        borderLeft: "1px solid #ccc",
        top: "0",
        bottom: "0",
        position: "absolute",
    },
    ".cm-header": {
        color: "blue",
    },
    ".cm-quote": {
        color: "#090",
    },

    ".cm-negative": {
        color: "#d44",
    },
    ".cm-positive": {
        color: "#292",
    },
    ".cm-strong": {
        fontWeight: "bold",
    },
    ".cm-em": {
        fontStyle: "italic",
    },
    ".cm-link": {
        textDecoration: "underline",
    },
    ".cm-strikethrough": {
        textDecoration: "line-through",
    },
    ".cm-keyword": {
        color: colors.sky["600"],
    },
    ".cm-def": {
        color: colors.sky["600"],
    },
    ".cm-def.cm-m-javascript": {
        color: "inherit",
    },
    ".cm-property": {
        color: colors.indigo["600"],
    },
    ".cm-comment": {
        color: colors.gray["500"],
    },
    ".cm-string, .cm-string-2": {
        color: colors.indigo["600"],
    },
    ".cm-qualifier": {
        color: colors.sky["600"],
    },
    ".cm-tag": {
        color: colors.sky["600"],
    },
    ".cm-bracket": {
        color: colors.gray["300"],
    },
    ".cm-bracket + .cm-tag ~ .cm-attribute + [class='cm-m-xml']": {
        color: colors.gray["300"],
    },
    ".cm-tag.cm-m-tailwindcss": {
        color: colors.gray["800"],
    },
    ".cm-attribute": {
        color: colors.sky["400"],
    },
    ".cm-hr": {
        color: "#999",
    },
    ".cm-s-light .cm-link": {
        color: "#00c",
    },

    ".cm-callee": {
        color: colors.teal["600"],
    },
    ".cm-variable.cm-m-javascript, .cm-operator.cm-m-javascript, .cm-property.cm-m-javascript": {
        color: "inherit",
    },
    ".cm-error": {
        color: "#f00",
    },

    ".cm-invalidchar": {
        color: "#f00",
    },
    ".cm-composing": {
        borderBottom: "2px solid",
    },
    ".cm-selected": {
        background: "#e5ebf1",
    },
    ".cm-crosshair": {
        cursor: "crosshair",
    },
    ".cm-searching": {
        backgroundColor: "#ffa",
    },
    ".cm-selectedtext": {
        background: "none",
    },
    ".cm-force-border": {
        paddingRight: "0.1px",
    },

    "@media print": {
        ".cm-cursors": {
            visibility: "hidden",
        },
    },
    ".cm-tab-wrap-hack:after": {
        content: "''",
    },
    ".cm-tab": {
        display: "inline-block",
        textDecoration: "inherit",
    },

    ".cm-s-light .cm-header": {
        color: "blue",
    },
    ".cm-s-light .cm-quote": {
        color: "#090",
    },



} )


export  const  material = materialInit({
    settings: defaultSettingsMaterialLight,
    theme: "light"
});

export default material;
    