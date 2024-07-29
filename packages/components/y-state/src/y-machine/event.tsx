import {c, css} from "atomico";

customElements.define("y-event", c(function yEvent({type}) {
    return <host shadowDom>
        <slot><div>{type}</div></slot>
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
    `,
    props: {
        type: {
            type: String,
            value: "y-event"
        }
    }
}));

export const NavItem = c(function NavItem({ type, meta, send } ) {

    console.log("aaa:nav:item",{type, meta, send});

    return (
        <host shadowDom>
            <button  class="rounded-full outline p-5 ml-5 outline-white shadow-2xl animate-pulse"  onclick={() => {
                console.log('onclick', type)
                send({
                    type: type
                })
            } }>{meta?.title || type}</button>
        </host>
    );
} , {
    props: {
        type: {
            type: String,
            reflect: true
        },
        meta: {
            type: Object,
            reflect: true
        },
        send:{
            type:Function,

        }
    },
    styles: css`
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
        @tailwind screens;

        :host {
            @apply block;
        }
    `
});

export type NavItemElement = InstanceType<typeof NavItem>;

customElements.define('nav-item' , NavItem)
