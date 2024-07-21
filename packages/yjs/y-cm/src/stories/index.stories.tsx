import { YCm } from "../index";
import { define } from "@atomico/storybook";
import * as Y from "yjs";
import * as awarenessProtocol from 'y-protocols/awareness';

const doc = new Y.Doc();
doc.getText().insert(0, "text")
const awareness = new awarenessProtocol.Awareness(doc);
const awareness2 = new awarenessProtocol.Awareness(doc);

export default {
    title: "@y-block/components/cm",
    ...define(
        YCm,
        { // Optional
            argTypes: { 
                yText: {
                    description: "yText is a Y.Text type that will be synchronized with the codemirror editor"
                },
                yAwareness: {
                    description: "yAwareness is a Y.Awareness type that will be synchronized with the codemirror editor"
                }
            }
           
        }
)
};
 
export const Story = () =><y-cm text={doc.getText( )} awareness={awareness}></y-cm>;

export const Story2 = () =><y-cm lang text={doc.getText( )} awareness={awareness2}></y-cm>;

setTimeout(()=>
doc.getText().insert(0, `<div>
    <style> 
        :host{ background: red;}   
    </style>
</div>`),
    1000);
