import {c, useCallback, useEffect, useMemo, useRef, useState} from "atomico";
import {useStore} from "@atomico/store";
import {YDocStore} from "@y-block/store";
import * as Y from "yjs";

export const YCodeToHtml = c(function  ({  source, target }) {
    const refContent = useRef();

    const {doc} = useStore(YDocStore);
    const yXmlFragment = useMemo(() => doc?.getXmlFragment(target), [doc])
    const htmlText = useMemo(() => doc?.getText(source), [doc])
    useEffect(() => { 
        htmlText?.observe((events) => { 
            doc.transact(() => {
                refContent.current.innerHTML = htmlText.toJSON();
                if(refContent.current.innerHTML != yXmlFragment.toJSON())
                    console.debug("apply:observeDeep:innerHTML", {
                        sourceF: htmlText.toJSON(),
                        targetF: yXmlFragment.toJSON(),
                        source,
                        target,
                        innerHTML: refContent.current.innerHTML
                    })

                yXmlFragment.delete(0, yXmlFragment.length);
                yXmlFragment.insert(0,  toXmlFragment(refContent.current.content));
            }) 
            console.debug("apply:observeDeep:innerHTML:aft", {
                sourceF: htmlText.toJSON(),
                targetF: yXmlFragment.toJSON(),
                source,
                target,
                innerHTML: refContent.current.innerHTML
            })

        })

    }, [ htmlText])

    useEffect(() => {
        if (refContent.current && htmlText)
            refContent.current.innerHTML = htmlText.toJSON();
    }, [refContent.current, htmlText])


    return (
        <host  > 
            <template ref={refContent}>
            </template> 
        </host>
    );

},{
    props: {
        source: {
            type: String,
            reflect: true,
            value: "html"
        },
        target: {
            type: String,
            reflect: true,
            value: "dom"
        }
    }
})

customElements && customElements.define && customElements.define("y-dom-render", YCodeToHtml);


export function toXmlFragment(current: Node): Array<Y.XmlElement | Y.XmlText> {
    return  addChildren(current);

    function addChildren(node: Node) {
        const children = Array.from(node.childNodes);
        const elements =[]

        children.forEach((child, index) => { 
            if (child instanceof HTMLElement) {
                elements.push(new Y.XmlText("\n\t"));
                const childElement = new Y.XmlElement(child.tagName);
                setAttributes(child, childElement);
                childElement.insert(0, addChildren(child));
                elements.push(childElement);
            } else if (child instanceof Text && child.textContent.length > 0) {
                elements.push(new Y.XmlText("\n\t\t"));
                elements.push(new Y.XmlText(child.textContent));
            }

        });

        elements.push(new Y.XmlText("\n"));

        return elements;
    }

    function setAttributes(child: HTMLElement, childElement: Y.XmlElement<{ [p: string]: string }>) {
        const attributes = Array.from(child.attributes);
        attributes.forEach((attr) => {
            childElement.setAttribute(attr.name, attr.value);
        });
    } 


}
 
