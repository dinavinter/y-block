import {c, useRef} from "atomico";
import {useProxySlot} from "@atomico/hooks/use-slot";
import type {AtomicoThis} from "atomico/types/dom";

export const Props= c(function ({ props}) {
    const refSlotTemplate = useRef();
    const Templates = useProxySlot<AtomicoThis >(refSlotTemplate, el=> el instanceof HTMLElement) as (AtomicoThis & (new() =>any) )[];

    return <host shadowDom>
        <template><slot  ref={refSlotTemplate}  /></template>
        {Templates.map((Template, index) =>
            <Template  {...props}></Template>
        )}
    </host>

},{
    props: {
        bind: {
            attr: ":props",
            type: String,
            value: "true",
            reflect: true, 
        },
        props: {
            type: Object,
            reflect: false
        }
    }
})

