import {c, css} from "atomico";

customElements.define("state-machine", c(function stateMachine() {
    return <host shadowDom>
        <div>state-machine</div>
        <div class={"grid grid-cols-2 grid-flow-dense grid-rows-2"}>
    <slot name={"state"} />
    </div>
    </host>
},{
    styles: css`
         @tailwind base;
         @tailwind components;
         @tailwind utilities;
         @tailwind screens;
        :host{
            display: block;
        }
    `
}))
