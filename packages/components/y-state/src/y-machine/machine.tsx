import {Props, c, css, useMemo, useEffect, useState, useRef, AtomicoElement, useRefEffect} from "atomico";
import {type AnyStateMachine, createActor, createMachine, StateMachine} from "xstate";
import {hydrate} from "./hydrate";
import * as Y from "yjs";
import '@y-block/cm'
import '@y-block/dom'
import '../twil.css'

function isElement(item: any): item is Y.XmlElement | Y.XmlText {
    return item instanceof Y.XmlElement
}

export function toKabbCase(str: string) {
    if (str != str.toLowerCase()) {
        str = str.replace(/[a-z]([A-Z])/g, m => "-" + m.toLowerCase());
    }
    return str.replace(/\./g, "-");
}
const hooks: Record<string, {
    createDom: (e: Y.XmlHook) => Element
}> = {
    "state": {
        createDom(e) {
            const element = document.createElement(toKabbCase(e.get('id')))
            return element
        }
    },
    "event": {
        createDom(e) {
            const element = document.createElement('button')
            element.textContent = e.get('type')
            //token like, light bg, outline variant
            //add icon before
            element.className= " m-4 p-2 rounded-full  bg-neutral-100 center"
            // element.title = e.get('type')
            return element
        }
    }
}
//outline outline-neutral-500	 outline-offset-2 outline-1 
export type Hooks = Record<string, {
    createDom: (e: Y.XmlHook) => Element
}>
export function fragmentToText(source: Y.XmlFragment, target: Y.Text, hooks?: Hooks): void {
    function domHtml(e: Y.XmlElement<{ [p: string]: string }> | Y.XmlText | Y.XmlHook) {
        console.debug("template:apply:foreach", e, e.toDOM)
        return prettyHtml((e.toDOM(document, hooks) as Element).outerHTML);
    }
    
    function prettyHtml(html:string) {
        
        return addEnter(emptyTagsToSelfClosing(html))
       
         /*
            * Replace empty tags with self-closing tags
            * example-1: 
            *      input: <div></div> 
            *      output: <div />
            * example-2: 
            *      input: <div><span></span></div>
            *      output: <div><span /></div>
          */
        function emptyTagsToSelfClosing(input: string): string { 
            return  input.replace(/<([a-zA-Z][\w-]*)([^>]*)>\s*<\/\1>/g, "<$1$2 />");

        }
        function addEnter(html:string){
            return html.replace(/>/g, ">\n")
        }
    }
        

    target.doc.transact(() => {
        target.delete(0, target.length);
        // target.insert(0, domHtml(source)  )
        source.forEach((e) => { 
                target?.insert(target?.length, domHtml(e) + '\n\n') 
        })
    })
}

export function syncFragment(xmlFragment: Y.XmlFragment, text:Y.Text, hooks?:Hooks) {
     xmlFragment.observeDeep((events, transaction) => {
         fragmentToText(xmlFragment, text, hooks)
     })
    return xmlFragment
}

export const YMachine = c(function yMachine({ machine }:{
    machine: AnyStateMachine
}) { 
    const doc= useMemo(()=>new Y.Doc())
    const yFragment = useMemo(()=>doc.getXmlFragment(machine.id), [doc])
    const yText = useMemo(()=>doc.getText(`${machine.id}-text`), [doc])
    useEffect(() => {
        syncFragment(yFragment, yText, hooks)
        hydrate(machine, doc.getXmlFragment(machine.id))
       
    },[yText, machine])
    
    
    return (
        <host >
            <h1>y-machine : {machine.id}</h1>
            <slot></slot>
            <y-cm text={yText} />
            <y-fragment fragment={yFragment} hooks={hooks} />
            
            
         </host>
    );
},{
    props : {
    machine: {
        type: Object,
        value: function () {
            return createMachine({
                id: "toggle",
                initial: "idle",
                states: {
                    idle: {
                        meta:{
                            color: "yellow",
                            animation: "spin 2s linear infinite"
                        },
                        on: {
                            FETCH: "pending"
                        }
                    },
                    pending: {
                        on: {
                            RESOLVE: "resolved",
                            REJECT: "rejected"
                        }
                    },
                    resolved: {
                        meta:{
                            color: "green",
                            animation: "spin 2s linear infinite"
                        },
                    },
                    rejected: {
                        meta:{
                            color: "red",
                            animation: "spin 2s linear infinite"
                        },
                    }
                }
            });
        }
    }
},
 styles : css`
	 @tailwind base;
	 @tailwind components;
	 @tailwind utilities;

	 :host {
        display: flex;
    }
`
});


customElements.define("y-machine", YMachine);

