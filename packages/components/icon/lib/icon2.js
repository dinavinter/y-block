import { jsxs, jsx } from 'atomico/jsx-runtime';
import { c, css } from 'atomico';
import { PrimitiveTokens } from '@formas/tokens';
import { Icons } from './icons.js';

const Icon = c(
  ({ type, size, icons, color }) => {
    const Element = icons[type];
    return /* @__PURE__ */ jsxs("host", { shadowDom: true, children: [
      /* @__PURE__ */ jsx(Element, { cloneNode: true, staticNode: true }),
      /* @__PURE__ */ jsxs("style", { children: [
        size && `:host{--width: ${size};}`,
        color && `:host{color: ${color};}`
      ] })
    ] });
  },
  {
    props: {
      type: {
        type: String,
        reflect: true,
        value: () => "logo"
      },
      size: {
        type: String,
        reflect: true
      },
      color: {
        type: String,
        reflect: true
      },
      icons: {
        type: Object,
        value: Icons
      }
    },
    styles: [
      PrimitiveTokens,
      css`:host{width:var(--width, var(--size-icon));color:currentColor;display:inline-flex;align-items:center;justify-items:center}svg{width:100%;margin:auto}path{fill:currentColor}`
    ]
  }
);

export { Icon };
