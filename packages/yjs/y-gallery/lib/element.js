import { jsx, jsxs } from 'atomico/jsx-runtime';
import { useHost, useRef, useRefEffect, useState, Mark, useLayoutEffect, useMemo, createRef, useProp, useEffect, useInsertionEffect, render, useUpdate, options, usePromise, css, c } from 'atomico';
import * as Y from 'yjs';
import '@y-block/array';

function useMutationObserver(callback, config = {
    childList: true,
    characterData: true,
}) {
    useRefMutationObserver(useHost(), callback, config);
}
function useRefMutationObserver(host, callback, config = {
    childList: true,
    characterData: true,
}) {
    const ref = useRef();
    ref.current = callback;
    useRefEffect(() => {
        if (!host.current)
            return;
        const mutation = new MutationObserver((entries) => {
            entries.forEach(({ addedNodes }) => addedNodes.forEach(map));
            ref.current(entries, mutation);
        });
        const map = (child) => {
            if (child instanceof Text) {
                mutation.observe(child, { ...config, characterData: true });
            }
        };
        mutation.observe(host.current, config);
        host.current.childNodes.forEach(map);
        return () => mutation.disconnect();
    }, [host]);
}

const getProp = (value) => value.replace(/-(\w)/g, (all, letter) => letter.toUpperCase());
const mapAttributes = (element) => {
    const { constructor } = element;
    const props = constructor.props || {};
    const attrs = {};
    return Object.values(element.attributes).reduce((attrs, attr) => {
        const prop = getProp(attr.name);
        if (!(prop in props))
            attrs[prop] = attr.value;
        return attrs;
    }, attrs);
};
function useAttributes() {
    const host = useHost();
    const setAttributes = () => mapAttributes(host.current);
    const [state, setState] = useState(setAttributes);
    useMutationObserver(() => setState(setAttributes), {
        attributes: true,
    });
    return state;
}

const getChildNodes = (element) => {
    return Array.from(element.childNodes).filter((el) => !(el instanceof Mark) && !(el instanceof Comment));
};
function useChildNodes(config = {
    childList: true,
}) {
    const host = useHost();
    const [childNodes, setChildNodes] = useState(() => getChildNodes(host.current));
    useMutationObserver(() => {
        setChildNodes(getChildNodes(host.current));
    }, config);
    return childNodes;
}

function useCurrentValue(value) {
    const ref = useRef();
    ref.current = value;
    return ref;
}

function useListener(ref, name, handler, options) {
    const value = useCurrentValue(handler);
    useRefEffect(() => {
        const { current } = ref;
        if (!current)
            return;
        return addListener(current, name, (event) => value.current(event), options);
    }, [ref]);
}
/**
 * Associate an event and return a callback to remove said event
 */
function addListener(current, name, handler, options) {
    current.addEventListener(name, handler, options);
    return () => current.removeEventListener(name, handler);
}
function useListenerState(ref, name, handler, options) {
    const [state, setState] = useState();
    useListener(ref, name, (event) => setState(handler(event)), options);
    return state;
}

function useClickCoordinates(ref, callback) {
    const value = useCurrentValue(callback);
    useListener(ref, "click", (event) => {
        const coordinates = getCoordinates(event);
        coordinates && value.current(coordinates);
    });
}
function getCoordinates({ pageX: x, pageY: y, currentTarget, }) {
    const rect = currentTarget.getBoundingClientRect();
    return {
        x,
        y,
        offset: {
            x: x - rect.left,
            y: y - rect.top,
        },
    };
}

/**
 * Capture the click or touch event to execute the callback multiple times,
 * depending on the type of pressure
 */
function useClickPress(ref, callback, aceleration = 0.9, minMs = 24) {
    const ctx = useRef();
    const isEventIsTouches = (event) => event.type.startsWith("touch");
    const handlerStart = (event) => {
        let isTouches = isEventIsTouches(event);
        if (isTouches)
            ctx.touches = true;
        if (!ctx.current && (ctx.touches ? isTouches : true)) {
            ctx.current = true;
            const loop = (ms) => {
                ms = minMs > ms ? minMs : ms;
                if (ctx.current) {
                    ctx.timeout = setTimeout(() => {
                        if (ctx.current) {
                            callback();
                            loop(ms * aceleration);
                        }
                    }, ms);
                }
            };
            loop(200);
        }
    };
    const handlerStop = (event) => {
        let isTouches = isEventIsTouches(event);
        if (ctx.touches && !isTouches)
            return;
        if (ctx.timeout && ctx.current) {
            clearInterval(ctx.timeout);
            callback();
        }
        ctx.current = false;
    };
    useListener(ref, "mousedown", handlerStart);
    useListener(ref, "touchstart", handlerStart);
    const x = new Image();
    useListener(ref, "keydown", (event) => event.code === "Space" && handlerStart(event));
    useListener(ref, "mouseup", handlerStop);
    useListener(ref, "mouseleave", handlerStop);
    useListener(ref, "touchend", handlerStop);
    useListener(ref, "touchmove", handlerStop);
    useListener(ref, "keyup", (event) => handlerStop(event));
}

