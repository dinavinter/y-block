import * as Y from 'yjs';
import "./fragment";
declare const _default: {
    id?: import("@storybook/types").ComponentId;
    title: import("@storybook/types").ComponentTitle;
    includeStories?: RegExp | string[];
    excludeStories?: RegExp | string[];
    component?: unknown;
    subcomponents?: Record<string, unknown>;
    play?: import("@storybook/types").PlayFunction<import("@atomico/storybook/types").Render, {} & {
        element?: Y.XmlElement<{
            [key: string]: import("yjs/dist/src/internals").ValueTypes;
        }>;
    }>;
    decorators?: import("@storybook/types").DecoratorFunction<import("@atomico/storybook/types").Render, {
        element?: Y.XmlElement<{
            [key: string]: import("yjs/dist/src/internals").ValueTypes;
        }>;
    }> | import("@storybook/types").DecoratorFunction<import("@atomico/storybook/types").Render, {
        element?: Y.XmlElement<{
            [key: string]: import("yjs/dist/src/internals").ValueTypes;
        }>;
    }>[];
    parameters?: import("@storybook/types").Parameters;
    loaders?: import("@storybook/types").LoaderFunction<import("@atomico/storybook/types").Render, {} & {
        element?: Y.XmlElement<{
            [key: string]: import("yjs/dist/src/internals").ValueTypes;
        }>;
    }> | import("@storybook/types").LoaderFunction<import("@atomico/storybook/types").Render, {} & {
        element?: Y.XmlElement<{
            [key: string]: import("yjs/dist/src/internals").ValueTypes;
        }>;
    }>[];
    beforeEach?: ((context: import("@storybook/types").StoryContext<import("@atomico/storybook/types").Render, {} & {
        element?: Y.XmlElement<{
            [key: string]: import("yjs/dist/src/internals").ValueTypes;
        }>;
    }>) => void | (() => unknown) | PromiseLike<void | (() => unknown)>) | ((context: import("@storybook/types").StoryContext<import("@atomico/storybook/types").Render, {} & {
        element?: Y.XmlElement<{
            [key: string]: import("yjs/dist/src/internals").ValueTypes;
        }>;
    }>) => void | (() => unknown) | PromiseLike<void | (() => unknown)>)[];
    render?: import("@storybook/types").ArgsStoryFn<import("@atomico/storybook/types").Render, {} & {
        element?: Y.XmlElement<{
            [key: string]: import("yjs/dist/src/internals").ValueTypes;
        }>;
    }>;
    tags?: import("@storybook/types").Tag[];
    argTypes?: import("@atomico/storybook/types").ArgTypes;
    args?: {} & {
        element?: Y.XmlElement<{
            [key: string]: import("yjs/dist/src/internals").ValueTypes;
        }>;
    };
};
export default _default;
export declare const BasicElement: (props: any) => any;
export declare const ComplexElement: (props: any) => any;
export declare const LazyElement: (props: any) => any;
