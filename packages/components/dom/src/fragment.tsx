import {c, css, useCallback, useEffect, useHost, useMemo, useRef} from "atomico";
import * as Y from "yjs";
import {YDocStore} from "@y-block/store";
import * as awarenessProtocol from "y-protocols/awareness";
import {useStore} from "@atomico/store";
import {create, cssomSheet} from "twind";
import {useCssLightDom, useParent} from "@atomico/hooks";
import {forms} from '@twind/forms'
import { aspectRatio } from '@twind/aspect-ratio';
import { content } from '@twind/content'
import typography from "@twind/typography";
// import install from '@twind/with-web-components'
// import config from '../twind.config.js'
// import {useParentPath} from "@atomico/use-parent";
// const withTwind = install(config)

interface YFragmentProps {
    fragment?: Y.XmlFragment,
    awareness?: awarenessProtocol.Awareness,
    store?:string
}

function tryParse(fragment: Y.XmlFragment) {
    try {
        return  fragment.toDOM();
    } catch (e) {
        console.warn("YTemplateDomViewer:initDom", e)
    }
}


export const useTwin = (source: Y.XmlFragment) => {
    const sheet = useMemo(()=> cssomSheet({ target: new CSSStyleSheet() }) )
    const { tw, setup } =  useMemo(()=>create({ sheet,  
        preflight: true,
        plugins:{
            ...typography(),
            forms,
            content,
            aspect: aspectRatio
        } }) , [sheet])
    const host = useHost();
    useEffect(() => {
        source?.observeDeep((events) => {
            const classes = new Set<string>();
            const walker =source.createTreeWalker(dom =>  dom instanceof Y.XmlElement && dom.getAttribute("class"));
            for (let node of walker ) {
                ( node as Y.XmlElement).getAttribute("class")?.split(" ").forEach(c=>{
                    classes.add(c)
                });
              } 
            console.log("twin:classes", {classes, sourceFragment: source.toJSON()}) 
            tw(Array.from(classes).join( " ")) 
          
        })
    }, [source])
    
    useEffect(() => {
        console.log("twin:useEffect", {sheet,host:host.current, shadowRoot: host.current?.shadowRoot})
       if(host.current?.shadowRoot && sheet.target) {
           host.current.shadowRoot.adoptedStyleSheets = [sheet.target]
       }
    }, [host.current, host.current?.shadowRoot, sheet.target])
    
    
    return {tw, sheet, setup}
}

export const twin = c(function ({source}) {
    const refContent = useRef();

    // const {doc} = useStore(YDocStore);
    // const sourceFragment = useMemo(() => doc?.getXmlFragment(source), [doc])
    // const targetCssRules = useMemo(() => doc?.getArray<string>(target), [doc])

    const {sheet}= useTwin(source);
    useCssLightDom(sheet.target)
 
    useEffect(() => {
        console.log("twin:useEffect", {sheet})
       
       
    }, [sheet.target])

    return (
        <host  >
            <template ref={refContent} />
         </host>
    );
}, {
    props: {
        source: {
            type: Y.XmlFragment,
            reflect: true,
            value:  undefined as unknown as Y.XmlFragment
        }
    }
})

customElements && customElements.define && customElements.define("y-twin", twin);

export const YFragment = c(function ({fragment, awareness, store}:YFragmentProps) {
    const refDom = useRef();
    const {doc, awareness:store_awareness} = useStore(YDocStore);

    fragment = fragment ?? useMemo(() => doc?.getXmlFragment(store), [doc, store]);
    awareness = awareness ?? store_awareness;
    useTwin(fragment);

    function initDom() {
        const dom = tryParse(fragment);
        if (refDom.current && dom) {
            const fragment = document.createDocumentFragment();
            fragment.appendChild(dom);
            refDom.current.innerHTML = '';
            refDom.current.appendChild(fragment);
        }
    }

    const callback = useCallback((events, trx) => {
        console.log("YTemplateDomViewer:observeDeep", {events, fragment: fragment.toJSON()})
        initDom();
    })
    useEffect(() => {
        if (fragment) {
            initDom(); 
            fragment.observeDeep( callback);
        }
        return () => {
            try {
                fragment?.unobserveDeep(initDom);
            }
            catch (e) {
                console.warn("YTemplateDomViewer:unobserveDeep", e)
            }
        }
    }, [fragment])

    return (
        <host shadowDom>
             <div ref={refDom}/> 
        </host>
    );
}, {
    props: {
        fragment: {
            type: Y.XmlFragment,
            reflect: false
        },
        store: String,
        awareness: {type: Object, value: undefined as unknown as awarenessProtocol.Awareness},

    },
    styles: css`
		@tailwind base;
		@tailwind components;
		@tailwind utilities;
		@tailwind screens;
		@tailwind forms;

		:host {
			display: block;
		}
        
    `
})


customElements && customElements.define && customElements.define("y-fragment", YFragment);