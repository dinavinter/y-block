import { decorator } from "@atomico/storybook";

export const parameters = {
    actions: { argTypesRegex: "^on.*" },
    backgrounds: {
        default: "formas",
        values: [
            {
                name: "formas",
                value: "#F8F8F8",
            },
            {
                name: "white",
                value: "#fff",
            },
        ],
    },
    options: {
        storySort: {
            order: ["Welcome", "index", "components", ["*"]],
        },
    },
};

export const decorators = [decorator()];
