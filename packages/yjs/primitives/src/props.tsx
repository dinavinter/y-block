import {c, useRef, useEffect} from "atomico";
import {useSlot} from "@atomico/hooks/use-slot";
import type {AtomicoThis} from "atomico/types/dom";
import {YArray} from "~/array";



export const YProps = c(function ({props}) {
    const refSlotTemplate = useRef();
    const Templates = useSlot<AtomicoThis>(refSlotTemplate, el => el instanceof Element);

    useEffect(() => {
        console.debug("YProps:reflecting properties", {props, Templates})
        Templates.forEach((Template) => {
            Object.assign(Template, props)
        })
    }, [props, Templates])

    return <host shadowDom>
        <slot ref={refSlotTemplate}/>
    </host>

}, {
    props: {
        bind: {
            attr: ":props",
            type: String,
            value: "item",
            reflect: true,
        },
        props: {
            type: Object,
            reflect: false
        }
    }
})

export default YProps;