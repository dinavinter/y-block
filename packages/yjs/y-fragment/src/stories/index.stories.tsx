import {YFragment} from "@y-block/fragment";
import {define} from "@atomico/storybook";
import * as Y from "yjs";
import {h} from "atomico";

export default {
    title: "@y-block/fragment",
    ...define(YFragment),
    args: {
        fragment: yfragment(["h1", {style: "color: red;"}, "Hello YFragment"])
    } 
    
};


export const TextFragment = (props) => <YFragment {...props} fragment={yfragment(["h3", {style: "color: green;"}, "Hello YFragment"])}></YFragment>;
export const InputFragment = (props) => (
    <YFragment {...props} fragment={yfragment(["input", {type: "password", placeholder: "Password"}])}></YFragment>
);

export const FormFragment = (props) => (
    <YFragment {...props} fragment={yfragment(["form", {
            style: "display: flex; flex-direction: column; gap: 1rem; background-color: #f9f9f9; padding: 1rem; border-radius: 0.5rem; border: 1px solid #ccc;"
        }, [
            ["input", {
                type: "text",
                placeholder: "First Name",
                style: "padding: 0.5rem; border-radius: 0.5rem; border: 1px solid #ccc;"
            }],
            ["input", {
                type: "text",
                placeholder: "Last Name",
                style: "padding: 0.5rem; border-radius: 0.5rem; border: 1px solid #ccc;"
            }],
            ["input", {
                type: "email",
                placeholder: "Email",
                style: "padding: 0.5rem; border-radius: 0.5rem; border: 1px solid #ccc;"
            }],
            ["input", {
                type: "password",
                placeholder: "Password",
                style: "padding: 0.5rem; border-radius: 0.5rem; border: 1px solid #ccc;"
            }],
            ["button", {
                type: "submit",
                style: "padding: 0.5rem; border-radius: 0.5rem; border: 1px solid #ccc; background-color: #333; color: white; cursor: pointer;"
            }, "Submit"]
        ]]
    )}>

    </YFragment>
);

function yxml(element, attrs, children) {

    if (attrs) {
        Object.entries(attrs).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
    }
    if (!typeof children !== "undefined") {
        if (typeof children === "string") {
            console.log("children string", {tag: element.nodeName, element: element.toJSON(), attrs, children});
            element.push([new Y.XmlText(children)]);

        } else if (children instanceof Array) {
            if (children[0] instanceof Array) {
                children.forEach(child => {
                    const childrenElement = new Y.XmlElement(child[0]);
                    element.push([childrenElement]);
                    yxml(childrenElement, child[1], child[2]);
                });

            } else {

                console.log("children", {tag: children[0], element: element.toJSON(), attrs, children});
                const childrenElement = new Y.XmlElement(children[0]);
                element.push([childrenElement]);
                yxml(childrenElement, children[1], children[2]);
            }
        }
    }

    console.log({element: element.toJSON(), attrs, children});


}

function yfragment([tag, attrs, children]) {
    const fragment = inFragment([new Y.XmlElement(tag)])
    yxml(fragment.get(0), attrs, children)
    return fragment;
    ;

}

function getH1Element(text) {
    const element = new Y.XmlElement("h1");
    element.push([new Y.XmlText(text)]);
    return element;
}


function inFragment(elements) {
    const fragment = new Y.Doc().getXmlFragment("fragment");
    fragment.push(elements);
    return fragment;
}


