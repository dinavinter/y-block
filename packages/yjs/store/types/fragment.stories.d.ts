import * as Y from "yjs";
declare const _default: {
    args: {
        fragment: Y.XmlFragment;
    };
    id?: import("@storybook/types").ComponentId;
    title: import("@storybook/types").ComponentTitle;
    includeStories?: RegExp | string[];
    excludeStories?: RegExp | string[];
    component?: unknown;
    subcomponents?: Record<string, unknown>;
    play?: import("@storybook/types").PlayFunction<import("@atomico/storybook/types").Render, {} & {
        fragment?: Y.XmlFragment;
    }>;
    decorators?: import("@storybook/types").DecoratorFunction<import("@atomico/storybook/types").Render, {
        fragment?: Y.XmlFragment;
    }> | import("@storybook/types").DecoratorFunction<import("@atomico/storybook/types").Render, {
        fragment?: Y.XmlFragment;
    }>[];
    parameters?: import("@storybook/types").Parameters;
    loaders?: import("@storybook/types").LoaderFunction<import("@atomico/storybook/types").Render, {} & {
        fragment?: Y.XmlFragment;
    }> | import("@storybook/types").LoaderFunction<import("@atomico/storybook/types").Render, {} & {
        fragment?: Y.XmlFragment;
    }>[];
    beforeEach?: ((context: import("@storybook/types").StoryContext<import("@atomico/storybook/types").Render, {} & {
        fragment?: Y.XmlFragment;
    }>) => void | (() => unknown) | PromiseLike<void | (() => unknown)>) | ((context: import("@storybook/types").StoryContext<import("@atomico/storybook/types").Render, {} & {
        fragment?: Y.XmlFragment;
    }>) => void | (() => unknown) | PromiseLike<void | (() => unknown)>)[];
    render?: import("@storybook/types").ArgsStoryFn<import("@atomico/storybook/types").Render, {} & {
        fragment?: Y.XmlFragment;
    }>;
    tags?: import("@storybook/types").Tag[];
    argTypes?: import("@atomico/storybook/types").ArgTypes;
};
export default _default;
export declare const TextFragment: (props: any) => any;
export declare const InputFragment: (props: any) => any;
export declare const FormFragment: (props: any) => any;
