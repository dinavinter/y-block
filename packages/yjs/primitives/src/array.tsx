import {c, css, html} from "atomico";
import * as Y from 'yjs';
import { useEffect, useRef, useState } from "atomico";
import {useProxySlot} from "@atomico/hooks/use-slot";
import type {AtomicoThis} from "atomico/types/dom";

export const YArray = c(function ({array}) {
    const [items, setItems] = useState([])
    const refSlotTemplate = useRef();
    const Templates = useProxySlot<AtomicoThis >(refSlotTemplate, el=> el instanceof HTMLElement) as (AtomicoThis & (new() =>any) )[];
    
     
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
        console.log("YArray:getSharedProps", {Template, item})
        return Template.getAttributeNames()
            .filter((name) => name.startsWith(":") )
            .reduce((acc, name) => { 
                const key =  name.replace(":", "");
                const value = Template.getAttribute(name); 
                acc[key] = typeof value ==="undefined"  || value === "item" || value ==="true" 
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


