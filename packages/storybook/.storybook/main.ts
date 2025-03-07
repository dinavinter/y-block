import {mergeConfig} from "vite";
import atomico from "@atomico/vite";

const config = {
    stories: [
        "../src/**/*.mdx",
        // "../components/**/*.mdx",
        // "../../components/**/*.stories.@(js|jsx|ts|tsx)",
        "../../components/**/*.stories.@(js|jsx|ts|tsx)",
        "../components/**/*.mdx",
    ],
    addons: ["@storybook/addon-links", "@storybook/addon-essentials", '@storybook/addon-interactions'],
    staticDirs: ["../public"],
    framework: {
        name: "@storybook/web-components-vite",
        options: {},
    },
    docs: {
        autodocs: true,
    },
    // async webpackFinal(config) {
    //     // Add support for Vento.js templates
    //     config.module.rules.push({
    //         test: /\.vento$/,
    //         use: 'raw-loader'
    //     });
    //
    //     return config;
    // },
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
