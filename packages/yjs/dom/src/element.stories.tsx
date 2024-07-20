import { YElement } from "@y-block/dom/element";
import { define } from "@atomico/storybook";
import * as Y from 'yjs';
import { h } from "atomico";
import "@y-block/fragment";
export default {
    title: "@y-block/dom/element",
    ...define(YElement)
};
const doc =new Y.Doc();
export const BasicElement = (props) => <y-element element={element(doc.getXmlElement("basic"), { key1: "value1", key2: "value2" })}>
    <input $:value="key1"></input>
    <input $:value="key2"></input>
</y-element>;

export const ComplexElement = (props) => {
    return <y-element element={element(doc.getXmlElement("container"), { title: "container" },
        element(new Y.XmlElement("nested"),{
            a: "child 0",
            b: "$@#"
        }),
        element(new Y.XmlElement("nested"),{
            a: "child 1",
            b: "##"
        })
    )}>
        <input $:value={"title"} />
        <y-element $:element="element" slot={"each"} style={{padding:"6px", marginBlock:"6px"}} >
            <input $:placeholder="a" style={{margin:"3px", padding:"6px"}}></input>
            <input $:placeholder="b" style={{margin:"3px", padding:"6px"}}></input>
        </y-element>
    </y-element>
}

export const LazyElement = (props) => {
    const lazyElement= element(doc.getXmlElement("lazy"), {
        "text":  "Lazy loading..",
        "idx":1
    })
    setInterval(() => {
        const idx = lazyElement.getAttribute("idx") + 1;
        lazyElement.setAttribute("idx", idx);
        lazyElement.insert(0, [element(new Y.XmlElement("lazy-child"), {
            idx: lazyElement.length
        })])
    }, 1000);


    return <y-element element={lazyElement} style={{maxHeight: "6rem" , display:"flex", flexDirection:"revert-layer" , overflow:"hidden"}}>
        <input $:value="text"></input>
        <input $:value="idx" type={"number"}></input>
        <y-element $:element="element" slot={"each"} style={{padding:"6px", marginBlock:"6px" }} >
            <input $:value="idx" type={"number"}></input>
        </y-element>
    </y-element>
}

function element(yelement:Y.XmlElement, attributes,  ...children){
    Object.entries(attributes).forEach(([key, value]) => {
        yelement.setAttribute(key, value);
    });
    children?.length > 0 &&   yelement.insert(0, children)

    return yelement

}

function inDoc(elm:Y.XmlElement){
    new Y.Doc().getXmlFragment().push([elm]);
    return elm;
}
