import { c, css } from "atomico";
import * as Y from 'yjs';
import { useEffect, useRef, useState } from "atomico";
import {useProxySlot, useSlot} from "@atomico/hooks";
import type {AtomicoThis, JSXElement} from "atomico/types/dom";

export const YArray = c(function ({array}) {
    const [items, setItems] = useState([])
    const refSlotTemplate = useRef();
    const Templates = useProxySlot<AtomicoThis >(refSlotTemplate) as (AtomicoThis & (new() =>any) )[];
    
     
    useEffect(() => {
        if(!array) return;
        console.debug("YArray:useEffect", {array: array.toJSON()})
        setItems(array.toJSON())
        array.observe((events) => {
            console.log("YArray:observe", {events, array: array.toJSON()})
            setItems(array?.toJSON())
        })
        
    }, [array])

    function getSharedProps(Template: HTMLElement, item: any) {
        return Template.getAttributeNames()
            .filter((name) => name.startsWith(":") )
            .reduce((acc, name) => { 
                const key =  name.replace(":", "");
                const value = Template.getAttribute(name); 
                acc[key] = typeof value ==="undefined"  || value === "item"  
                    ? item : item instanceof Object && item[value] ;
                return acc;
            }, {})

    }
   
    
 

    return <host shadowDom>
        <template><slot  ref={refSlotTemplate}  /></template>
        {items.map((item, index) =>  Templates.map((Template, index) => 
               <Template cloneNode {...getSharedProps(Template, item)}/>
            ))
        } 
    </host>
},{
    props: {
        array: {
            type: Y.Array,
            reflect: false
        }
    },
    styles: css`
        :host {
            display: block;
        }  
         
    ` 
} )
