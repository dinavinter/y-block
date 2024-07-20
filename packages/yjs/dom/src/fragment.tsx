import { c, css, useEffect,useRef } from "atomico";
import  * as Y from "yjs";

export const YFragment =c(function ({fragment})  {
    const refDom = useRef();

    function initDom() {
        if (refDom.current) {
            refDom.current.innerHTML = '';
            refDom.current.appendChild(fragment.toDOM());
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

    return (
        <host shadowDom>
            <div ref={refDom}>
            </div>
        </host>
    );
},{
    props:{
        fragment:{
            type: Y.XmlFragment,
            reflect:false
        }
    },
    styles:css`
		:host{
			display:block;
		}
    `
})





customElements && customElements.define && customElements.define("y-fragment", YFragment);