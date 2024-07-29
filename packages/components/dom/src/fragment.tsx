import {c, css, type Ref, useEffect, useHost, useRef} from "atomico";
import * as Y from "yjs";

interface YFragmentProps {
    fragment?: Y.XmlFragment,
    hooks? : Record<string, {
        createDom: (e: Y.XmlHook) => Element
    }>
}

export type Hooks= Record<string, {
    createDom: (e: Y.XmlHook) => Element
}>
export const useFragment = (refDom: Ref, fragment?: Y.XmlFragment,
                     hooks? : Hooks ) => {
    function initDom() {
        if (refDom.current) {
            refDom.current.innerHTML = '';
            const todom = fragment.toDOM(document, hooks);
            console.log("YTemplateDomViewer:initDom", {todom})
            refDom.current.appendChild(fragment.toDOM(document,hooks));
        }
    }

    useEffect(() => {
        if (fragment) {
            initDom();
            fragment.observeDeep((events) => {
                console.log("YTemplateDomViewer:observeDeep", {events, fragment: fragment.toJSON()})
                initDom();
            })
        }
    }, [fragment])
}

export const YFragment = c(function ({fragment, hooks}:YFragmentProps) {
    const refDom = useHost();
    useFragment(refDom, fragment, hooks)
  

    return (
        <host  >
        </host>
    );
}, {
    props: {
        fragment: {
            type: Y.XmlFragment,
            reflect: false
        },
        hooks: {
            type: Object,
            reflect: false
        }
    },
    styles: css`
		:host{
			display:block;
		}
    `
})


customElements && customElements.define && customElements.define("y-fragment", YFragment);