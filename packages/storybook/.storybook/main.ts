import { mergeConfig } from "vite";
import atomico from "@atomico/vite";
 const config = {
    stories: [
        "../src/**/*.mdx",
        "../components/**/*.mdx",
        "../../components/**/*.stories.@(js|jsx|ts|tsx)",
        "../../yjs/**/*.stories.@(js|jsx|ts|tsx)",
        "../yjs/**/*.mdx"
    ],
    addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
    staticDirs: ["../public"],
    framework: {
        name: "@storybook/web-components-vite",
        options: {},
    },
    docs: {
        autodocs: true,
    },
    async viteFinal(config) {
        return mergeConfig(config, {
            build: {
                target: "esnext",
            },
            plugins: [
                atomico({
                    cssLiterals: {
                        postcss: true,
                        
                    },
                }),
            ],
        });
    },
};

export default config;
