import * as Y from "yjs";
export declare const YDocStore: import("atomico/types/dom").Atomico<{
    state: {
        doc: Y.Doc;
    };
    value: {
        state: {
            doc: Y.Doc;
        };
        subscribe(callback: (state: {
            doc: Y.Doc;
        }) => any): () => boolean;
    };
    onUpdateStore: (event: CustomEvent<{
        doc: Y.Doc;
    }>) => any;
} & {
    memo?: any[];
}, {
    state: {
        doc: Y.Doc;
    };
    value: {
        state: {
            doc: Y.Doc;
        };
        subscribe(callback: (state: {
            doc: Y.Doc;
        }) => any): () => boolean;
    };
    onUpdateStore: (event: CustomEvent<{
        doc: Y.Doc;
    }>) => any;
} & {
    memo?: any[];
}, {
    new (): HTMLElement;
    prototype: HTMLElement;
}>;
export declare const YSyncedDoc: import("atomico/types/dom").Atomico<unknown, unknown, {
    new (): HTMLElement;
    prototype: HTMLElement;
}>;
type YDocCreationOptions = ConstructorParameters<typeof Y.Doc>[0];
export declare const YStore: import("atomico/types/dom").Atomico<unknown, unknown, {
    new (): HTMLElement;
    prototype: HTMLElement;
}>;
export declare const useSyncedDoc: (options?: ConstructorParameters<typeof Y.Doc>[0]) => Y.Doc;
export declare const createSyncedDoc: (doc: Y.Doc, options?: YDocCreationOptions | string) => Y.Doc;
export declare function syncDocs(doc1: Y.Doc, doc2: Y.Doc): void;
export {};
