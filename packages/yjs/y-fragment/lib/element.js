import { jsx } from 'atomico/jsx-runtime';
import { c, useRef, useEffect, css } from 'atomico';
import * as Y from 'yjs';

const YFragment = c(function({ fragment }) {
  const refDom = useRef();
  function initDom() {
    if (refDom.current) {
      refDom.current.innerHTML = "";
      refDom.current.appendChild(fragment.toDOM());
    }
  }
  useEffect(() => {
    if (fragment) {
      initDom();
      fragment.observeDeep((events) => {
        console.log("YTemplateDomViewer:observeDeep", { events, fragment: fragment.toJSON() });
        initDom();
      });
    }
  }, [fragment]);
  return /* @__PURE__ */ jsx("host", { shadowDom: true, children: /* @__PURE__ */ jsx("div", { ref: refDom }) });
}, {
  props: {
    fragment: {
      type: Y.XmlFragment,
      reflect: false
    }
  },
  styles: css`:host{display:block}`
});

export { YFragment };
