import{a as s,j as e}from"./jsx-runtime-DzeBifHW.js";import{Y as y}from"./index-DTlJuLVT.js";import{d as l,D as o,b as c}from"./core-abL_lBWD.js";import"./index-yio_HcMv.js";import"./use-suspense-DTYBca5u.js";import"./use-ref-effect-CG-PCi_3.js";import"./decorator-D6U_tzFv.js";import"./index-Ds9HKYHo.js";import"./_commonjsHelpers-Cpj98o6Y.js";const b={title:"@y-block/map",...l(y)},p=n=>s("y-map",{map:i({key1:"value1",key2:"value2"}),children:[e("input",{"$:value":"key1"}),e("input",{"$:value":"key2"})]}),r=n=>e("y-map",{map:i({users:d([{name:"John Doe",age:30},{name:"Limor",age:25}])}),children:s("y-array",{"$:array":"users",children:[e("input",{"$:value":"name",style:{margin:"4px",padding:"4px"}}),e("input",{"$:value":"age",style:{margin:"4px",padding:"4px"}}),e("br",{})]})}),t=n=>{const a=new o().getMap("map");return a.set("text","Lazy loading.."),a.set("idx",1),setInterval(()=>{a.set("idx",a.get("idx")+1)},1e3),s("y-map",{map:a,children:[e("input",{"$:value":"text"}),e("input",{"$:value":"idx",type:"number"})]})};function i(n){const a=new o().getMap("map");return Object.entries(n).forEach(([m,u])=>{a.set(m,u)}),a}function d(n){const a=new c;return a.push(n),a}p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`props => <y-map map={ymap({
  key1: "value1",
  key2: "value2"
})}>
    <input $:value="key1"></input>
    <input $:value="key2"></input>

</y-map>`,...p.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`props => <y-map map={ymap({
  users: yarray([{
    name: "John Doe",
    age: 30
  }, {
    name: "Limor",
    age: 25
  }])
})}>
        <y-array $:array="users">
            <input $:value="name" style={{
      margin: "4px",
      padding: "4px"
    }}></input>
            <input $:value="age" style={{
      margin: "4px",
      padding: "4px"
    }}></input>
            <br />
        </y-array>
    </y-map>`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`props => {
  const lazyMap = new Y.Doc().getMap("map");
  lazyMap.set("text", "Lazy loading..");
  lazyMap.set("idx", 1);
  setInterval(() => {
    lazyMap.set("idx", lazyMap.get("idx") + 1);
  }, 1000);
  return <y-map map={lazyMap}>
        <input $:value="text"></input>
        <input $:value="idx" type={"number"}></input>
    </y-map>;
}`,...t.parameters?.docs?.source}}};const L=["BasicMap","ComplexMap","LazyMap"];export{p as BasicMap,r as ComplexMap,t as LazyMap,L as __namedExportsOrder,b as default};
