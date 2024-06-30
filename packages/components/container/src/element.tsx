import { c, css } from "atomico";
import {
    PrimitiveTokens,
    CardTokens,
    Sizes,
    ColorsBackground,
    ShadowDeep,
} from "@formas/tokens";

export const Container = c(
    () => {
        return (
            <host shadowDom>
                <slot></slot>
            </host>
        );
    },
    {
        props: {
            small: {
                type: Boolean,
                reflect: true,
            },
            padding: {
                type: String,
                reflect: true,
            },
            bgcolor: {
                type: String,
                reflect: true,
                value: "container",
            },
            color: {
                type: String,
                reflect: true,
            },
            shadow: {
                type: Number,
                reflect: true,
            },
            radio: {
                type: String,
                reflect: true,
                value: "xs",
            },
        },
        styles: [
            PrimitiveTokens,
            CardTokens,
            css`
                :host {
                    display: grid;
                    padding: var(--padding);
                    background-color: var(--bgcolor);
                    color: var(--color);
                    box-shadow: var(--shadow);
                    border-radius: var(--radius);
                    border: var(--border);
                }
                ${Sizes.map(
                    (size) =>
                        `:host([padding=${size}]){--padding: var(--size-${size})}`
                ).join("")}
                ${ColorsBackground.map(
                    (color) =>
                        `:host([bgcolor=${color}]){--bgcolor: var(--color-${color})}`
                ).join("")}
                ${ShadowDeep.map(
                    (deep) =>
                        `:host([shadow="${deep}"]){--shadow: var(--shadow-${deep})}`
                ).join("")}
            `,
        ],
    }
);
