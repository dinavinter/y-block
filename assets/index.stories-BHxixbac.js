import{j as e,a,c as m}from"./jsx-runtime-DzeBifHW.js";import{Y as u}from"./index-yio_HcMv.js";import{d as h,D as c}from"./core-abL_lBWD.js";import{c as g}from"./use-suspense-DTYBca5u.js";import"./use-ref-effect-CG-PCi_3.js";import"./decorator-D6U_tzFv.js";import"./index-Ds9HKYHo.js";import"./_commonjsHelpers-Cpj98o6Y.js";const A={title:"@y-block/array",...h(u)},i=r=>e("y-array",{array:d(["from y-array!","item 2"]),children:e("input",{"$:placeholder":"item"})}),n=r=>a("y-array",{array:d([{firstName:"Hello",lastName:"Array!",style:{padding:"5px",margin:"5px"}},{firstName:"So",lastName:"Sweet!",style:{padding:"5px",margin:"5px"}}]),children:[e("input",{"$:placeholder":"firstName","$:style":"style"}),e("input",{"$:placeholder":"lastName","$:style":"style"})]}),l=r=>{const t=new c().getArray("array");return t.push([{text:"Lazy loading..",idx:1}]),setInterval(()=>{t.length>=10&&t.delete(0,5);const o=t.get(t.length-1).idx+1;t.push([{text:`item ${o}`,idx:o}])},1e3),e("y-array",{array:t,children:e("input",{"$:placeholder":"text"})})},s=r=>{const t=new c().getArray("array");return t.push([{id:1,name:"Basic Tee",href:"#",imageSrc:"https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",imageAlt:"Front of men's Basic Tee in black.",price:"$35",color:"Black"},{id:2,name:"Fashion Hat",href:"#",imageSrc:"https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",imageAlt:"Fashion Hat.",price:"$25",color:"Brown"},{id:3,name:"Long Sleeve Shirt",href:"#",imageSrc:"https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg",imageAlt:"Long Sleeve Shirt.",price:"$40",color:"Blue"},{id:4,name:"Simple Backpack",href:"#",imageSrc:"https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg",imageAlt:"Simple Backpack.",price:"$70",color:"Gray"}]),e("div",{class:"mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ",children:e("y-array",{array:t,style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))",gap:"20px"},children:e("product-card-example",{"$:name":"name","$:id":"id","$:color":"color","$:image-alt":"imageAlt","$:image-src":"imageSrc","$:price":"price","$:href":"href"})})})};customElements.define("product-card-example",g(function({name:r,price:t,imageSrc:o,imageAlt:p,href:b,color:w}){return e("host",{shadowDom:!0,children:a("div",{class:"block group relative px-6",children:[e("div",{class:"aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80",children:e("img",{src:o,alt:p,class:"h-full w-full object-cover object-center lg:h-full lg:w-full"})}),a("div",{class:"mt-4 flex justify-between",children:[a("div",{children:[e("h3",{class:"text-sm text-gray-700",children:a("a",{href:b,children:[e("span",{"aria-hidden":"true",class:"absolute inset-0"}),r]})}),e("p",{class:"mt-1 text-sm text-gray-500",children:w})]}),e("p",{class:"text-sm font-medium text-gray-900 relative",children:t})]})]})})},{styles:m`/*
! tailwindcss v3.4.4 | MIT License | https://tailwindcss.com
*//*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*,
::before,
::after {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: #e5e7eb; /* 2 */
}

::before,
::after {
  --tw-content: '';
}

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured \`sans\` font-family by default.
5. Use the user's configured \`sans\` font-feature-settings by default.
6. Use the user's configured \`sans\` font-variation-settings by default.
7. Disable tap highlights on iOS
*/

html,
:host {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -moz-tab-size: 4; /* 3 */
  -o-tab-size: 4;
     tab-size: 4; /* 3 */
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 4 */
  font-feature-settings: normal; /* 5 */
  font-variation-settings: normal; /* 6 */
  -webkit-tap-highlight-color: transparent; /* 7 */
}

/*
1. Remove the margin in all browsers.
2. Inherit line-height from \`html\` so users can set them as a class directly on the \`html\` element.
*/

body {
  margin: 0; /* 1 */
  line-height: inherit; /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
          text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}

/*
1. Use the user's configured \`mono\` font-family by default.
2. Use the user's configured \`mono\` font-feature-settings by default.
3. Use the user's configured \`mono\` font-variation-settings by default.
4. Correct the odd \`em\` font sizing in all browsers.
*/

code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; /* 1 */
  font-feature-settings: normal; /* 2 */
  font-variation-settings: normal; /* 3 */
  font-size: 1em; /* 4 */
}

/*
Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}

/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-feature-settings: inherit; /* 1 */
  font-variation-settings: inherit; /* 1 */
  font-size: 100%; /* 1 */
  font-weight: inherit; /* 1 */
  line-height: inherit; /* 1 */
  letter-spacing: inherit; /* 1 */
  color: inherit; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 3 */
}

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

button,
select {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button,
input:where([type='button']),
input:where([type='reset']),
input:where([type='submit']) {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring {
  outline: auto;
}

/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search'] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Reset default styling for dialogs.
*/
dialog {
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::-moz-placeholder, textarea::-moz-placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

input::placeholder,
textarea::placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

/*
Set the default cursor for buttons.
*/

button,
[role="button"] {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/
:disabled {
  cursor: default;
}

/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

/* Make elements with the HTML hidden attribute stay hidden by default */
[hidden] {
  display: none;
}

*, ::before, ::after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}

::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}
    .container {
  width: 100%;
}
    @media (min-width: 640px) {

  .container {
    max-width: 640px;
  }
}
    @media (min-width: 768px) {

  .container {
    max-width: 768px;
  }
}
    @media (min-width: 1024px) {

  .container {
    max-width: 1024px;
  }
}
    @media (min-width: 1280px) {

  .container {
    max-width: 1280px;
  }
}
    @media (min-width: 1536px) {

  .container {
    max-width: 1536px;
  }
}
    .aspect-h-1 {
  --tw-aspect-h: 1;
}
    .aspect-h-2 {
  --tw-aspect-h: 2;
}
    .aspect-h-\[123\] {
  --tw-aspect-h: 123;
}
    .aspect-h-\[var\(--height\)\] {
  --tw-aspect-h: var(--height);
}
    .aspect-w-1 {
  position: relative;
  padding-bottom: calc(var(--tw-aspect-h) / var(--tw-aspect-w) * 100%);
  --tw-aspect-w: 1;
}
    .aspect-w-1 > * {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
    .aspect-w-2 {
  position: relative;
  padding-bottom: calc(var(--tw-aspect-h) / var(--tw-aspect-w) * 100%);
  --tw-aspect-w: 2;
}
    .aspect-w-2 > * {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
    .aspect-w-\[123\] {
  position: relative;
  padding-bottom: calc(var(--tw-aspect-h) / var(--tw-aspect-w) * 100%);
  --tw-aspect-w: 123;
}
    .aspect-w-\[123\] > * {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
    .aspect-w-\[var\(--width\)\] {
  position: relative;
  padding-bottom: calc(var(--tw-aspect-h) / var(--tw-aspect-w) * 100%);
  --tw-aspect-w: var(--width);
}
    .aspect-w-\[var\(--width\)\] > * {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
    .aspect-none {
  position: static;
  padding-bottom: 0;
}
    .aspect-none > * {
  position: static;
  height: auto;
  width: auto;
  top: auto;
  right: auto;
  bottom: auto;
  left: auto;
}
    .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
    .not-sr-only {
  position: static;
  width: auto;
  height: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
    .pointer-events-none {
  pointer-events: none;
}
    .pointer-events-auto {
  pointer-events: auto;
}
    .visible {
  visibility: visible;
}
    .invisible {
  visibility: hidden;
}
    .collapse {
  visibility: collapse;
}
    .static {
  position: static;
}
    .fixed {
  position: fixed;
}
    .absolute {
  position: absolute;
}
    .relative {
  position: relative;
}
    .sticky {
  position: sticky;
}
    .-inset-1 {
  inset: -0.25rem;
}
    .inset-0 {
  inset: 0px;
}
    .isolate {
  isolation: isolate;
}
    .isolation-auto {
  isolation: auto;
}
    .float-start {
  float: inline-start;
}
    .float-end {
  float: inline-end;
}
    .float-right {
  float: right;
}
    .float-left {
  float: left;
}
    .float-none {
  float: none;
}
    .clear-start {
  clear: inline-start;
}
    .clear-end {
  clear: inline-end;
}
    .clear-left {
  clear: left;
}
    .clear-right {
  clear: right;
}
    .clear-both {
  clear: both;
}
    .clear-none {
  clear: none;
}
    .mx-auto {
  margin-left: auto;
  margin-right: auto;
}
    .mt-1 {
  margin-top: 0.25rem;
}
    .mt-2 {
  margin-top: 0.5rem;
}
    .mt-4 {
  margin-top: 1rem;
}
    .mt-6 {
  margin-top: 1.5rem;
}
    .box-border {
  box-sizing: border-box;
}
    .box-content {
  box-sizing: content-box;
}
    .line-clamp-none {
  overflow: visible;
  display: block;
  -webkit-box-orient: horizontal;
  -webkit-line-clamp: none;
}
    .block {
  display: block;
}
    .inline-block {
  display: inline-block;
}
    .inline {
  display: inline;
}
    .flex {
  display: flex;
}
    .inline-flex {
  display: inline-flex;
}
    .table {
  display: table;
}
    .inline-table {
  display: inline-table;
}
    .table-caption {
  display: table-caption;
}
    .table-cell {
  display: table-cell;
}
    .table-column {
  display: table-column;
}
    .table-column-group {
  display: table-column-group;
}
    .table-footer-group {
  display: table-footer-group;
}
    .table-header-group {
  display: table-header-group;
}
    .table-row-group {
  display: table-row-group;
}
    .table-row {
  display: table-row;
}
    .flow-root {
  display: flow-root;
}
    .grid {
  display: grid;
}
    .inline-grid {
  display: inline-grid;
}
    .contents {
  display: contents;
}
    .list-item {
  display: list-item;
}
    .hidden {
  display: none;
}
    .h-full {
  height: 100%;
}
    .max-h-screen {
  max-height: 100vh;
}
    .w-\[this-is\\\\\] {
  width: this-is\\;
}
    .w-\[this-is\] {
  width: this-is;
}
    .w-\[weird-and-invalid\] {
  width: weird-and-invalid;
}
    .w-full {
  width: 100%;
}
    .max-w-2xl {
  max-width: 42rem;
}
    .flex-shrink {
  flex-shrink: 1;
}
    .shrink {
  flex-shrink: 1;
}
    .flex-grow {
  flex-grow: 1;
}
    .grow {
  flex-grow: 1;
}
    .table-auto {
  table-layout: auto;
}
    .table-fixed {
  table-layout: fixed;
}
    .caption-top {
  caption-side: top;
}
    .caption-bottom {
  caption-side: bottom;
}
    .border-collapse {
  border-collapse: collapse;
}
    .border-separate {
  border-collapse: separate;
}
    .\!transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)) !important;
}
    .transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
    .transform-cpu {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
    .transform-gpu {
  transform: translate3d(var(--tw-translate-x), var(--tw-translate-y), 0) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
    .transform-none {
  transform: none;
}
    .touch-auto {
  touch-action: auto;
}
    .touch-none {
  touch-action: none;
}
    .touch-pan-x {
  --tw-pan-x: pan-x;
  touch-action: var(--tw-pan-x) var(--tw-pan-y) var(--tw-pinch-zoom);
}
    .touch-pan-left {
  --tw-pan-x: pan-left;
  touch-action: var(--tw-pan-x) var(--tw-pan-y) var(--tw-pinch-zoom);
}
    .touch-pan-right {
  --tw-pan-x: pan-right;
  touch-action: var(--tw-pan-x) var(--tw-pan-y) var(--tw-pinch-zoom);
}
    .touch-pan-y {
  --tw-pan-y: pan-y;
  touch-action: var(--tw-pan-x) var(--tw-pan-y) var(--tw-pinch-zoom);
}
    .touch-pan-up {
  --tw-pan-y: pan-up;
  touch-action: var(--tw-pan-x) var(--tw-pan-y) var(--tw-pinch-zoom);
}
    .touch-pan-down {
  --tw-pan-y: pan-down;
  touch-action: var(--tw-pan-x) var(--tw-pan-y) var(--tw-pinch-zoom);
}
    .touch-pinch-zoom {
  --tw-pinch-zoom: pinch-zoom;
  touch-action: var(--tw-pan-x) var(--tw-pan-y) var(--tw-pinch-zoom);
}
    .touch-manipulation {
  touch-action: manipulation;
}
    .select-none {
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
}
    .select-text {
  -webkit-user-select: text;
     -moz-user-select: text;
          user-select: text;
}
    .select-all {
  -webkit-user-select: all;
     -moz-user-select: all;
          user-select: all;
}
    .select-auto {
  -webkit-user-select: auto;
     -moz-user-select: auto;
          user-select: auto;
}
    .resize-none {
  resize: none;
}
    .resize-y {
  resize: vertical;
}
    .resize-x {
  resize: horizontal;
}
    .resize {
  resize: both;
}
    .snap-none {
  scroll-snap-type: none;
}
    .snap-x {
  scroll-snap-type: x var(--tw-scroll-snap-strictness);
}
    .snap-y {
  scroll-snap-type: y var(--tw-scroll-snap-strictness);
}
    .snap-both {
  scroll-snap-type: both var(--tw-scroll-snap-strictness);
}
    .snap-mandatory {
  --tw-scroll-snap-strictness: mandatory;
}
    .snap-proximity {
  --tw-scroll-snap-strictness: proximity;
}
    .snap-start {
  scroll-snap-align: start;
}
    .snap-end {
  scroll-snap-align: end;
}
    .snap-center {
  scroll-snap-align: center;
}
    .snap-align-none {
  scroll-snap-align: none;
}
    .snap-normal {
  scroll-snap-stop: normal;
}
    .snap-always {
  scroll-snap-stop: always;
}
    .list-inside {
  list-style-position: inside;
}
    .list-outside {
  list-style-position: outside;
}
    .appearance-none {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
}
    .appearance-auto {
  -webkit-appearance: auto;
     -moz-appearance: auto;
          appearance: auto;
}
    .break-before-auto {
  -moz-column-break-before: auto;
       break-before: auto;
}
    .break-before-avoid {
  -moz-column-break-before: avoid;
       break-before: avoid;
}
    .break-before-all {
  -moz-column-break-before: all;
       break-before: all;
}
    .break-before-avoid-page {
  -moz-column-break-before: avoid;
       break-before: avoid-page;
}
    .break-before-page {
  -moz-column-break-before: page;
       break-before: page;
}
    .break-before-left {
  -moz-column-break-before: left;
       break-before: left;
}
    .break-before-right {
  -moz-column-break-before: right;
       break-before: right;
}
    .break-before-column {
  -moz-column-break-before: column;
       break-before: column;
}
    .break-inside-auto {
  -moz-column-break-inside: auto;
       break-inside: auto;
}
    .break-inside-avoid {
  -moz-column-break-inside: avoid;
       break-inside: avoid;
}
    .break-inside-avoid-page {
  break-inside: avoid-page;
}
    .break-inside-avoid-column {
  -moz-column-break-inside: avoid;
       break-inside: avoid-column;
}
    .break-after-auto {
  -moz-column-break-after: auto;
       break-after: auto;
}
    .break-after-avoid {
  -moz-column-break-after: avoid;
       break-after: avoid;
}
    .break-after-all {
  -moz-column-break-after: all;
       break-after: all;
}
    .break-after-avoid-page {
  -moz-column-break-after: avoid;
       break-after: avoid-page;
}
    .break-after-page {
  -moz-column-break-after: page;
       break-after: page;
}
    .break-after-left {
  -moz-column-break-after: left;
       break-after: left;
}
    .break-after-right {
  -moz-column-break-after: right;
       break-after: right;
}
    .break-after-column {
  -moz-column-break-after: column;
       break-after: column;
}
    .grid-flow-row {
  grid-auto-flow: row;
}
    .grid-flow-col {
  grid-auto-flow: column;
}
    .grid-flow-dense {
  grid-auto-flow: dense;
}
    .grid-flow-row-dense {
  grid-auto-flow: row dense;
}
    .grid-flow-col-dense {
  grid-auto-flow: column dense;
}
    .grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}
    .flex-row {
  flex-direction: row;
}
    .flex-row-reverse {
  flex-direction: row-reverse;
}
    .flex-col {
  flex-direction: column;
}
    .flex-col-reverse {
  flex-direction: column-reverse;
}
    .flex-wrap {
  flex-wrap: wrap;
}
    .flex-wrap-reverse {
  flex-wrap: wrap-reverse;
}
    .flex-nowrap {
  flex-wrap: nowrap;
}
    .place-content-center {
  place-content: center;
}
    .place-content-start {
  place-content: start;
}
    .place-content-end {
  place-content: end;
}
    .place-content-between {
  place-content: space-between;
}
    .place-content-around {
  place-content: space-around;
}
    .place-content-evenly {
  place-content: space-evenly;
}
    .place-content-baseline {
  place-content: baseline;
}
    .place-content-stretch {
  place-content: stretch;
}
    .place-items-start {
  place-items: start;
}
    .place-items-end {
  place-items: end;
}
    .place-items-center {
  place-items: center;
}
    .place-items-baseline {
  place-items: baseline;
}
    .place-items-stretch {
  place-items: stretch;
}
    .content-normal {
  align-content: normal;
}
    .content-center {
  align-content: center;
}
    .content-start {
  align-content: flex-start;
}
    .content-end {
  align-content: flex-end;
}
    .content-between {
  align-content: space-between;
}
    .content-around {
  align-content: space-around;
}
    .content-evenly {
  align-content: space-evenly;
}
    .content-baseline {
  align-content: baseline;
}
    .content-stretch {
  align-content: stretch;
}
    .items-start {
  align-items: flex-start;
}
    .items-end {
  align-items: flex-end;
}
    .items-center {
  align-items: center;
}
    .items-baseline {
  align-items: baseline;
}
    .items-stretch {
  align-items: stretch;
}
    .justify-normal {
  justify-content: normal;
}
    .justify-start {
  justify-content: flex-start;
}
    .justify-end {
  justify-content: flex-end;
}
    .justify-center {
  justify-content: center;
}
    .justify-between {
  justify-content: space-between;
}
    .justify-around {
  justify-content: space-around;
}
    .justify-evenly {
  justify-content: space-evenly;
}
    .justify-stretch {
  justify-content: stretch;
}
    .justify-items-start {
  justify-items: start;
}
    .justify-items-end {
  justify-items: end;
}
    .justify-items-center {
  justify-items: center;
}
    .justify-items-stretch {
  justify-items: stretch;
}
    .gap-x-6 {
  -moz-column-gap: 1.5rem;
       column-gap: 1.5rem;
}
    .gap-y-10 {
  row-gap: 2.5rem;
}
    .space-x-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.5rem * var(--tw-space-x-reverse));
  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
}
    .space-y-reverse > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 1;
}
    .space-x-reverse > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 1;
}
    .divide-x > :not([hidden]) ~ :not([hidden]) {
  --tw-divide-x-reverse: 0;
  border-right-width: calc(1px * var(--tw-divide-x-reverse));
  border-left-width: calc(1px * calc(1 - var(--tw-divide-x-reverse)));
}
    .divide-y > :not([hidden]) ~ :not([hidden]) {
  --tw-divide-y-reverse: 0;
  border-top-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));
  border-bottom-width: calc(1px * var(--tw-divide-y-reverse));
}
    .divide-y-reverse > :not([hidden]) ~ :not([hidden]) {
  --tw-divide-y-reverse: 1;
}
    .divide-x-reverse > :not([hidden]) ~ :not([hidden]) {
  --tw-divide-x-reverse: 1;
}
    .divide-solid > :not([hidden]) ~ :not([hidden]) {
  border-style: solid;
}
    .divide-dashed > :not([hidden]) ~ :not([hidden]) {
  border-style: dashed;
}
    .divide-dotted > :not([hidden]) ~ :not([hidden]) {
  border-style: dotted;
}
    .divide-double > :not([hidden]) ~ :not([hidden]) {
  border-style: double;
}
    .divide-none > :not([hidden]) ~ :not([hidden]) {
  border-style: none;
}
    .place-self-auto {
  place-self: auto;
}
    .place-self-start {
  place-self: start;
}
    .place-self-end {
  place-self: end;
}
    .place-self-center {
  place-self: center;
}
    .place-self-stretch {
  place-self: stretch;
}
    .self-auto {
  align-self: auto;
}
    .self-start {
  align-self: flex-start;
}
    .self-end {
  align-self: flex-end;
}
    .self-center {
  align-self: center;
}
    .self-stretch {
  align-self: stretch;
}
    .self-baseline {
  align-self: baseline;
}
    .justify-self-auto {
  justify-self: auto;
}
    .justify-self-start {
  justify-self: start;
}
    .justify-self-end {
  justify-self: end;
}
    .justify-self-center {
  justify-self: center;
}
    .justify-self-stretch {
  justify-self: stretch;
}
    .overflow-auto {
  overflow: auto;
}
    .overflow-hidden {
  overflow: hidden;
}
    .overflow-clip {
  overflow: clip;
}
    .overflow-visible {
  overflow: visible;
}
    .overflow-scroll {
  overflow: scroll;
}
    .overflow-x-auto {
  overflow-x: auto;
}
    .overflow-y-auto {
  overflow-y: auto;
}
    .overflow-x-hidden {
  overflow-x: hidden;
}
    .overflow-y-hidden {
  overflow-y: hidden;
}
    .overflow-x-clip {
  overflow-x: clip;
}
    .overflow-y-clip {
  overflow-y: clip;
}
    .overflow-x-visible {
  overflow-x: visible;
}
    .overflow-y-visible {
  overflow-y: visible;
}
    .overflow-x-scroll {
  overflow-x: scroll;
}
    .overflow-y-scroll {
  overflow-y: scroll;
}
    .overscroll-auto {
  overscroll-behavior: auto;
}
    .overscroll-contain {
  overscroll-behavior: contain;
}
    .overscroll-none {
  overscroll-behavior: none;
}
    .overscroll-y-auto {
  overscroll-behavior-y: auto;
}
    .overscroll-y-contain {
  overscroll-behavior-y: contain;
}
    .overscroll-y-none {
  overscroll-behavior-y: none;
}
    .overscroll-x-auto {
  overscroll-behavior-x: auto;
}
    .overscroll-x-contain {
  overscroll-behavior-x: contain;
}
    .overscroll-x-none {
  overscroll-behavior-x: none;
}
    .scroll-auto {
  scroll-behavior: auto;
}
    .scroll-smooth {
  scroll-behavior: smooth;
}
    .truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
    .overflow-ellipsis {
  text-overflow: ellipsis;
}
    .text-ellipsis {
  text-overflow: ellipsis;
}
    .text-clip {
  text-overflow: clip;
}
    .hyphens-none {
  -webkit-hyphens: none;
          hyphens: none;
}
    .hyphens-manual {
  -webkit-hyphens: manual;
          hyphens: manual;
}
    .hyphens-auto {
  -webkit-hyphens: auto;
          hyphens: auto;
}
    .whitespace-normal {
  white-space: normal;
}
    .whitespace-nowrap {
  white-space: nowrap;
}
    .whitespace-pre {
  white-space: pre;
}
    .whitespace-pre-line {
  white-space: pre-line;
}
    .whitespace-pre-wrap {
  white-space: pre-wrap;
}
    .whitespace-break-spaces {
  white-space: break-spaces;
}
    .text-wrap {
  text-wrap: wrap;
}
    .text-nowrap {
  text-wrap: nowrap;
}
    .text-balance {
  text-wrap: balance;
}
    .text-pretty {
  text-wrap: pretty;
}
    .break-normal {
  overflow-wrap: normal;
  word-break: normal;
}
    .break-words {
  overflow-wrap: break-word;
}
    .break-all {
  word-break: break-all;
}
    .break-keep {
  word-break: keep-all;
}
    .rounded {
  border-radius: 0.25rem;
}
    .rounded-md {
  border-radius: 0.375rem;
}
    .rounded-b {
  border-bottom-right-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}
    .rounded-e {
  border-start-end-radius: 0.25rem;
  border-end-end-radius: 0.25rem;
}
    .rounded-l {
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}
    .rounded-r {
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}
    .rounded-s {
  border-start-start-radius: 0.25rem;
  border-end-start-radius: 0.25rem;
}
    .rounded-t {
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}
    .rounded-bl {
  border-bottom-left-radius: 0.25rem;
}
    .rounded-br {
  border-bottom-right-radius: 0.25rem;
}
    .rounded-ee {
  border-end-end-radius: 0.25rem;
}
    .rounded-es {
  border-end-start-radius: 0.25rem;
}
    .rounded-se {
  border-start-end-radius: 0.25rem;
}
    .rounded-ss {
  border-start-start-radius: 0.25rem;
}
    .rounded-tl {
  border-top-left-radius: 0.25rem;
}
    .rounded-tr {
  border-top-right-radius: 0.25rem;
}
    .border {
  border-width: 1px;
}
    .border-x {
  border-left-width: 1px;
  border-right-width: 1px;
}
    .border-y {
  border-top-width: 1px;
  border-bottom-width: 1px;
}
    .border-b {
  border-bottom-width: 1px;
}
    .border-e {
  border-inline-end-width: 1px;
}
    .border-l {
  border-left-width: 1px;
}
    .border-r {
  border-right-width: 1px;
}
    .border-s {
  border-inline-start-width: 1px;
}
    .border-t {
  border-top-width: 1px;
}
    .border-solid {
  border-style: solid;
}
    .border-dashed {
  border-style: dashed;
}
    .border-dotted {
  border-style: dotted;
}
    .border-double {
  border-style: double;
}
    .border-hidden {
  border-style: hidden;
}
    .border-none {
  border-style: none;
}
    .bg-\[rgb\(255\2c 0\2c 0\)\] {
  --tw-bg-opacity: 1;
  background-color: rgb(255 0 0 / var(--tw-bg-opacity));
}
    .bg-gray-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(229 231 235 / var(--tw-bg-opacity));
}
    .decoration-slice {
  -webkit-box-decoration-break: slice;
          box-decoration-break: slice;
}
    .decoration-clone {
  -webkit-box-decoration-break: clone;
          box-decoration-break: clone;
}
    .box-decoration-slice {
  -webkit-box-decoration-break: slice;
          box-decoration-break: slice;
}
    .box-decoration-clone {
  -webkit-box-decoration-break: clone;
          box-decoration-break: clone;
}
    .bg-fixed {
  background-attachment: fixed;
}
    .bg-local {
  background-attachment: local;
}
    .bg-scroll {
  background-attachment: scroll;
}
    .bg-clip-border {
  background-clip: border-box;
}
    .bg-clip-padding {
  background-clip: padding-box;
}
    .bg-clip-content {
  background-clip: content-box;
}
    .bg-clip-text {
  -webkit-background-clip: text;
          background-clip: text;
}
    .bg-repeat {
  background-repeat: repeat;
}
    .bg-no-repeat {
  background-repeat: no-repeat;
}
    .bg-repeat-x {
  background-repeat: repeat-x;
}
    .bg-repeat-y {
  background-repeat: repeat-y;
}
    .bg-repeat-round {
  background-repeat: round;
}
    .bg-repeat-space {
  background-repeat: space;
}
    .bg-origin-border {
  background-origin: border-box;
}
    .bg-origin-padding {
  background-origin: padding-box;
}
    .bg-origin-content {
  background-origin: content-box;
}
    .object-contain {
  -o-object-fit: contain;
     object-fit: contain;
}
    .object-cover {
  -o-object-fit: cover;
     object-fit: cover;
}
    .object-fill {
  -o-object-fit: fill;
     object-fit: fill;
}
    .object-none {
  -o-object-fit: none;
     object-fit: none;
}
    .object-scale-down {
  -o-object-fit: scale-down;
     object-fit: scale-down;
}
    .object-center {
  -o-object-position: center;
     object-position: center;
}
    .px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
    .px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
    .py-16 {
  padding-top: 4rem;
  padding-bottom: 4rem;
}
    .text-left {
  text-align: left;
}
    .text-center {
  text-align: center;
}
    .text-right {
  text-align: right;
}
    .text-justify {
  text-align: justify;
}
    .text-start {
  text-align: start;
}
    .text-end {
  text-align: end;
}
    .align-baseline {
  vertical-align: baseline;
}
    .align-top {
  vertical-align: top;
}
    .align-middle {
  vertical-align: middle;
}
    .align-bottom {
  vertical-align: bottom;
}
    .align-text-top {
  vertical-align: text-top;
}
    .align-text-bottom {
  vertical-align: text-bottom;
}
    .align-sub {
  vertical-align: sub;
}
    .align-super {
  vertical-align: super;
}
    .text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
    .font-bold {
  font-weight: 700;
}
    .font-medium {
  font-weight: 500;
}
    .uppercase {
  text-transform: uppercase;
}
    .lowercase {
  text-transform: lowercase;
}
    .capitalize {
  text-transform: capitalize;
}
    .normal-case {
  text-transform: none;
}
    .italic {
  font-style: italic;
}
    .not-italic {
  font-style: normal;
}
    .normal-nums {
  font-variant-numeric: normal;
}
    .ordinal {
  --tw-ordinal: ordinal;
  font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
}
    .slashed-zero {
  --tw-slashed-zero: slashed-zero;
  font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
}
    .lining-nums {
  --tw-numeric-figure: lining-nums;
  font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
}
    .oldstyle-nums {
  --tw-numeric-figure: oldstyle-nums;
  font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
}
    .proportional-nums {
  --tw-numeric-spacing: proportional-nums;
  font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
}
    .tabular-nums {
  --tw-numeric-spacing: tabular-nums;
  font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
}
    .diagonal-fractions {
  --tw-numeric-fraction: diagonal-fractions;
  font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
}
    .stacked-fractions {
  --tw-numeric-fraction: stacked-fractions;
  font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
}
    .text-\[\#336699\]\/\[\.35\] {
  color: rgb(51 102 153 / .35);
}
    .text-blue-500 {
  --tw-text-opacity: 1;
  color: rgb(59 130 246 / var(--tw-text-opacity));
}
    .text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity));
}
    .text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity));
}
    .text-gray-900 {
  --tw-text-opacity: 1;
  color: rgb(17 24 39 / var(--tw-text-opacity));
}
    .underline {
  text-decoration-line: underline;
}
    .overline {
  text-decoration-line: overline;
}
    .line-through {
  text-decoration-line: line-through;
}
    .no-underline {
  text-decoration-line: none;
}
    .decoration-solid {
  text-decoration-style: solid;
}
    .decoration-double {
  text-decoration-style: double;
}
    .decoration-dotted {
  text-decoration-style: dotted;
}
    .decoration-dashed {
  text-decoration-style: dashed;
}
    .decoration-wavy {
  text-decoration-style: wavy;
}
    .antialiased {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
    .subpixel-antialiased {
  -webkit-font-smoothing: auto;
  -moz-osx-font-smoothing: auto;
}
    .opacity-75 {
  opacity: 0.75;
}
    .bg-blend-normal {
  background-blend-mode: normal;
}
    .bg-blend-multiply {
  background-blend-mode: multiply;
}
    .bg-blend-screen {
  background-blend-mode: screen;
}
    .bg-blend-overlay {
  background-blend-mode: overlay;
}
    .bg-blend-darken {
  background-blend-mode: darken;
}
    .bg-blend-lighten {
  background-blend-mode: lighten;
}
    .bg-blend-color-dodge {
  background-blend-mode: color-dodge;
}
    .bg-blend-color-burn {
  background-blend-mode: color-burn;
}
    .bg-blend-hard-light {
  background-blend-mode: hard-light;
}
    .bg-blend-soft-light {
  background-blend-mode: soft-light;
}
    .bg-blend-difference {
  background-blend-mode: difference;
}
    .bg-blend-exclusion {
  background-blend-mode: exclusion;
}
    .bg-blend-hue {
  background-blend-mode: hue;
}
    .bg-blend-saturation {
  background-blend-mode: saturation;
}
    .bg-blend-color {
  background-blend-mode: color;
}
    .bg-blend-luminosity {
  background-blend-mode: luminosity;
}
    .mix-blend-normal {
  mix-blend-mode: normal;
}
    .mix-blend-multiply {
  mix-blend-mode: multiply;
}
    .mix-blend-screen {
  mix-blend-mode: screen;
}
    .mix-blend-overlay {
  mix-blend-mode: overlay;
}
    .mix-blend-darken {
  mix-blend-mode: darken;
}
    .mix-blend-lighten {
  mix-blend-mode: lighten;
}
    .mix-blend-color-dodge {
  mix-blend-mode: color-dodge;
}
    .mix-blend-color-burn {
  mix-blend-mode: color-burn;
}
    .mix-blend-hard-light {
  mix-blend-mode: hard-light;
}
    .mix-blend-soft-light {
  mix-blend-mode: soft-light;
}
    .mix-blend-difference {
  mix-blend-mode: difference;
}
    .mix-blend-exclusion {
  mix-blend-mode: exclusion;
}
    .mix-blend-hue {
  mix-blend-mode: hue;
}
    .mix-blend-saturation {
  mix-blend-mode: saturation;
}
    .mix-blend-color {
  mix-blend-mode: color;
}
    .mix-blend-luminosity {
  mix-blend-mode: luminosity;
}
    .mix-blend-plus-darker {
  mix-blend-mode: plus-darker;
}
    .mix-blend-plus-lighter {
  mix-blend-mode: plus-lighter;
}
    .\!shadow {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1) !important;
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color) !important;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow) !important;
}
    .shadow {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
    .outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
    .outline {
  outline-style: solid;
}
    .outline-dashed {
  outline-style: dashed;
}
    .outline-dotted {
  outline-style: dotted;
}
    .outline-double {
  outline-style: double;
}
    .ring {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
    .ring-inset {
  --tw-ring-inset: inset;
}
    .blur {
  --tw-blur: blur(8px);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
    .drop-shadow {
  --tw-drop-shadow: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
    .grayscale {
  --tw-grayscale: grayscale(100%);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
    .invert {
  --tw-invert: invert(100%);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
    .sepia {
  --tw-sepia: sepia(100%);
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
    .\!filter {
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow) !important;
}
    .filter {
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
    .filter-none {
  filter: none;
}
    .backdrop-blur {
  --tw-backdrop-blur: blur(8px);
  -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
          backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
}
    .backdrop-grayscale {
  --tw-backdrop-grayscale: grayscale(100%);
  -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
          backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
}
    .backdrop-invert {
  --tw-backdrop-invert: invert(100%);
  -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
          backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
}
    .backdrop-sepia {
  --tw-backdrop-sepia: sepia(100%);
  -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
          backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
}
    .backdrop-filter {
  -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
          backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
}
    .backdrop-filter-none {
  -webkit-backdrop-filter: none;
          backdrop-filter: none;
}
    .transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
    .ease-in {
  transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
}
    .ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
    .ease-out {
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
}
    .contain-none {
  contain: none;
}
    .contain-content {
  contain: content;
}
    .contain-strict {
  contain: strict;
}
    .contain-size {
  --tw-contain-size: size;
  contain: var(--tw-contain-size) var(--tw-contain-layout) var(--tw-contain-paint) var(--tw-contain-style);
}
    .contain-inline-size {
  --tw-contain-size: inline-size;
  contain: var(--tw-contain-size) var(--tw-contain-layout) var(--tw-contain-paint) var(--tw-contain-style);
}
    .contain-layout {
  --tw-contain-layout: layout;
  contain: var(--tw-contain-size) var(--tw-contain-layout) var(--tw-contain-paint) var(--tw-contain-style);
}
    .contain-paint {
  --tw-contain-paint: paint;
  contain: var(--tw-contain-size) var(--tw-contain-layout) var(--tw-contain-paint) var(--tw-contain-style);
}
    .contain-style {
  --tw-contain-style: style;
  contain: var(--tw-contain-size) var(--tw-contain-layout) var(--tw-contain-paint) var(--tw-contain-style);
}
    .content-\[\'this-is-also-valid\]-weirdly-enough\'\] {
  --tw-content: 'this-is-also-valid]-weirdly-enough';
  content: var(--tw-content);
}
    .forced-color-adjust-auto {
  forced-color-adjust: auto;
}
    .forced-color-adjust-none {
  forced-color-adjust: none;
}
    @media (min-width: 640px) {

  .sm\:container {
    width: 100%;
  }

  @media (min-width: 640px) {

    .sm\:container {
      max-width: 640px;
    }
  }

  @media (min-width: 768px) {

    .sm\:container {
      max-width: 768px;
    }
  }

  @media (min-width: 1024px) {

    .sm\:container {
      max-width: 1024px;
    }
  }

  @media (min-width: 1280px) {

    .sm\:container {
      max-width: 1280px;
    }
  }

  @media (min-width: 1536px) {

    .sm\:container {
      max-width: 1536px;
    }
  }
}
    @media (min-width: 1024px) {

  .lg\:aspect-none {
    position: static;
    padding-bottom: 0;
  }

  .lg\:aspect-none > * {
    position: static;
    height: auto;
    width: auto;
    top: auto;
    right: auto;
    bottom: auto;
    left: auto;
  }
}
    .hover\:font-bold:hover {
  font-weight: 700;
}
    .before\:hover\:text-center:hover::before {
  content: var(--tw-content);
  text-align: center;
}
    .hover\:before\:text-center:hover::before {
  content: var(--tw-content);
  text-align: center;
}
    .focus\:hover\:text-center:hover:focus {
  text-align: center;
}
    .hover\:focus\:text-center:focus:hover {
  text-align: center;
}
    .group:hover .group-hover\:opacity-75 {
  opacity: 0.75;
}
    @media (min-width: 640px) {

  .sm\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .sm\:px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .sm\:py-24 {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }

  .sm\:underline {
    text-decoration-line: underline;
  }
}
    @media (min-width: 1024px) {

  .lg\:h-80 {
    height: 20rem;
  }

  .lg\:h-full {
    height: 100%;
  }

  .lg\:w-full {
    width: 100%;
  }

  .lg\:max-w-7xl {
    max-width: 80rem;
  }

  .lg\:grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .lg\:px-8 {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
    @media (min-width: 1280px) {

  .xl\:gap-x-8 {
    -moz-column-gap: 2rem;
         column-gap: 2rem;
  }
}
    @media (prefers-color-scheme: dark) {

  @media (min-width: 1024px) {

    .dark\:lg\:hover\:\[paint-order\:markers\]:hover {
      paint-order: markers;
    }
  }
}
    :host {
        display: block;
    }`,props:{name:String,price:String,imageSrc:String,imageAlt:String,href:String,color:String}}));function d(r){const t=new c().getArray("array");return t.push(r),t}i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`props => <y-array array={yarray(["from y-array!", "item 2"])}>
    <input $:placeholder="item" />
</y-array>`,...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`props => <y-array array={yarray([{
  firstName: "Hello",
  lastName: "Array!",
  style: {
    padding: "5px",
    margin: "5px"
  }
}, {
  firstName: "So",
  lastName: "Sweet!",
  style: {
    padding: "5px",
    margin: "5px"
  }
}])}>
    <input $:placeholder="firstName" $:style="style" />
    <input $:placeholder="lastName" $:style="style" /> 
</y-array>`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`props => {
  const lazyArray = new Y.Doc().getArray<{
    idx: number;
    text: string;
  }>("array");
  lazyArray.push([{
    text: "Lazy loading..",
    idx: 1
  }]);
  setInterval(() => {
    if (lazyArray.length >= 10) {
      lazyArray.delete(0, 5);
    }
    const idx = lazyArray.get(lazyArray.length - 1).idx + 1;
    lazyArray.push([{
      text: \`item \${idx}\`,
      idx: idx
    }]);
  }, 1000);
  return <y-array array={lazyArray}>
        <input $:placeholder="text" />
    </y-array>;
}`,...l.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`props => {
  const array = new Y.Doc().getArray("array");
  array.push([{
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black'
  }, {
    id: 2,
    name: 'Fashion Hat',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: "Fashion Hat.",
    price: '$25',
    color: 'Brown'
  }, {
    id: 3,
    name: 'Long Sleeve Shirt',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg',
    imageAlt: "Long Sleeve Shirt.",
    price: '$40',
    color: 'Blue'
  }, {
    id: 4,
    name: 'Simple Backpack',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg',
    imageAlt: "Simple Backpack.",
    price: '$70',
    color: 'Gray'
  }]);
  // array.push([{ name: "Product 2", price: 200, img: "https://via.placeholder.com/300" }])

  return <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
    <y-array array={array} style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "20px"
    }}>
       <product-card-example $:name={"name"} $:id={"id"} $:color={"color"} $:image-alt={"imageAlt"} $:image-src="imageSrc" $:price="price" $:href="href"></product-card-example>
    </y-array>
    </div>;
}`,...s.parameters?.docs?.source}}};const $=["Story","WithObjects","Lazy","Gallery"];export{s as Gallery,l as Lazy,i as Story,n as WithObjects,$ as __namedExportsOrder,A as default};