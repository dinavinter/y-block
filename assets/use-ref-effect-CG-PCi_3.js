import{d as a,e as f,i,u as d,f as p}from"./use-suspense-DTYBca5u.js";class m extends Array{constructor(t,o){let s=!0;const e=n=>{try{o(n,this,s)}finally{s=!1}};super(void 0,e,o),e(t)}}const h=u=>{const t=a();return f((o=new m(u,(s,e,n)=>{s=i(s)?s(e[0]):s,s!==e[0]&&(e[0]=s,n||t())}))=>o)},w=(u,t)=>{const o=d();p(()=>{let s=!1,e,n=()=>{e&&e(),e=null};const r=async()=>{s||(s=!0,await o.current.updated,n(),s=!1,e=u())},l=t.map(c=>c?.on(r));return o.once||(o.once=!0,r()),()=>{l.map(c=>c&&c()),n()}},t)};export{w as a,h as u};
