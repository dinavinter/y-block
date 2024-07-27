import * as Y from 'yjs';
import './props.define';
declare const _default: {
    title: import("@storybook/types").ComponentTitle;
    id?: import("@storybook/types").ComponentId;
    includeStories?: RegExp | string[];
    excludeStories?: RegExp | string[];
    component?: unknown;
    subcomponents?: Record<string, unknown>;
    play?: import("@storybook/types").PlayFunction<import("@atomico/storybook/types").Render, {} & {
        array?: Y.Array<unknown>;
    }>;
    decorators?: import("@storybook/types").DecoratorFunction<import("@atomico/storybook/types").Render, {
        array?: Y.Array<unknown>;
    }> | import("@storybook/types").DecoratorFunction<import("@atomico/storybook/types").Render, {
        array?: Y.Array<unknown>;
    }>[];
    parameters?: import("@storybook/types").Parameters;
    loaders?: import("@storybook/types").LoaderFunction<import("@atomico/storybook/types").Render, {} & {
        array?: Y.Array<unknown>;
    }> | import("@storybook/types").LoaderFunction<import("@atomico/storybook/types").Render, {} & {
        array?: Y.Array<unknown>;
    }>[];
    beforeEach?: ((context: import("@storybook/types").StoryContext<import("@atomico/storybook/types").Render, {} & {
        array?: Y.Array<unknown>;
    }>) => void | (() => unknown) | PromiseLike<void | (() => unknown)>) | ((context: import("@storybook/types").StoryContext<import("@atomico/storybook/types").Render, {} & {
        array?: Y.Array<unknown>;
    }>) => void | (() => unknown) | PromiseLike<void | (() => unknown)>)[];
    render?: import("@storybook/types").ArgsStoryFn<import("@atomico/storybook/types").Render, {} & {
        array?: Y.Array<unknown>;
    }>;
    tags?: import("@storybook/types").Tag[];
    argTypes?: import("@atomico/storybook/types").ArgTypes;
    args?: {} & {
        array?: Y.Array<unknown>;
    };
};
export default _default;
export declare const Story: (props: any) => any;
export declare const WithObjects: (props: any) => any;
export declare const Lazy: (props: any) => any;
export declare const WithProps: (props: any) => any;
export declare const WithExplicitBinding: (props: any) => any;
