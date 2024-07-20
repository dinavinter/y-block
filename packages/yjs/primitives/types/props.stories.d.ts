import "./array";
declare const _default: {
    args: {
        title: string;
        content: string;
        date: string;
    };
    id?: import("@storybook/types").ComponentId;
    title: import("@storybook/types").ComponentTitle;
    includeStories?: RegExp | string[];
    excludeStories?: RegExp | string[];
    component?: unknown;
    subcomponents?: Record<string, unknown>;
    play?: import("@storybook/types").PlayFunction<import("@atomico/storybook/types").Render, {
        bind: string;
    } & {
        props?: import("atomico/types/schema").FillObject;
    }>;
    decorators?: import("@storybook/types").DecoratorFunction<import("@atomico/storybook/types").Render, {
        bind: string;
        props?: import("atomico/types/schema").FillObject;
    }> | import("@storybook/types").DecoratorFunction<import("@atomico/storybook/types").Render, {
        bind: string;
        props?: import("atomico/types/schema").FillObject;
    }>[];
    parameters?: import("@storybook/types").Parameters;
    loaders?: import("@storybook/types").LoaderFunction<import("@atomico/storybook/types").Render, {
        bind: string;
    } & {
        props?: import("atomico/types/schema").FillObject;
    }> | import("@storybook/types").LoaderFunction<import("@atomico/storybook/types").Render, {
        bind: string;
    } & {
        props?: import("atomico/types/schema").FillObject;
    }>[];
    beforeEach?: ((context: import("@storybook/types").StoryContext<import("@atomico/storybook/types").Render, {
        bind: string;
    } & {
        props?: import("atomico/types/schema").FillObject;
    }>) => void | (() => unknown) | PromiseLike<void | (() => unknown)>) | ((context: import("@storybook/types").StoryContext<import("@atomico/storybook/types").Render, {
        bind: string;
    } & {
        props?: import("atomico/types/schema").FillObject;
    }>) => void | (() => unknown) | PromiseLike<void | (() => unknown)>)[];
    render?: import("@storybook/types").ArgsStoryFn<import("@atomico/storybook/types").Render, {
        bind: string;
    } & {
        props?: import("atomico/types/schema").FillObject;
    }>;
    tags?: import("@storybook/types").Tag[];
    argTypes?: import("@atomico/storybook/types").ArgTypes;
};
export default _default;
export declare const Story: (props: any) => any;
export declare const WithYArray: (props: any) => any;