/**
 * temporarily create a textarea tag to execute the command to copy the content
 * @param {string} content
 */
function copy(content) {
    const textarea = document.createElement("textarea");
    textarea.value = content;
    textarea.setAttribute("style", "width:0;height:0;opcity:0");
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
}
/**
 * copy the content of a reference when executing the return callback
 */
const useCopy = (ref) => () => {
    const { current } = ref;
    if (!current)
        return;
    copy("value" in current ? current.value : current.textContent);
};

const scaleSelector = (selector) => selector.replace(/([^\w\_\-])/g, "\\$1");
const serializeRules = ({ cssText, selectorText }, scopeSelector) => `${selectorText.split(/\s*,\s*/).map((selector) => (selector.startsWith(":") ? selector : ":host " + selector)
    .replace(/(:host)\((.+)\)/, "$1$2")
    .replace(/::slotted\((.+)\)/, ":host > $1")
    .replace(/:host/g, scopeSelector))}${cssText
    .replace(selectorText, "")
    .replace(/(animation(?:-name){0,1}\s*:\s*)([^;}]+)/g, "$1$2-" + scaleSelector(scopeSelector))}`;
function getRules(Sheet, scopeSelector) {
    const { cssRules } = Sheet;
    let rules = [];
    for (let i = 0; i < cssRules.length; i++) {
        const rule = cssRules[i];
        if (rule instanceof CSSStyleRule) {
            rules.push(serializeRules(rule, scopeSelector));
        }
        else if (rule instanceof CSSKeyframesRule) {
            const { cssText } = rule;
            rules.push(cssText.replace(/\s+([^\s{]+)/, " $1-" + scaleSelector(scopeSelector)));
        }
        else if (rule instanceof CSSMediaRule) {
            const { conditionText } = rule;
            rules.push(`@media ${conditionText}{${getRules(rule, scopeSelector)}}`);
        }
    }
    return rules;
}
let sandbox;
function getSheet(style) {
    if (style instanceof CSSStyleSheet) {
        return style;
    }
    if (style.sheet) {
        return style.sheet;
    }
    if (!sandbox) {
        sandbox = document.createElement("iframe");
        sandbox.style.display = "none";
        document.body.appendChild(sandbox);
    }
    const { contentDocument } = sandbox;
    contentDocument.head.appendChild(style);
    const { sheet } = style;
    const { cloneNode } = style;
    style.cloneNode = (deep) => {
        const copy = cloneNode.call(style);
        const { cssRules } = sheet;
        for (let i = 0; i < cssRules.length; i++) {
            copy.textContent += cssRules[i].cssText;
        }
        return copy;
    };
    return sheet;
}

const ATTR = "data-sheet";
let ID$1 = 0;
/**
 * Create a style collector to apply once the render is finished
 */
function useCssLightDom(sheet) {
    const host = useHost();
    useLayoutEffect(() => {
        const style = document.createElement("style");
        const { current } = host;
        if (!current.hasAttribute(ATTR)) {
            current.setAttribute(ATTR, `${ID$1++}`);
        }
        current.appendChild(style);
        if (style.sheet) {
            (Array.isArray(sheet) ? sheet.flat(100) : [sheet]).forEach((target) => {
                if (!target)
                    return;
                const sheet = getSheet(target);
                getRules(sheet, current.localName +
                    `[data-sheet="${current.dataset.sheet}"]`).forEach((rule) => style.sheet.insertRule(rule, style.sheet.cssRules.length));
            });
        }
        return () => style.remove();
    }, [sheet]);
}

const fpsP = () => new Promise((resolve) => requestAnimationFrame(() => resolve()));
const fps = async (length = 1) => {
    let current = Promise.resolve();
    while (length--)
        current = current.then(fpsP);
    await current;
};
const idle = (ms) => window.requestIdleCallback
    ? new Promise((resolve) => requestIdleCallback(resolve, { timeout: ms }))
    : timeout(ms);
const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function useDebounceState(delay, initialState, mode = "timeout") {
    const [state, setState] = useState(initialState);
    const ref = useRef();
    return [
        state,
        (current) => {
            ref.current = current;
            if (!ref.prevent) {
                ref.prevent = true;
                (mode === "fps" ? fps : mode === "idle" ? idle : timeout)(delay).then(() => {
                    ref.prevent = false;
                    setState(ref.current);
                });
            }
        },
    ];
}

function useParent(matches, composed) {
    const path = useParentPath(composed);
    return useMemo(() => createRef(path.find(typeof matches === "string"
        ? (el) => el?.matches?.(matches)
        : //@ts-ignore
            (el) => el instanceof matches)), [matches]);
}
function useParentPath(composed) {
    const host = useHost();
    return useMemo(() => {
        const path = [];
        let { current } = host;
        //@ts-ignore
        while ((current = current.parentNode || (composed && current.host)))
            path.push(current);
        return path;
    }, [composed]);
}

const checkDisable = (el) => el.hasAttribute("disabled");
/**
 * Synchronize disabled status with a parent
 * @example
 * ```jsx
 * <fieldset disabled>
 *      <my-input>I am disabled</my-input>
 * </fieldset>
 * ```
 * @example
 * ```css
 * :host([disabled]){
 *      pointer-events: none;
 * }
 * ```
 */
function useDisabled(matches = "fieldset") {
    const fieldset = useParent(matches);
    const [disabled, setDisabled] = useProp("disabled");
    useRefMutationObserver(fieldset, (items) => items
        .filter((item) => item.attributeName == "disabled")
        .map((el) => {
        setDisabled(checkDisable(el.target));
    }), {
        attributes: true,
    });
    useLayoutEffect(() => {
        const { current } = fieldset;
        if (current) {
            setDisabled(checkDisable(current));
        }
    }, []);
    return disabled;
}

function useDragResize(ref, refParent, rootState = [1, 1]) {
    const [active, setActive] = useState(false);
    const [[x, y], setValue] = useDebounceState(1, rootState, "fps");
    useEffect(() => setValue(rootState), rootState);
    const start = () => setActive(true);
    const end = () => setActive(false);
    useListener(ref, "mousedown", start);
    useListener(refParent, "mouseup", end);
    useListener(refParent, "mouseleave", end);
    useListener(ref, "touchstart", start);
    useListener(refParent, "touchend", end);
    useListener(refParent, "touchmove", (event) => {
        const { targetTouches: [touche], } = event;
        const rect = refParent.current.getBoundingClientRect();
        const offsetX = touche.pageX - rect.x;
        const offsetY = touche.pageY - rect.y;
        const { current } = refParent;
        setValue([
            offsetX / current.clientWidth,
            offsetY / current.clientHeight,
        ]);
    });
    useListener(refParent, "mousemove", (event) => {
        if (active) {
            const { current } = refParent;
            setValue([
                event.offsetX / current.clientWidth,
                event.offsetY / current.clientHeight,
            ]);
        }
    });
    return [active, x, y];
}

/**
 * Ensures that the render function always
 * receives a tree that starts from the host tag
 */
const fillHost = (vnode) => vnode && vnode.type === "host" ? vnode : jsx("host", { children: vnode });
/**
 * Generate a second render, this render escapes the current
 * one and is useful for collaborative work between LightDOM and shadowDOM
 */
function useRender(view, args) {
    const host = useHost();
    host.id = host.id || Symbol();
    useInsertionEffect(() => {
        render(fillHost(typeof view === "function" ? view() : view), host.current, host.id);
    }, args);
}

function useForm() {
    return useParent("form");
}
/**
 * Allows you to listen to the native events of the form
 */
function useFormListener(name, handler, options) {
    useListener(useForm(), name, handler, options);
}
function useFormInputHidden(name, value) {
    const [slot] = useState(Math.random);
    useRender(() => (jsx("input", { type: "hidden", value: value, name: name, slot: `${slot}` })), [name, value]);
}

/**
 * reflects input radio in forms, this hook requires the declaration
 * of the props checked: Boolean and name: String
 */
function useFormInputRadio(input) {
    const ref = useRef();
    const [checked, setChecked] = useProp("checked");
    const [name] = useProp("name");
    useFormListener("change", ({ currentTarget, target }) => {
        if (!(target instanceof HTMLInputElement))
            return;
        if (currentTarget instanceof HTMLFormElement) {
            const group = currentTarget.elements[name];
            if (group instanceof RadioNodeList) {
                [...group].forEach((input) => {
                    input.checked = target === input;
                });
            }
        }
        setChecked(target === ref.current);
    });
    useFormListener("reset", () => setChecked(false));
    useRender(() => ({
        ...input,
        props: {
            ...input.props,
            ref,
            type: "radio",
            name,
            checked,
        },
    }));
    useListener(ref, "change", (event) => {
        setChecked(event.currentTarget.checked);
    });
    useEffect(() => {
        setChecked(ref.current.checked);
    }, []);
    return ref;
}

const INTERNALS = Symbol.for("@atomico/use-internals");
function useInternals() {
    const { current } = useHost();
    const [internals] = useState(() => (current[INTERNALS] =
        current[INTERNALS] || current.attachInternals()));
    return internals;
}

function useRefIntersectionObserver(ref, callback, options) {
    useRefEffect(() => {
        const { current } = ref;
        if (!current)
            return;
        const intersection = new IntersectionObserver(callback, options);
        intersection.observe(current);
        return () => intersection.disconnect();
    }, [ref]);
}
function useIntersectionObserver(callback, options) {
    const host = useHost();
    useRefIntersectionObserver(host, callback, options);
}

function useKeyboard(ref, keys, callback) {
    const value = useCurrentValue(callback);
    useRefEffect(() => {
        const { current } = ref;
        if (!current)
            return;
        const history = new Set();
        const check = () => {
            if (keys.length == history.size) {
                const map = [...history];
                if (map.every((code, i) => code == keys[i])) {
                    return true;
                }
            }
        };
        const removeKeydown = addListener(current, "keydown", (event) => {
            history.add(event.code);
            if (check())
                value.current(event);
        });
        const removeKeyup = addListener(current, "keyup", (event) => {
            if (check())
                value.current(event);
            history.delete(event.code);
        });
        return () => {
            removeKeydown();
            removeKeyup();
        };
    }, [ref]);
}

const medias = {};
/**
 * listen to a media query expression
 */
function useMediaQuery(size) {
    const update = useUpdate();
    medias[size] = medias[size] || window.matchMedia(size);
    useEffect(() => {
        medias[size].addListener(update);
        return () => medias[size].removeListener(update);
    }, [medias[size]]);
    return medias[size].matches;
}

function useParallax(host) {
    const refWindow = useRef(globalThis);
    const [state, setState] = useDebounceState(1, {
        x: 0,
        y: 0,
    }, "fps");
    const [intersectio, setIntersection] = useState(false);
    useIntersectionObserver(([{ isIntersecting }]) => setIntersection(isIntersecting));
    useListener(refWindow, "deviceorientation", ({ beta, gamma }) => {
        if (!intersectio)
            return;
        if (!refWindow.start) {
            refWindow.start = { beta, gamma };
        }
        const diffBeta = beta - refWindow.start.beta;
        const diffGamma = gamma - refWindow.start.gamma;
        setState({
            y: diffBeta / 15,
            x: diffGamma / 15,
        });
    }, { passive: true });
    useListener(host, "mousemove", ({ currentTarget, clientX, clientY, }) => {
        if (!intersectio)
            return;
        const { innerWidth, innerHeight, clientWidth = innerWidth, clientHeight = innerHeight, } = currentTarget;
        const centerX = clientWidth / 2;
        const centerY = clientHeight / 2;
        // Reset the coordinates only to the observed container
        if (currentTarget.getBoundingClientRect) {
            const rect = currentTarget.getBoundingClientRect();
            clientX -= rect.x;
            clientY -= rect.y;
        }
        const x = clientX > centerX
            ? (clientX - centerX) / centerX
            : (1 - clientX / centerX) * -1;
        const y = clientY > centerY
            ? (clientY - centerY) / centerY
            : (1 - clientY / centerY) * -1;
        setState({ x, y });
    }, { passive: true });
    return state;
}

/**
 * this hook replaces a property with a setter and
 * getter to observe these mutations
 */
function usePropProxy(prop, config) {
    const host = useHost();
    const value = useCurrentValue(config);
    useState(() => {
        const { current } = host;
        const descriptor = Object.getOwnPropertyDescriptor(current.constructor.prototype, prop);
        Object.defineProperty(current, prop, {
            configurable: true,
            enumerable: !!descriptor?.enumerable,
            get() {
                if (value.current?.get) {
                    return value.current?.get();
                }
                if (descriptor?.get) {
                    return descriptor?.get?.call(current);
                }
            },
            set(nextValue) {
                if (value.current?.set) {
                    value.current?.set(nextValue);
                }
                if (descriptor?.set) {
                    return descriptor?.set?.call(current, nextValue);
                }
            },
        });
    });
}

/**
 * reflects an event to another node
 */
const reflectEvent = (current, event, composed) => {
    const { currentTarget } = event;
    const { shadowRoot } = currentTarget;
    const path = event.composedPath();
    if (path.includes(current))
        return;
    const index = path.indexOf(currentTarget);
    const insetShadowRoot = path
        .slice(0, index)
        .find((el) => el instanceof ShadowRoot);
    if (!composed && insetShadowRoot !== shadowRoot)
        return;
    event.preventDefault();
    event.stopImmediatePropagation();
    //@ts-ignore
    current.dispatchEvent(new event.constructor(event.type, event));
};
/**
 * This hook reflects an event and cancels its propagation
 */
function useReflectEvent(refFrom, refTo, type, { capture = true, composed = true, } = {}) {
    useListener(refFrom, type, (event) => {
        const { current } = refTo;
        current && reflectEvent(current, event, composed);
    }, { capture });
}

const listenersId = Symbol();
let resizeObserver;
/**
 * Observe the ResizeObserver state of a reference
 * @example
 * ```js
 * useResizeObserver(ref, (rect)=>{
 *  console.log(rect.width)
 * });
 * ```
 */
function useResizeObserver(ref, callback) {
    const value = useCurrentValue(callback);
    useRefEffect(() => {
        const { current } = ref;
        if (!current)
            return;
        if (!resizeObserver) {
            resizeObserver = new ResizeObserver((entries) => entries.forEach(({ contentRect, target }) => {
                const rect = contentRect.toJSON();
                const listeners = target[listenersId];
                for (const listener of listeners)
                    listener(rect);
            }));
        }
        /**
         * @param {Rect} rect
         */
        const listener = (rect) => value.current(rect);
        if (!current[listenersId]) {
            resizeObserver.observe(current);
            current[listenersId] = new Set();
        }
        current[listenersId].add(listener);
        return () => {
            current[listenersId].delete(listener);
            if (!current[listenersId].size) {
                delete current[listenersId];
                resizeObserver.unobserve(current);
            }
        };
    }, [ref]);
}
/**
 * Observes the ResizeObserver state of a reference and reflects
 * it to a local state of the component
 * @example
 * ```js
 * const ref = useResizeObserverState(ref);
 * if(ref){
 *  console.log(ref.width)
 * }
 * ```
 */
function useResizeObserverState(ref) {
    const [rect, setRect] = useState();
    useResizeObserver(ref, setRect);
    return rect;
}

// src/module.ts
var ID = Math.random();
var ID_REG = RegExp(`{${ID}-(\\d+)}`);
var CACHE$1 = {};
var getIndexParam = (value) => value.match(ID_REG)?.[1];
function media(parts, ...params) {
  const template = parts.raw.reduce((str, part, i) => str + part + (i in params ? `{${ID}-${i}}` : ""), "");
  if (!CACHE$1[template]) {
    CACHE$1[template] = parse(template);
  }
  const result = CACHE$1[template];
  return {
    result,
    match(callback) {
      let defaultResult;
      let value;
      for (let prop in result) {
        const currentResult = result[prop];
        if (currentResult.default) {
          defaultResult = currentResult;
        } else if (callback(currentResult)) {
          value = currentResult;
          break;
        }
      }
      value = value || defaultResult;
      return value.param ? params[value.param] : value.value;
    }
  };
}
function parse(template) {
  const groups = template.split(/,\s+/).map((value) => {
    value = value.trim();
    const test = value.match(/(.+)\s+(\d+(?:\.\d+){0,1})(\w+)$/);
    if (test) {
      const [, value2, size, unit] = test;
      return {
        value: value2,
        size: Number(size),
        unit,
        param: getIndexParam(value2)
      };
    } else {
      return {
        value,
        size: -1 >>> 0,
        unit: "",
        param: getIndexParam(value),
        default: true
      };
    }
  });
  return groups.sort((a, b) => a.size > b.size ? -1 : 1);
}

const CACHE_TEMPLATE$1 = {};
function useRefResizeState(ref, sizes) {
    const template = media.call(null, {
        raw: [sizes],
    });
    const [state, setState] = useState();
    function getState() {
        const { clientWidth } = ref.current;
        return template.match(({ size }) => size <= clientWidth);
    }
    useResizeObserver(ref, () => setState(getState));
    return state;
}
function useResizeState(part, ...args) {
    const ref = useHost();
    let template;
    if (typeof part === "string") {
        if (!CACHE_TEMPLATE$1[part]) {
            CACHE_TEMPLATE$1[part] = media.call(null, { raw: [part] });
        }
        template = CACHE_TEMPLATE$1[part];
    }
    else {
        template = media.call(null, part, ...args);
    }
    const [state, setState] = useState();
    function getState() {
        const { clientWidth } = ref.current;
        return template.match(({ size }) => size <= clientWidth);
    }
    useResizeObserver(ref, () => setState(getState));
    return state;
}

const CACHE = {};
const CACHE_TEMPLATE = {};
const getId = ({ size, unit }) => `(min-width: ${size}${unit})`;
function useResponsiveState(part, ...args) {
    let template;
    if (typeof part === "string") {
        if (!CACHE_TEMPLATE[part]) {
            CACHE_TEMPLATE[part] = media.call(null, { raw: [part] });
        }
        template = CACHE_TEMPLATE[part];
    }
    else {
        template = media.call(null, part, ...args);
    }
    const check = () => template.match((result) => {
        if (options.ssr)
            return false;
        const id = getId(result);
        CACHE[id] = CACHE[id] || matchMedia(id);
        return CACHE[id].matches;
    });
    const [value, setValue] = useState(check);
    useEffect(() => {
        const unlisteners = template.result
            .filter((result) => !result.default)
            .map((result) => {
            const id = getId(result);
            CACHE[id] = CACHE[id] || matchMedia(id);
            const eventType = "change";
            const eventHandler = () => {
                setValue(check);
            };
            CACHE[id].addEventListener(eventType, eventHandler);
            return () => {
                CACHE[id].removeEventListener(eventType, eventHandler);
            };
        });
        setValue(check);
        return () => unlisteners.forEach((fn) => fn());
    }, [template.result]);
    return value;
}

const HASH = "(?:(?:/)?#(?:/)?)";
const SLASH = "(?:/)";
/**
 *
 * @param {string} path
 * @return {[RegExp,string[]]}
 */
function pathToRegExp(path) {
    const params = [];
    const folders = path
        .replace(/#(\/)?/, "/#")
        .split(/\//g)
        .filter((value) => value);

    const regFolders = folders
        .map((folder, index) => {
            if (folder === "*")
                return `${SLASH}${
                    index === folders.length - 1 ? "?" : ""
                }[^\/]${index === folders.length - 1 ? "*" : "+"}`;
            if (folder === "...") return `${SLASH}?.*`;
            const [, hash = "", type, spread, param] = folder.match(
                /(#)?([\{\[])?(\.\.\.)?(\w*)([\}\]])?/
            );
            if (type == "{" || type == "[") {
                params.push(param);
                const wildcard = type == "[" ? "*" : "+";
                const slash =
                    (hash ? HASH : SLASH) + (type == "[" ? "?" : "{1}");
                return spread
                    ? `${slash}(.${wildcard})`
                    : `${slash}([^\/#]${wildcard})`;
            } else {
                return (
                    (hash ? HASH : "/") +
                    ignore(hash ? folder.slice(1) : folder)
                );
            }
        })
        .join("");
    // Hash paths escape the path start requirement
    const isHash = !regFolders.indexOf(HASH);
    return [
        RegExp(
            (isHash ? "" : "^") +
                (regFolders || SLASH + "?") +
                // closed paths are only enabled out of hash
                (!isHash && path != "/" && path.endsWith("/") ? "/" : "") +
                "$"
        ),
        params,
    ];
}

/**
 *
 * @param {string} str
 */
const ignore = (str) => str.replace(/([.+^()\-:])/g, "\\$1");

/**
 *
 * @param {string} path
 */
const getParts = (path) => path.split(/(\?.*)/);
/**
 * @param {string} search
 * @param {import("./exp-route.js").Params} [props]
 */
function searchParams(search, props = {}) {
    search.replace(
        /(?:\?|&){1}([^=&]+)(?:=([^\?&]+)){0,1}/g,
        /**
         * @param {string} _
         * @param {string} index
         * @param {string} value
         */
        (_, index, value) => {
            props[index] = value;
            return "";
        }
    );
    return props;
}

/**
 *
 * @param {string} regPath
 */
function createMatch(regPath) {
    const [path] = getParts(regPath);
    const [testPath, paramsPath] = pathToRegExp(path);
    /**
     * @param {string} request
     */
    const match = (request) => {
        const [path] = getParts(request);
        const test = path.match(testPath);
        if (test) {
            const [, ...args] = test;
            const query = {};
            return args.reduce((p, value, index) => {
                p[paramsPath[index]] = value;
                return p;
            }, query);
        }
    };
    return match;
}

/**
 * @typedef {Record<string,string>} Params
 */

/**
 * @typedef {(path:string)=>Params|undefined} Match
 */

function redirect(path, title = path) {
    if (history.state?.path === path)
        return;
    history.pushState({ path }, title, path);
    globalThis.dispatchEvent(new PopStateEvent("popstate"));
}
const getPath = () => location.pathname + location.hash + location.search;

const refGlobalThis = createRef(globalThis);
const cache$1 = {};
function useRouter(router, memo) {
    const [id, setId] = useState(getPath);
    useListener(refGlobalThis, "popstate", () => {
        setId(getPath);
    });
    return useMemo(() => {
        for (const path in router) {
            cache$1[path] = cache$1[path] || createMatch(path);
            const params = cache$1[path](id);
            if (params) {
                const result = router[path](params, { id, path });
                return { result, id, path, params, redirect };
            }
        }
    }, [id, memo]);
}

const cache = {};
const importScript = (src) => (cache[src] =
    cache[src] ||
        new Promise((resolve) => {
            if (!options.ssr)
                return;
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve();
            document.head.append(script);
        }));
const useScript = (src) => usePromise(importScript, [src]);

/**
 * returns the assigned nodes of a slot
3 */
function useSlot(ref, filter) {
    const [childNodes, setChildNodes] = useState([]);
    useRefEffect(() => {
        const { current } = ref;
        if (!current)
            return;
        // handler subscriber to the event
        const handler = () => setChildNodes(current
            .assignedNodes()
            .filter((child) => !(child instanceof Mark) &&
            (filter ? filter(child) : true)));
        // First load
        handler();
        // listener and unlistener
        return addListener(current, "slotchange", handler);
    }, [ref]);
    return childNodes;
}
/**
 * creates a persistent list of nodes from a source with the intention of
 * keeping the node in the list as long as it remains on the host
 */
function useProxySlot(ref, filter) {
    const host = useHost();
    const children = useSlot(ref, filter);
    const [currentChildren, setCurrentChildren] = useState(children);
    const intoHost = (node) => node.parentElement === host.current;
    useEffect(() => {
        if (!children.length)
            return;
        // clean the list keeping only the nodes nested in the host
        setCurrentChildren([...currentChildren, ...children].filter(intoHost));
    }, children);
    useEffect(() => {
        if (!currentChildren.length)
            return;
        // gets all assigned slots
        const slots = new Set(currentChildren.map((child) => child.assignedSlot));
        // Avoid the reference given as parameter
        slots.delete(ref.current);
        const unlisteners = [...slots].map((slot) => addListener(slot, "slotchange", () => setCurrentChildren((children) => {
            // clean the list keeping only the nodes nested in the host
            const next = children.filter(intoHost);
            if (children.length === next.length)
                return children;
            return next;
        })));
        // remove the subscription to assigned slots
        return () => unlisteners.map((unlistener) => unlistener());
    }, currentChildren);
    return currentChildren;
}

/**
 * save the first parameter in a list
 */
function useHistory(value, maxLength = 100) {
    const [state] = useState(() => ({ history: [] }));
    if (state.history[state.history.length - 1] !== value) {
        state.history = [...state.history, value].slice(maxLength * -1);
    }
    return state.history;
}

function gallery({ items }) {
  const refSlotTemplate = useRef();
  const Templates = useProxySlot(refSlotTemplate, (el) => el instanceof HTMLElement);
  return /* @__PURE__ */ jsxs("host", { shadowDom: true, children: [
    /* @__PURE__ */ jsx("template", { children: /* @__PURE__ */ jsx("slot", { ref: refSlotTemplate }) }),
    /* @__PURE__ */ jsxs("div", { class: "mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 max-h-screen", children: [
      /* @__PURE__ */ jsx("slot", { name: "title" }),
      /* @__PURE__ */ jsx("y-array", { array: items, class: "mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8", children: Templates.map(
        (Template, index) => /* @__PURE__ */ jsx(Template, { cloneNode: true })
      ) })
    ] })
  ] });
}
gallery.props = {
  items: Y.Array
};
gallery.styles = css`*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.aspect-h-1{--tw-aspect-h: 1}.aspect-w-1{position:relative;padding-bottom:calc(var(--tw-aspect-h) / var(--tw-aspect-w) * 100%);--tw-aspect-w: 1}.aspect-w-1>*{position:absolute;height:100%;width:100%;inset:0}.absolute{position:absolute}.relative{position:relative}.inset-0{inset:0}.mx-auto{margin-left:auto;margin-right:auto}.mt-1{margin-top:.25rem}.mt-4{margin-top:1rem}.mt-6{margin-top:1.5rem}.block{display:block}.flex{display:flex}.grid{display:grid}.h-full{height:100%}.max-h-screen{max-height:100vh}.w-full{width:100%}.max-w-2xl{max-width:42rem}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.justify-between{justify-content:space-between}.gap-x-6{-moz-column-gap:1.5rem;column-gap:1.5rem}.gap-y-10{row-gap:2.5rem}.overflow-hidden{overflow:hidden}.rounded-md{border-radius:.375rem}.bg-gray-200{--tw-bg-opacity: 1;background-color:rgb(229 231 235 / var(--tw-bg-opacity))}.object-cover{-o-object-fit:cover;object-fit:cover}.object-center{-o-object-position:center;object-position:center}.px-4{padding-left:1rem;padding-right:1rem}.py-16{padding-top:4rem;padding-bottom:4rem}.text-sm{font-size:.875rem;line-height:1.25rem}.font-medium{font-weight:500}.text-gray-500{--tw-text-opacity: 1;color:rgb(107 114 128 / var(--tw-text-opacity))}.text-gray-700{--tw-text-opacity: 1;color:rgb(55 65 81 / var(--tw-text-opacity))}.text-gray-900{--tw-text-opacity: 1;color:rgb(17 24 39 / var(--tw-text-opacity))}@media (min-width: 1024px){.lg\:aspect-none{position:static;padding-bottom:0}.lg\:aspect-none>*{position:static;height:auto;width:auto;inset:auto}}.group:hover .group-hover\:opacity-75{opacity:.75}@media (min-width: 640px){.sm\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.sm\:px-6{padding-left:1.5rem;padding-right:1.5rem}.sm\:py-24{padding-top:6rem;padding-bottom:6rem}}@media (min-width: 1024px){.lg\:h-80{height:20rem}.lg\:h-full{height:100%}.lg\:w-full{width:100%}.lg\:max-w-7xl{max-width:80rem}.lg\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.lg\:px-8{padding-left:2rem;padding-right:2rem}}@media (min-width: 1280px){.xl\:gap-x-8{-moz-column-gap:2rem;column-gap:2rem}}:host{margin-left:auto;margin-right:auto;display:block}`;
customElements.define("product-card", c(function({ name, price, imageSrc, imageAlt, href, color }) {
  return /* @__PURE__ */ jsx("host", { shadowDom: true, children: /* @__PURE__ */ jsxs("div", { class: "group relative", children: [
    /* @__PURE__ */ jsx("div", { class: "aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80", children: /* @__PURE__ */ jsx("img", { src: imageSrc, alt: imageAlt, class: "h-full w-full object-cover object-center lg:h-full lg:w-full" }) }),
    /* @__PURE__ */ jsxs("div", { class: "mt-4 flex justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { class: "text-sm text-gray-700", children: /* @__PURE__ */ jsxs("a", { href, children: [
          /* @__PURE__ */ jsx("span", { "aria-hidden": "true", class: "absolute inset-0" }),
          name
        ] }) }),
        /* @__PURE__ */ jsx("p", { class: "mt-1 text-sm text-gray-500", children: color })
      ] }),
      /* @__PURE__ */ jsx("p", { class: "text-sm font-medium text-gray-900", children: price })
    ] })
  ] }) });
}, {
  styles: css`*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.aspect-h-1{--tw-aspect-h: 1}.aspect-w-1{position:relative;padding-bottom:calc(var(--tw-aspect-h) / var(--tw-aspect-w) * 100%);--tw-aspect-w: 1}.aspect-w-1>*{position:absolute;height:100%;width:100%;inset:0}.absolute{position:absolute}.relative{position:relative}.inset-0{inset:0}.mx-auto{margin-left:auto;margin-right:auto}.mt-1{margin-top:.25rem}.mt-4{margin-top:1rem}.mt-6{margin-top:1.5rem}.block{display:block}.flex{display:flex}.grid{display:grid}.h-full{height:100%}.max-h-screen{max-height:100vh}.w-full{width:100%}.max-w-2xl{max-width:42rem}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.justify-between{justify-content:space-between}.gap-x-6{-moz-column-gap:1.5rem;column-gap:1.5rem}.gap-y-10{row-gap:2.5rem}.overflow-hidden{overflow:hidden}.rounded-md{border-radius:.375rem}.bg-gray-200{--tw-bg-opacity: 1;background-color:rgb(229 231 235 / var(--tw-bg-opacity))}.object-cover{-o-object-fit:cover;object-fit:cover}.object-center{-o-object-position:center;object-position:center}.px-4{padding-left:1rem;padding-right:1rem}.py-16{padding-top:4rem;padding-bottom:4rem}.text-sm{font-size:.875rem;line-height:1.25rem}.font-medium{font-weight:500}.text-gray-500{--tw-text-opacity: 1;color:rgb(107 114 128 / var(--tw-text-opacity))}.text-gray-700{--tw-text-opacity: 1;color:rgb(55 65 81 / var(--tw-text-opacity))}.text-gray-900{--tw-text-opacity: 1;color:rgb(17 24 39 / var(--tw-text-opacity))}@media (min-width: 1024px){.lg\:aspect-none{position:static;padding-bottom:0}.lg\:aspect-none>*{position:static;height:auto;width:auto;inset:auto}}.group:hover .group-hover\:opacity-75{opacity:.75}@media (min-width: 640px){.sm\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.sm\:px-6{padding-left:1.5rem;padding-right:1.5rem}.sm\:py-24{padding-top:6rem;padding-bottom:6rem}}@media (min-width: 1024px){.lg\:h-80{height:20rem}.lg\:h-full{height:100%}.lg\:w-full{width:100%}.lg\:max-w-7xl{max-width:80rem}.lg\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.lg\:px-8{padding-left:2rem;padding-right:2rem}}@media (min-width: 1280px){.xl\:gap-x-8{-moz-column-gap:2rem;column-gap:2rem}}`,
  props: {
    name: String,
    price: String,
    imageSrc: String,
    imageAlt: String,
    href: String,
    color: String
  }
}));
const Gallery = c(gallery);

export { Gallery };
