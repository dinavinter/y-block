import * as Y from 'yjs';
import { c, css, useCallback,useEffect, useRef, useState } from "atomico";
import { useProxySlot } from "@atomico/hooks";
import type { AtomicoThis } from "atomico/types/dom";
export type ValueTypes = Object | number | null | Array<any> | string | Uint8Array | Y.AbstractType<any>;
export type Attributes ={ [p: string]: ValueTypes }

export const YElement = c(function ({ element }) {
    const [attributes, setAttributes] = useState<Attributes >({});
    const [children, setChildren] = useState<Array<Y.XmlElement | Y.XmlText | Y.XmlHook>>([]);
    const refSlotTemplate = useRef();
    const refChildTemplate= useRef();
    const Templates = useProxySlot<AtomicoThis>(refSlotTemplate, el => el instanceof HTMLElement) as (AtomicoThis & (new () => any))[];
    const ChildTemplates = useProxySlot<AtomicoThis>(refChildTemplate, el => el instanceof HTMLElement) as (AtomicoThis & (new () => any))[];

    useEffect(() => {
        if (!element) return;
         console.debug("YElement:useEffect", element.nodeName,{ element: element.toJSON() },ChildTemplates);
        setAttributes(element.getAttributes());
        setChildren(element.toArray());
         
        element.observe(event => {
            console.log("YElement:observe", element.nodeName,{ event, element: element.toJSON() });
            setAttributes(element.getAttributes());
            setChildren(element.toArray());
        });
        
    }, [element]);

   function getSharedProps(Template: HTMLElement, attributes: Attributes) {
         
        console.log("YElement:getSharedProps",{ Template, attributes });
        return Template.getAttributeNames()
            .filter((name) => name.startsWith(":"))
            .reduce((acc, name) => {
                const propName = name.replace(":", "");
                const attrValue = Template.getAttribute(name);
                acc[propName] = attributes[attrValue || propName];
                return acc;
            }, {});
    }
    
 

    return <host shadowDom>
        <template><slot ref={refSlotTemplate} /></template>
        <template><slot ref={refChildTemplate} name={"each"} /></template>

        {Templates.map((Template) =>
            <Template cloneNode {...getSharedProps(Template, {
                ...attributes,
                 "*": element
            })} />
        )}
        
        {children.map((child, index) =>
            ChildTemplates.map((Template) =>
                <Template cloneNode {...getSharedProps(Template, {
                    element: child as Y.XmlElement,
                    text: child as Y.XmlText,
                    hook: child as Y.XmlHook,
                    "*": child
                })} />
            )
        )}
    </host>;
}, {
    props: {
        element: {
            type: Y.XmlElement,
            reflect: false
        }
    },
    styles: css`
        :host {
            display: block;
        }
    `
});
