import { jsxs, jsx } from 'atomico/jsx-runtime';
import { c, useState, useRef, useEffect, css } from 'atomico';
import * as Y from 'yjs';
import { useProxySlot } from '@atomico/hooks';

const YArray = c(function({ array }) {
  const [items, setItems] = useState([]);
  const refSlotTemplate = useRef();
  const Templates = useProxySlot(refSlotTemplate, (el) => el instanceof HTMLElement);
  useEffect(() => {
    if (!array) return;
    console.debug("YArray:useEffect", { array: array.toJSON() });
    setItems(array.toJSON());
    array.observe((events) => {
      console.log("YArray:observe", { events, array: array.toJSON() });
      setItems(array?.toJSON());
    });
  }, [array]);
  function getSharedProps(Template, item) {
    console.log("YArray:getSharedProps", { Template, item });
    return Template.getAttributeNames().filter((name) => name.startsWith(":")).reduce((acc, name) => {
      const key = name.replace(":", "");
      const value = Template.getAttribute(name);
      acc[key] = typeof value === "undefined" || value === "item" ? item : item instanceof Object && item[value];
      return acc;
    }, {});
  }
  return /* @__PURE__ */ jsxs("host", { shadowDom: true, children: [
    /* @__PURE__ */ jsx("template", { children: /* @__PURE__ */ jsx("slot", { ref: refSlotTemplate }) }),
    items.map((item, index) => Templates.map(
      (Template, index2) => /* @__PURE__ */ jsx(Template, { cloneNode: true, ...getSharedProps(Template, item) })
    ))
  ] });
}, {
  props: {
    array: {
      type: Y.Array,
      reflect: false
    }
  },
  styles: css`:host{display:block}`
});

export { YArray };
