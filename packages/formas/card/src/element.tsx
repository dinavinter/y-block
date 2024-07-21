import { useProxySlot, useSlot } from "@atomico/hooks/use-slot";
import { Container } from "@formas/container";
import { PrimitiveTokens } from "@formas/tokens";
import { c, css, useRef } from "atomico";
import { serialize } from "atomico/utils";

export const Card = c(
    (props) => {
        const ref = useRef();
        const refHeader = useRef();
        const refFooter = useRef();
        const slotsHeader = useSlot(refHeader);
        const slotsFooter = useSlot(refFooter);
        const slots = useProxySlot<Element>(
            ref,
            (element) => element instanceof Element
        );
        return (
            <host
                shadowDom={{}}
                layout={serialize(
                    !!slotsHeader.length && "header",
                    !!slots.length && "content",
                    !!slotsFooter.length && "footer"
                )}
            >
                <Container {...props}>
                    <div class="layout">
                        <div class="header">
                            <slot ref={refHeader} name="header"></slot>
                        </div>
                        <slot ref={ref}></slot>
                        <div class="layout content">
                            {slots.map((element, i) => (
                                <div
                                    class={
                                        element instanceof HTMLImageElement ||
                                        element instanceof HTMLVideoElement ||
                                        element instanceof HTMLIFrameElement
                                            ? "embed"
                                            : "item"
                                    }
                                >
                                    <slot
                                        name={(element.slot = `slot-${i}`)}
                                    ></slot>
                                </div>
                            ))}
                        </div>
                        <div class="footer ">
                            <slot ref={refFooter} name="footer"></slot>
                        </div>
                    </div>
                </Container>
            </host>
        );
    },
    {
        props: {
            small: { type: Boolean, reflect: true },
            ...Container.props,
        },
        styles: [
            PrimitiveTokens,
            css`
                :host {
                    display: block;
                    --display-header: none;
                    --display-footer: none;
                }
                :host([layout*="header"]) {
                    --display-header: flex;
                }
                :host([layout*="content"]) {
                }
                :host([layout*="footer"]) {
                    --display-footer: flex;
                }
                :host([layout^="content"]) .content .embed:first-child {
                    border-radius: var(--radius) var(--radius) 0 0;
                    overflow: hidden;
                }
                .layout {
                    display: grid;
                }
                .header {
                    padding: var(--space);
                    display: var(--display-header);
                    justify-content: space-between;
                    align-items: center;
                }
                ::slotted(img) {
                    display: block;
                    max-width: 100%;
                }
                .embed {
                }
                .item {
                    padding: var(--space);
                }
                .content{
                    gap: var(--space)
                }
                .footer {
                    display: var(--display-footer);
                    padding: var(--space);
                }
            `,
        ],
    }
);
