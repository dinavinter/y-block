import{j as r}from"./jsx-runtime-XWGlzbgq.js";import{useMDXComponents as a}from"./index-DWQNtb9X.js";import{j as t,c as p,a as e}from"./jsx-runtime-DzeBifHW.js";import{c as l}from"./use-suspense-DTYBca5u.js";import"./_commonjsHelpers-Cpj98o6Y.js";function c(){return t("host",{shadowDom:!0})}customElements.define("story-card",l(c));function s(){return t("host",{shadowDom:!0,children:e("div",{class:"layout",children:[e("div",{class:"layout-left",children:[t("img",{src:"/logo-by-atomico.svg",alt:""}),e("h1",{children:[t("strong",{children:"Component system"}),t("br",{}),e("span",{children:["to exemplify the use of",t("br",{}),"Atomico + Storybook"]})]})]}),t("div",{class:"layout-right",children:t("div",{class:"layout-phone",children:t("img",{src:"/sample.webp",alt:""})})})]})})}s.props={title1:String,title2:String,subtitle:String};s.styles=p`:host {
        display: flex;
        width: 100%;
    }
    h1 {
        font-size: 40px;
        font-weight: 800;
    }
    h1 span {
        -webkit-text-fill-color: white;
        -webkit-text-stroke: 1px currentColor;
    }
    .layout {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        gap: 80px;
        justify-content: space-between;
    }
    .layout-phone {
        width: 340px;
        background: white;
        border-radius: 32px;
        box-shadow: rgba(0, 0, 0, 0.05) -120px 0px 120px,
            rgba(255, 0, 0, 0.1) -60px -60px 120px,
            rgba(0, 0, 255, 0.1) 60px 60px 120px;
        overflow: hidden;
    }

    .layout-phone img {
        width: 100%;
        display: block;
    }`;customElements.define("story-hero",l(s));function n(o){return r.jsx("story-hero",{})}function f(o={}){const{wrapper:i}={...a(),...o.components};return i?r.jsx(i,{...o,children:r.jsx(n,{...o})}):n()}export{f as default};
