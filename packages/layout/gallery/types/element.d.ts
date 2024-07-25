import { Component } from "atomico";
import * as Y from 'yjs';
export interface GalleryProps {
    items: Y.Array<any>;
}
export declare function gallery(): Component<GalleryProps>;
export declare namespace gallery {
    var props: {
        items: {
            type: typeof Y.Array;
            reflect: boolean;
        };
    };
    var styles: import("atomico").Sheet;
}
export declare const Gallery: import("atomico/types/dom").Atomico<{} & {
    items?: Y.Array<unknown>;
}, {} & {
    items?: Y.Array<unknown>;
}, {
    new (): HTMLElement;
    prototype: HTMLElement;
}>;
