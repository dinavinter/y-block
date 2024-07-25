import * as Y from 'yjs';
export type ValueTypes = Object | number | null | Array<any> | string | Uint8Array | Y.AbstractType<any>;
export type Attributes = {
    [p: string]: ValueTypes;
};
export declare const YElement: import("atomico/types/dom").Atomico<{} & {
    element?: Y.XmlElement<{
        [key: string]: import("yjs/dist/src/internals").ValueTypes;
    }>;
}, {} & {
    element?: Y.XmlElement<{
        [key: string]: import("yjs/dist/src/internals").ValueTypes;
    }>;
}, {
    new (): HTMLElement;
    prototype: HTMLElement;
}>;
