import{j as l}from"./jsx-runtime-DzeBifHW.js";import{Y as p}from"./index-DgonqdjB.js";import{d as g,Y as c,D as u,a as f}from"./core-abL_lBWD.js";import"./use-suspense-DTYBca5u.js";import"./decorator-D6U_tzFv.js";import"./index-Ds9HKYHo.js";import"./_commonjsHelpers-Cpj98o6Y.js";const N={title:"@y-block/fragment",...g(p),args:{fragment:m(["h1",{style:"color: red;"},"Hello YFragment"])}},n=r=>l(p,{...r,fragment:m(["h3",{style:"color: green;"},"Hello YFragment"])}),s=r=>l(p,{...r,fragment:m(["input",{type:"password",placeholder:"Password"}])}),d=r=>l(p,{...r,fragment:m(["form",{style:"display: flex; flex-direction: column; gap: 1rem; background-color: #f9f9f9; padding: 1rem; border-radius: 0.5rem; border: 1px solid #ccc;"},[["input",{type:"text",placeholder:"First Name",style:"padding: 0.5rem; border-radius: 0.5rem; border: 1px solid #ccc;"}],["input",{type:"text",placeholder:"Last Name",style:"padding: 0.5rem; border-radius: 0.5rem; border: 1px solid #ccc;"}],["input",{type:"email",placeholder:"Email",style:"padding: 0.5rem; border-radius: 0.5rem; border: 1px solid #ccc;"}],["input",{type:"password",placeholder:"Password",style:"padding: 0.5rem; border-radius: 0.5rem; border: 1px solid #ccc;"}],["button",{type:"submit",style:"padding: 0.5rem; border-radius: 0.5rem; border: 1px solid #ccc; background-color: #333; color: white; cursor: pointer;"},"Submit"]]])});function i(r,t,e){if(t&&Object.entries(t).forEach(([o,a])=>{r.setAttribute(o,a)}),typeof e=="string")console.log("children string",{tag:r.nodeName,element:r.toJSON(),attrs:t,children:e}),r.push([new f(e)]);else if(e instanceof Array)if(e[0]instanceof Array)e.forEach(o=>{const a=new c(o[0]);r.push([a]),i(a,o[1],o[2])});else{console.log("children",{tag:e[0],element:r.toJSON(),attrs:t,children:e});const o=new c(e[0]);r.push([o]),i(o,e[1],e[2])}console.log({element:r.toJSON(),attrs:t,children:e})}function m([r,t,e]){const o=y([new c(r)]);return i(o.get(0),t,e),o}function y(r){const t=new u().getXmlFragment("fragment");return t.push(r),t}n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`props => <YFragment {...props} fragment={yfragment(["h3", {
  style: "color: green;"
}, "Hello YFragment"])}></YFragment>`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`props => <YFragment {...props} fragment={yfragment(["input", {
  type: "password",
  placeholder: "Password"
}])}></YFragment>`,...s.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`props => <YFragment {...props} fragment={yfragment(["form", {
  style: "display: flex; flex-direction: column; gap: 1rem; background-color: #f9f9f9; padding: 1rem; border-radius: 0.5rem; border: 1px solid #ccc;"
}, [["input", {
  type: "text",
  placeholder: "First Name",
  style: "padding: 0.5rem; border-radius: 0.5rem; border: 1px solid #ccc;"
}], ["input", {
  type: "text",
  placeholder: "Last Name",
  style: "padding: 0.5rem; border-radius: 0.5rem; border: 1px solid #ccc;"
}], ["input", {
  type: "email",
  placeholder: "Email",
  style: "padding: 0.5rem; border-radius: 0.5rem; border: 1px solid #ccc;"
}], ["input", {
  type: "password",
  placeholder: "Password",
  style: "padding: 0.5rem; border-radius: 0.5rem; border: 1px solid #ccc;"
}], ["button", {
  type: "submit",
  style: "padding: 0.5rem; border-radius: 0.5rem; border: 1px solid #ccc; background-color: #333; color: white; cursor: pointer;"
}, "Submit"]]])}>

    </YFragment>`,...d.parameters?.docs?.source}}};const S=["TextFragment","InputFragment","FormFragment"];export{d as FormFragment,s as InputFragment,n as TextFragment,S as __namedExportsOrder,N as default};
