import{d as l}from"./index-DrFu-skq.js";import{j as _}from"./lit-element-CenEXOuS.js";/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const O=(o,t)=>t===void 0?o?._$litType$!==void 0:o?._$litType$===t,{global:h}=__STORYBOOK_MODULE_GLOBAL__,{simulatePageLoad:s,simulateDOMContentLoaded:u}=__STORYBOOK_MODULE_PREVIEW_API__;var{Node:y}=h,m=(o,t)=>{let{id:p,component:i}=t;if(!i)throw new Error(`Unable to render story ${p} as the component annotation is missing from the default export`);let n=document.createElement(i);return Object.entries(o).forEach(([d,e])=>{n[d]=e}),n};function M({storyFn:o,kind:t,name:p,showMain:i,showError:n,forceRemount:d},e){let r=o();if(i(),O(r)){(d||!e.querySelector('[id="root-inner"]'))&&(e.innerHTML='<div id="root-inner"></div>');let f=e.querySelector('[id="root-inner"]');_(r,f),s(e)}else if(typeof r=="string")e.innerHTML=r,s(e);else if(r instanceof y){if(e.firstChild===r&&!d)return;e.innerHTML="",e.appendChild(r),u()}else n({title:`Expecting an HTML snippet or DOM node from the story: "${p}" of "${t}".`,description:l`
        Did you forget to return the HTML snippet from the story?
        Use "() => <your snippet or node>" or when defining the story.
      `})}var a={renderer:"web-components"};export{a as parameters,m as render,M as renderToCanvas};
