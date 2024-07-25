import * as Y from 'yjs';
import "./map.define";
import "./array.define";
declare const _default: {
    title: import("@storybook/types").ComponentTitle;
    id?: import("@storybook/types").ComponentId;
    includeStories?: RegExp | string[];
    excludeStories?: RegExp | string[];
    component?: unknown;
    subcomponents?: Record<string, unknown>;
    play?: import("@storybook/types").PlayFunction<import("@atomico/storybook/types").Render, {} & {
        map?: Y.Map<unknown>;
    }>;
    decorators?: import("@storybook/types").DecoratorFunction<import("@atomico/storybook/types").Render, {
        map?: Y.Map<unknown>;
    }> | import("@storybook/types").DecoratorFunction<import("@atomico/storybook/types").Render, {
        map?: Y.Map<unknown>;
    }>[];
    parameters?: import("@storybook/types").Parameters;
    loaders?: import("@storybook/types").LoaderFunction<import("@atomico/storybook/types").Render, {} & {
        map?: Y.Map<unknown>;
    }> | import("@storybook/types").LoaderFunction<import("@atomico/storybook/types").Render, {} & {
        map?: Y.Map<unknown>;
    }>[];
    beforeEach?: ((context: import("@storybook/types").StoryContext<import("@atomico/storybook/types").Render, {} & {
        map?: Y.Map<unknown>;
    }>) => void | (() => unknown) | PromiseLike<void | (() => unknown)>) | ((context: import("@storybook/types").StoryContext<import("@atomico/storybook/types").Render, {} & {
        map?: Y.Map<unknown>;
    }>) => void | (() => unknown) | PromiseLike<void | (() => unknown)>)[];
    render?: import("@storybook/types").ArgsStoryFn<import("@atomico/storybook/types").Render, {} & {
        map?: Y.Map<unknown>;
    }>;
    tags?: import("@storybook/types").Tag[];
    argTypes?: import("@atomico/storybook/types").ArgTypes;
    args?: {} & {
        map?: Y.Map<unknown>;
    };
};
export default _default;
export declare const BasicMap: (props: any) => any;
export declare const ComplexMap: (props: any) => any;
export declare const LazyMap: (props: any) => any;
