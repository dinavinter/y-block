import atomico from "@atomico/vite";
import {defineConfig} from "vite";

export default defineConfig({

    build: {

        ssrManifest: true,
        commonjsOptions: {
            esmExternals: true,
        },
        cssCodeSplit: true,
        cssMinify: true,
        manifest: true,
        emptyOutDir: true,
        lib: {
            entry: {
                index: "src/index.tsx",
                "define/props": "src/props.define.ts",
                "define/map": "src/map.define.ts",
                "define/array": "src/array.define.ts",
                "map": "src/map.tsx",
                "array": "src/array.tsx",
                "props": "src/props.tsx",
            },
        }
    },
    

    plugins: atomico({
        cssLiterals: {minify: true, postcss: true}, customElements: {
            prefix: "y",
            define: ["./src/*.tsx"],
            


        }, storybook: {
            fullReload: true,
            include: ["src/*.stories.tsx"],
        }
    }),
});

/*
[{
                entry: "src/index.ts",
                formats: ["es"],
                fileName: "index",
                name: "Y",
            }, {
                entry: "src/props.define.ts",
                formats: ["es"],
                fileName: "props.define",
                name: "define/props",
            }, {
                entry: "src/map.define.ts",
                formats: ["es"],
                fileName: "map",
                name: "define/map",
            }, {
                entry: "src/array.define.ts",
                formats: ["es"],
                fileName: "array",
                name: "define/array",
            }]
 */