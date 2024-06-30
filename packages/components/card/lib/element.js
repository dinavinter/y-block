import { jsx, jsxs } from 'atomico/jsx-runtime';
import { useSlot, useProxySlot } from '@atomico/hooks/use-slot';
import { Container } from '@formas/container';
import { PrimitiveTokens } from '@formas/tokens';
import { c, useRef, css } from 'atomico';
import { serialize } from 'atomico/utils';

const Card = c(
  (props) => {
    const ref = useRef();
    const refHeader = useRef();
    const refFooter = useRef();
    const slotsHeader = useSlot(refHeader);
    const slotsFooter = useSlot(refFooter);
    const slots = useProxySlot(
      ref,
      (element) => element instanceof Element
    );
    return /* @__PURE__ */ jsx(
      "host",
      {
        shadowDom: {},
        layout: serialize(
          !!slotsHeader.length && "header",
          !!slots.length && "content",
          !!slotsFooter.length && "footer"
        ),
        children: /* @__PURE__ */ jsx(Container, { ...props, children: /* @__PURE__ */ jsxs("div", { class: "layout", children: [
          /* @__PURE__ */ jsx("div", { class: "header", children: /* @__PURE__ */ jsx("slot", { ref: refHeader, name: "header" }) }),
          /* @__PURE__ */ jsx("slot", { ref }),
          /* @__PURE__ */ jsx("div", { class: "layout content", children: slots.map((element, i) => /* @__PURE__ */ jsx(
            "div",
            {
              class: element instanceof HTMLImageElement || element instanceof HTMLVideoElement || element instanceof HTMLIFrameElement ? "embed" : "item",
              children: /* @__PURE__ */ jsx(
                "slot",
                {
                  name: element.slot = `slot-${i}`
                }
              )
            }
          )) }),
          /* @__PURE__ */ jsx("div", { class: "footer ", children: /* @__PURE__ */ jsx("slot", { ref: refFooter, name: "footer" }) })
        ] }) })
      }
    );
  },
  {
    props: {
      small: { type: Boolean, reflect: true },
      ...Container.props
    },
    styles: [
      PrimitiveTokens,
      css`:host{display:block;--display-header: none;--display-footer: none}:host([layout*="header"]){--display-header: flex}:host([layout*="footer"]){--display-footer: flex}:host([layout^="content"]) .content .embed:first-child{border-radius:var(--radius) var(--radius) 0 0;overflow:hidden}.layout{display:grid}.header{padding:var(--space);display:var(--display-header);justify-content:space-between;align-items:center}::slotted(img){display:block;max-width:100%}.item{padding:var(--space)}.content{gap:var(--space)}.footer{display:var(--display-footer);padding:var(--space)}`
    ]
  }
);

export { Card };
