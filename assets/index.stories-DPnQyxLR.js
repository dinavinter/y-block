import{c as C,a as y,j as l}from"./jsx-runtime-DzeBifHW.js";import{Y as E,d as L,D as Y}from"./core-abL_lBWD.js";import{c as B,b as S,a as v,u as H,M as D}from"./use-suspense-DTYBca5u.js";import{u as b,a as j}from"./use-ref-effect-CG-PCi_3.js";import"./index-DgonqdjB.js";import"./decorator-D6U_tzFv.js";import"./index-Ds9HKYHo.js";import"./_commonjsHelpers-Cpj98o6Y.js";function w(e,n,r,o){return e.addEventListener(n,r,o),()=>e.removeEventListener(n,r)}function M(e,n){const[r,o]=b([]);return j(()=>{const{current:s}=e;if(!s)return;const a=()=>o(s.assignedNodes().filter(i=>!(i instanceof D)&&(n?n(i):!0)));return a(),w(s,"slotchange",a)},[e]),r}function A(e,n){const r=H(),o=M(e,n),[s,a]=b(o),i=u=>u.parentElement===r.current;return v(()=>{o.length&&a([...s,...o].filter(i))},o),v(()=>{if(!s.length)return;const u=new Set(s.map(m=>m.assignedSlot));u.delete(e.current);const x=[...u].map(m=>w(m,"slotchange",()=>a(t=>{const p=t.filter(i);return t.length===p.length?t:p})));return()=>x.map(m=>m())},s),s}const N=B(function({element:e}){const[n,r]=b({}),[o,s]=b([]),a=S(),i=S(),u=A(a,t=>t instanceof HTMLElement),x=A(i,t=>t instanceof HTMLElement);v(()=>{e&&(console.debug("YElement:useEffect",e.nodeName,{element:e.toJSON()},x),r(e.getAttributes()),s(e.toArray()),e.observe(t=>{console.log("YElement:observe",e.nodeName,{event:t,element:e.toJSON()}),r(e.getAttributes()),s(e.toArray())}))},[e]);function m(t,p){return console.log("YElement:getSharedProps",{Template:t,attributes:p}),t.getAttributeNames().filter(c=>c.startsWith(":")).reduce((c,k)=>{const z=k.replace(":",""),X=t.getAttribute(k);return c[z]=p[X||z],c},{})}return y("host",{shadowDom:!0,children:[l("template",{children:l("slot",{ref:a})}),l("template",{children:l("slot",{ref:i,name:"each"})}),u.map(t=>l(t,{cloneNode:!0,...m(t,{...n,"*":e})})),o.map((t,p)=>x.map(c=>l(c,{cloneNode:!0,...m(c,{element:t,text:t,hook:t,"*":t})})))]})},{props:{element:{type:E,reflect:!1}},styles:C`:host{display:block}`});customElements.define("y-element",N);const W={title:"@y-block/element",...L(N)},$=new Y,g=e=>y("y-element",{element:d($.getXmlElement("basic"),{key1:"value1",key2:"value2"}),children:[l("input",{"$:value":"key1"}),l("input",{"$:value":"key2"})]}),h=e=>y("y-element",{element:d($.getXmlElement("container"),{title:"container"},d(new E("nested"),{a:"child 0",b:"$@#"}),d(new E("nested"),{a:"child 1",b:"##"})),children:[l("input",{"$:value":"title"}),y("y-element",{"$:element":"element",slot:"each",style:{padding:"6px",marginBlock:"6px"},children:[l("input",{"$:placeholder":"a",style:{margin:"3px",padding:"6px"}}),l("input",{"$:placeholder":"b",style:{margin:"3px",padding:"6px"}})]})]}),f=e=>{const n=d($.getXmlElement("lazy"),{text:"Lazy loading..",idx:1});return setInterval(()=>{const r=n.getAttribute("idx")+1;n.setAttribute("idx",r),n.insert(0,[d(new E("lazy-child"),{idx:n.length})])},1e3),y("y-element",{element:n,style:{maxHeight:"6rem",display:"flex",flexDirection:"revert-layer",overflow:"hidden"},children:[l("input",{"$:value":"text"}),l("input",{"$:value":"idx",type:"number"}),l("y-element",{"$:element":"element",slot:"each",style:{padding:"6px",marginBlock:"6px"},children:l("input",{"$:value":"idx",type:"number"})})]})};function d(e,n,...r){return Object.entries(n).forEach(([o,s])=>{e.setAttribute(o,s)}),r?.length>0&&e.insert(0,r),e}g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`props => <y-element element={element(doc.getXmlElement("basic"), {
  key1: "value1",
  key2: "value2"
})}>
    <input $:value="key1"></input>
    <input $:value="key2"></input>
</y-element>`,...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`props => {
  return <y-element element={element(doc.getXmlElement("container"), {
    title: "container"
  }, element(new Y.XmlElement("nested"), {
    a: "child 0",
    b: "$@#"
  }), element(new Y.XmlElement("nested"), {
    a: "child 1",
    b: "##"
  }))}> 
        <input $:value={"title"} />
        <y-element $:element="element" slot={"each"} style={{
      padding: "6px",
      marginBlock: "6px"
    }}>
            <input $:placeholder="a" style={{
        margin: "3px",
        padding: "6px"
      }}></input>
            <input $:placeholder="b" style={{
        margin: "3px",
        padding: "6px"
      }}></input>
        </y-element>
    </y-element>;
}`,...h.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`props => {
  const lazyElement = element(doc.getXmlElement("lazy"), {
    "text": "Lazy loading..",
    "idx": 1
  });
  setInterval(() => {
    const idx = lazyElement.getAttribute("idx") + 1;
    lazyElement.setAttribute("idx", idx);
    lazyElement.insert(0, [element(new Y.XmlElement("lazy-child"), {
      idx: lazyElement.length
    })]);
  }, 1000);
  return <y-element element={lazyElement} style={{
    maxHeight: "6rem",
    display: "flex",
    flexDirection: "revert-layer",
    overflow: "hidden"
  }}>
        <input $:value="text"></input>
        <input $:value="idx" type={"number"}></input>
        <y-element $:element="element" slot={"each"} style={{
      padding: "6px",
      marginBlock: "6px"
    }}>
            <input $:value="idx" type={"number"}></input> 
        </y-element>
    </y-element>;
}`,...f.parameters?.docs?.source}}};const q=["BasicElement","ComplexElement","LazyElement"];export{g as BasicElement,h as ComplexElement,f as LazyElement,q as __namedExportsOrder,W as default};
