import{j as p}from"./jsx-runtime-DzeBifHW.js";import{Y as a}from"./index-DgonqdjB.js";import{d,Y as m,D as c,a as l}from"./core-abL_lBWD.js";import"./use-suspense-DTYBca5u.js";import"./decorator-D6U_tzFv.js";import"./index-Ds9HKYHo.js";import"./_commonjsHelpers-Cpj98o6Y.js";const E={title:"@y-block/fragment",...d(a),args:{fragment:s(["h1",{style:"color: red;"},"Hello YFragment"])}},Y=e=>p(a,{...e,fragment:s(["h3",{style:"color: green;"},"Hello YFragment"])}),N=e=>p(a,{...e,fragment:s(["input",{type:"password",placeholder:"Password"}])}),h=e=>p(a,{...e,fragment:s(["form",{style:"display: flex; flex-direction: column; gap: 1rem; background-color: #f9f9f9; padding: 1rem; border-radius: 0.5rem; border: 1px solid #ccc;"},[["input",{type:"text",placeholder:"First Name",style:"padding: 0.5rem; border-radius: 0.5rem; border: 1px solid #ccc;"}],["input",{type:"text",placeholder:"Last Name",style:"padding: 0.5rem; border-radius: 0.5rem; border: 1px solid #ccc;"}],["input",{type:"email",placeholder:"Email",style:"padding: 0.5rem; border-radius: 0.5rem; border: 1px solid #ccc;"}],["input",{type:"password",placeholder:"Password",style:"padding: 0.5rem; border-radius: 0.5rem; border: 1px solid #ccc;"}],["button",{type:"submit",style:"padding: 0.5rem; border-radius: 0.5rem; border: 1px solid #ccc; background-color: #333; color: white; cursor: pointer;"},"Submit"]]])});function i(e,t,r){if(t&&Object.entries(t).forEach(([o,n])=>{e.setAttribute(o,n)}),typeof r=="string")console.log("children string",{tag:e.nodeName,element:e.toJSON(),attrs:t,children:r}),e.push([new l(r)]);else if(r instanceof Array)if(r[0]instanceof Array)r.forEach(o=>{const n=new m(o[0]);e.push([n]),i(n,o[1],o[2])});else{console.log("children",{tag:r[0],element:e.toJSON(),attrs:t,children:r});const o=new m(r[0]);e.push([o]),i(o,r[1],r[2])}console.log({element:e.toJSON(),attrs:t,children:r})}function s([e,t,r]){const o=g([new m(e)]);return i(o.get(0),t,r),o}function g(e){const t=new c().getXmlFragment("fragment");return t.push(e),t}const O=["TextFragment","InputFragment","FormFragment"];export{h as FormFragment,N as InputFragment,Y as TextFragment,O as __namedExportsOrder,E as default};