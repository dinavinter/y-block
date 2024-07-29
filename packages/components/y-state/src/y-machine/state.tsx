import {c, css} from "atomico";
import {useRender} from "@atomico/hooks/use-render";

customElements.define("y-state", c(function yState({id,key, events}) {
    useRender(()=> {
        return events?.map((event) => <button
            slot={"event"}
        class={"m-4 p-2 rounded-full  bg-neutral-100 center"}>{event}</button>
    )
    })
    return <host shadowDom> 
    <div className={"w-full h-full"}>
       <slot></slot> 
     </div>
        <atomico-hello message={key} className={"h-screen"}>
            <nav className="massage divide-x-2 divide-dashed flex items-center gap-2  mr-6  float-end"  >
                <slot name={"event"} />
            </nav>
        </atomico-hello> 
        </host>
}, {
    props: {
        id: {
            type: String,
            value: "y-state"
        },
        key:{
            type: String,
            value: "y-state"
        },
        events:{
            type:Array
        }
    },
    styles: css`
         @tailwind base;
         @tailwind components;
         @tailwind utilities;
         @tailwind screens;
        :host{
            display: block;
        }
    `
}   )); 