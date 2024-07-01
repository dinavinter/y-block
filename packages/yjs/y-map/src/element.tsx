import { c, css } from "atomico";
import * as Y from 'yjs';
import { useEffect, useRef, useState } from "atomico";
import { useProxySlot } from "@atomico/hooks";
import type { AtomicoThis } from "atomico/types/dom";

export const YMap = c(function ({ map }) {
    const [items, setItems] = useState([]);
    const refSlotTemplate = useRef();
    const Templates = useProxySlot<AtomicoThis >(refSlotTemplate, el=> el instanceof HTMLElement) as (AtomicoThis & (new() =>any) )[];

    useEffect(() => {
        if (!map) return;
        console.debug("YMap:useEffect", { map: map.toJSON() });
        setItems(Array.from(map.entries()));
        map.observe((events) => {
            console.log("YMap:observe", { events, map: map.toJSON() });
            setItems(Array.from(map.entries()));
        });
    }, [map]);

    function getSharedProps(Template: HTMLElement ) {
        console.log("YMap:getSharedProps", {Template, map:map.toJSON()})
        return Template.getAttributeNames()
            .filter((name) => name.startsWith(":"))
            .reduce((acc, name) => {
                const propName = name.replace(":", "");
                const attrValue = Template.getAttribute(name);
                acc[propName] =  map.get(attrValue || propName);
                return acc;
            }, {  });
    }

    return <host shadowDom>
        <template><slot ref={refSlotTemplate} /></template>
        { Templates.map((Template) =>
            <Template cloneNode {...getSharedProps(Template )} />
        )}
    </host>;
}, {
    props: {
        map: {
            type: Y.Map,
            reflect: false
        }
    },
    styles: css`
        :host {
            display: block;
        }
    `
});
 
 