import { c, css, JSX, Props } from "atomico";
import { PrimitiveTokens } from "@formas/tokens";
import { Icons, IconsKeys } from "./icons";

export const Icon = c(
    ({ type, size, icons, color }) => {
        const Element = icons[type] as JSX;
        return (
            <host shadowDom>
                <Element cloneNode staticNode />
                <style>
                    {size && `:host{--width: ${size};}`}
                    {color && `:host{color: ${color};}`}
                </style>
            </host>
        );
    },
    {
        props: {
            type: {
                type: String,
                reflect: true,
                value: (): IconsKeys => "logo",
            },
            size: {
                type: String,
                reflect: true,
            },
            color: {
                type: String,
                reflect: true,
            },
            icons: {
                type: Object,
                value: Icons,
            },
        },
        styles: [
            PrimitiveTokens,
            css`
                :host {
                    width: var(--width, var(--size-icon));
                    color: currentColor;
                    display: inline-flex;
                    align-items: center;
                    justify-items: center;
                }
                svg {
                    width: 100%;
                    margin: auto;
                }
                path {
                    fill: currentColor;
                }
            `,
        ],
    }
);
