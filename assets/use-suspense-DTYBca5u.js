class X{#t;#e=new Set;constructor(t){this.#t=t}get current(){return this.#t}set current(t){this.#t!=t&&(this.#t=t,this.#e.forEach(o=>o(t)))}on(t){return this.#e.add(t),()=>this.#e.delete(t)}}const w=e=>new X(e),_=Symbol.for("atomico.hooks");globalThis[_]=globalThis[_]||{};let g=globalThis[_];const q=Symbol.for("Atomico.suspense"),$=Symbol.for("Atomico.effect"),Z=Symbol.for("Atomico.layoutEffect"),B=Symbol.for("Atomico.insertionEffect"),j=(e,t,o)=>{const{i:s,hooks:n}=g.c,r=n[s]=n[s]||{};return r.value=e(r.value),r.effect=t,r.tag=o,g.c.i++,n[s].value},G=e=>j((t=w(e))=>t),Q=()=>j((e=w(g.c.host))=>e),Rt=()=>g.c.update,W=(e,t,o=0)=>{let s={},n=!1;const r=()=>n,l=(f,c)=>{for(const u in s){const i=s[u];i.effect&&i.tag===f&&(i.value=i.effect(i.value,c))}};return{load:f=>{g.c={host:t,hooks:s,update:e,i:0,id:o};let c;try{n=!1,c=f()}catch(u){if(u!==q)throw u;n=!0}finally{g.c=null}return c},cleanEffects:f=>(l(B,f),()=>(l(Z,f),()=>{l($,f)})),isSuspense:r}},T=Symbol.for;function v(e,t){const o=e.length;if(o!==t.length)return!1;for(let s=0;s<o;s++){let n=e[s],r=t[s];if(n!==r)return!1}return!0}const y=e=>typeof e=="function",N=e=>typeof e=="object",{isArray:x}=Array,I=(e,t)=>(t?e instanceof HTMLStyleElement:!0)&&"hydrate"in(e?.dataset||{});function F(e,t){let o;const s=n=>{let{length:r}=n;for(let l=0;l<r;l++){const m=n[l];if(m&&Array.isArray(m))s(m);else{const a=typeof m;if(m==null||a==="function"||a==="boolean")continue;a==="string"||a==="number"?(o==null&&(o=""),o+=m):(o!=null&&(t(o),o=null),t(m))}}};s(e),o!=null&&t(o)}const Y=(e,t,o)=>(e.addEventListener(t,o),()=>e.removeEventListener(t,o));class H{constructor(t,o,s){this.message=o,this.target=t,this.value=s}}class V extends H{}class tt extends H{}const A="Custom",et=null,st={true:1,"":1,1:1};function ot(e,t,o,s,n){const{type:r,reflect:l,event:m,value:a,attr:f=rt(t)}=o?.name!=A&&N(o)&&o!=et?o:{type:o},c=r?.name===A&&r.map,u=a!=null?r==Function||!y(a)?()=>a:a:null;Object.defineProperty(e,t,{configurable:!0,set(i){const h=this[t];u&&r!=Boolean&&i==null&&(i=u());const{error:b,value:E}=(c?lt:ft)(r,i);if(b&&E!=null)throw new V(this,`The value defined for prop '${t}' must be of type '${r.name}'`,E);h!=E&&(this._props[t]=E??void 0,this.update(),m&&nt(this,m),this.updated.then(()=>{l&&(this._ignoreAttr=f,it(this,r,f,this[t]),this._ignoreAttr=null)}))},get(){return this._props[t]}}),u&&(n[t]=u()),s[f]={prop:t,type:r}}const nt=(e,{type:t,base:o=CustomEvent,...s})=>e.dispatchEvent(new o(t,s)),rt=e=>e.replace(/([A-Z])/g,"-$1").toLowerCase(),it=(e,t,o,s)=>s==null||t==Boolean&&!s?e.removeAttribute(o):e.setAttribute(o,t?.name===A&&t?.serialize?t?.serialize(s):N(s)?JSON.stringify(s):t==Boolean?"":s),ct=(e,t)=>e==Boolean?!!st[t]:e==Number?Number(t):e==String?t:e==Array||e==Object?JSON.parse(t):e.name==A?t:new e(t),lt=({map:e},t)=>{try{return{value:e(t),error:!1}}catch{return{value:t,error:!0}}},ft=(e,t)=>e==null||t==null?{value:t,error:!1}:e!=String&&t===""?{value:void 0,error:!1}:e==Object||e==Array||e==Symbol?{value:t,error:{}.toString.call(t)!==`[object ${e.name}]`}:t instanceof e?{value:t,error:e==Number&&Number.isNaN(t.valueOf())}:e==String||e==Number||e==Boolean?{value:t,error:e==Number?typeof t!="number"?!0:Number.isNaN(t):e==String?typeof t!="string":typeof t!="boolean"}:{value:t,error:!0};let at=0;const ut=e=>{const t=(e?.dataset||{})?.hydrate||"";return t||"c"+at++},ht=(e,t=HTMLElement)=>{const o={},s={},n="prototype"in t&&t.prototype instanceof Element,r=n?t:"base"in t?t.base:HTMLElement,{props:l,styles:m}=n?e:t;class a extends r{constructor(){super(),this._setup(),this._render=()=>e({...this._props});for(const c in s)this[c]=s[c]}static get styles(){return[super.styles,m]}async _setup(){if(this._props)return;this._props={};let c,u;this.mounted=new Promise(d=>this.mount=()=>{d(),c!=this.parentNode&&(u!=c?this.unmounted.then(this.update):this.update()),c=this.parentNode}),this.unmounted=new Promise(d=>this.unmount=()=>{d(),(c!=this.parentNode||!this.isConnected)&&(i.cleanEffects(!0)()(),u=this.parentNode,c=null)}),this.symbolId=this.symbolId||Symbol(),this.symbolIdParent=Symbol();const i=W(()=>this.update(),this,ut(this));let h,b=!0;const E=I(this);this.update=()=>(h||(h=!0,this.updated=(this.updated||this.mounted).then(()=>{try{const d=i.load(this._render),p=i.cleanEffects();return d&&d.render(this,this.symbolId,E),h=!1,b&&!i.isSuspense()&&(b=!1,!E&&mt(this)),p()}finally{h=!1}}).then(d=>{d&&d()})),this.updated),this.update()}connectedCallback(){this.mount(),super.connectedCallback&&super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.unmount()}attributeChangedCallback(c,u,i){if(o[c]){if(c===this._ignoreAttr||u===i)return;const{prop:h,type:b}=o[c];try{this[h]=ct(b,i)}catch{throw new tt(this,`The value defined as attr '${c}' cannot be parsed by type '${b.name}'`,i)}}else super.attributeChangedCallback(c,u,i)}static get props(){return{...super.props,...l}}static get observedAttributes(){const c=super.observedAttributes||[];for(const u in l)ot(this.prototype,u,l[u],o,s);return Object.keys(o).concat(c)}}return a};function mt(e){const{styles:t}=e.constructor,{shadowRoot:o}=e;if(o&&t.length){const s=[];F(t,n=>{n&&(n instanceof Element?o.appendChild(n.cloneNode(!0)):s.push(n))}),s.length&&(o.adoptedStyleSheets=s)}}const U=e=>(t,o)=>{j(([s,n]=[])=>((n||!n)&&(n&&v(n,o)?s=s||!0:(y(s)&&s(),s=null)),[s,o]),([s,n],r)=>r?(y(s)&&s(),[]):[s||t(),n],e)},Mt=U($),dt=U(B),L=T("atomico/options");globalThis[L]=globalThis[L]||{sheet:!!document.adoptedStyleSheets};const z=globalThis[L];new Promise(e=>{z.ssr||(document.readyState==="loading"?Y(document,"DOMContentLoaded",e):e())});const pt={checked:1,value:1,selected:1},bt={list:1,type:1,size:1,form:1,width:1,height:1,src:1,href:1,slot:1},Et={shadowDom:1,staticNode:1,cloneNode:1,children:1,key:1},P={},R=[];class M extends Text{}const yt=T("atomico/id"),S=T("atomico/type"),O=T("atomico/ref"),J=T("atomico/vnode"),gt=()=>{};function Nt(e,t,o){return K(this,e,t,o)}const St=(e,t,...o)=>{const s=t||P;let{children:n}=s;if(n=n??(o.length?o:R),e===gt)return n;const r=e?e instanceof Node?1:e.prototype instanceof HTMLElement&&2:0;if(r===!1&&e instanceof Function)return e(n!=R?{children:n,...s}:s);const l=z.render||Nt;return{[S]:J,type:e,props:s,children:n,key:s.key,shadow:s.shadowDom,static:s.staticNode,raw:r,is:s.is,clone:s.cloneNode,render:l}};function K(e,t,o=yt,s,n){let r;if(t&&t[o]&&t[o].vnode==e||e[S]!=J)return t;(e||!t)&&(n=n||e.type=="svg",r=e.type!="host"&&(e.raw==1?(t&&e.clone?t[O]:t)!=e.type:e.raw==2?!(t instanceof e.type):t?t[O]||t.localName!=e.type:!t),r&&e.type!=null&&(e.raw==1&&e.clone?(s=!0,t=e.type.cloneNode(!0),t[O]=e.type):t=e.raw==1?e.type:e.raw==2?new e.type:n?document.createElementNS("http://www.w3.org/2000/svg",e.type):document.createElement(e.type,e.is?{is:e.is}:void 0)));const l=t[o]?t[o]:P,{vnode:m=P,cycle:a=0}=l;let{fragment:f,handlers:c}=l;const{children:u=R,props:i=P}=m;if(c=r?{}:c||{},e.static&&!r)return t;if(e.shadow&&!t.shadowRoot&&t.attachShadow({mode:"open",...e.shadow}),e.props!=i&&At(t,i,e.props,c,n),e.children!==u){const h=e.shadow?t.shadowRoot:t;f=Pt(e.children,f,h,o,!a&&s,n&&e.type=="foreignObject"?!1:n)}return t[o]={vnode:e,handlers:c,fragment:f,cycle:a+1},t}function Tt(e,t){const o=new M(""),s=new M("");let n;if(e[t?"prepend":"append"](o),t){let{lastElementChild:r}=e;for(;r;){const{previousElementSibling:l}=r;if(I(r,!0)&&!I(l,!0)){n=r;break}r=l}}return n?n.before(s):e.append(s),{markStart:o,markEnd:s}}function Pt(e,t,o,s,n,r){e=e==null?null:x(e)?e:[e];const l=t||Tt(o,n),{markStart:m,markEnd:a,keyes:f}=l;let c;const u=f&&new Set;let i=m;if(e&&F(e,h=>{if(typeof h=="object"&&!h[S])return;const b=h[S]&&h.key,E=f&&b!=null&&f.get(b);i!=a&&i===E?u.delete(i):i=i==a?a:i.nextSibling;const d=f?E:i;let p=d;if(h[S])p=K(h,d,s,n,r);else{const C=h+"";!(p instanceof Text)||p instanceof M?p=new Text(C):p.data!=C&&(p.data=C)}p!=i&&(f&&u.delete(p),!d||f?(o.insertBefore(p,i),f&&i!=a&&u.add(i)):d==a?o.insertBefore(p,a):(o.replaceChild(p,d),i=p)),b!=null&&(c=c||new Map,c.set(b,p))}),i=i==a?a:i.nextSibling,t&&i!=a)for(;i!=a;){const h=i;i=i.nextSibling,h.remove()}return u&&u.forEach(h=>h.remove()),l.keyes=c,l}function At(e,t,o,s,n){for(const r in t)!(r in o)&&k(e,r,t[r],null,n,s);for(const r in o)k(e,r,t[r],o[r],n,s)}function k(e,t,o,s,n,r){if(t=t=="class"&&!n?"className":t,o=o??null,s=s??null,t in e&&pt[t]&&(o=e[t]),!(s===o||Et[t]||t[0]=="_"))if(e.localName==="slot"&&t==="assignNode"&&"assign"in e)e.assign(s);else if(t[0]=="o"&&t[1]=="n"&&(y(s)||y(o)))Ct(e,t.slice(2),s,r);else if(t=="ref")s&&(y(s)?s(e):s.current=e);else if(t=="style"){const{style:l}=e;o=o||"",s=s||"";const m=N(o),a=N(s);if(m)for(const f in o)if(a)!(f in s)&&D(l,f,null);else break;if(a)for(const f in s){const c=s[f];m&&o[f]===c||D(l,f,c)}else l.cssText=s}else{const l=t[0]=="$"?t.slice(1):t;l===t&&(!n&&!bt[t]&&t in e||y(s)||y(o))?e[t]=s??"":s==null?e.removeAttribute(l):e.setAttribute(l,N(s)?JSON.stringify(s):s)}}function Ct(e,t,o,s){if(s.handleEvent||(s.handleEvent=n=>s[n.type].call(e,n)),o){if(!s[t]){const n=o.capture||o.once||o.passive?Object.assign({},o):null;e.addEventListener(t,s,n)}s[t]=o}else s[t]&&(e.removeEventListener(t,s),delete s[t])}function D(e,t,o){let s="setProperty";o==null&&(s="removeProperty",o=null),~t.indexOf("-")?e[s](t,o):e[t]=o}const Ot=St("host",{style:"display: contents"}),_t="value",It=(e,t)=>{const o=Q(),s=G();dt(()=>Y(o.current,"ConnectContext",n=>{n.composedPath().at(0)!==n.currentTarget&&e===n.detail.id&&(n.stopPropagation(),n.detail.connect(s))}),[e]),s.current=t},Lt=e=>{const t=ht(({value:o})=>(It(t,o),Ot),{props:{value:{type:Object,value:()=>e}}});return t[_t]=e,t};Lt({dispatch(e,t){}});export{M,Mt as a,G as b,ht as c,Rt as d,j as e,dt as f,St as h,y as i,z as o,Q as u};
