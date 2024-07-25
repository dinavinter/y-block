import * as awarenessProtocol from 'y-protocols/awareness';
import { ChangeSet } from "@codemirror/state";
import * as Y from "yjs";
type CustomDetail = {
    value: string;
    changeset?: ChangeSet;
};
export declare const YCm: import("atomico/types/dom").Atomico<{
    value: string;
    language: string;
    text: Y.Text;
    awareness: awarenessProtocol.Awareness;
    onChange: (event: CustomEvent<CustomDetail>) => any;
} & {}, {
    value: string;
    language: string;
    text: Y.Text;
    awareness: awarenessProtocol.Awareness;
    onChange: (event: CustomEvent<CustomDetail>) => any;
} & {}, {
    new (): HTMLElement;
    prototype: HTMLElement;
}>;
export {};
