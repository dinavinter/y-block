import atomico from "@atomico/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";


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
                    index: "src/index.ts",
                    cm: "src/element.tsx",
                    define: "src/element.define.ts",
                    colors: "src/colors.ts",
                    config: "src/config.ts",
                    vue: "wrappers/vue.ts",
                    react: "wrappers/vue.ts",
                    preact: "wrappers/vue.ts"

                },
            }
        },


        plugins: atomico({
            cssLiterals: {minify: true, postcss: true}



            , storybook: {
                fullReload: true,
                include: ["src/*.stories.tsx"],
            },
            runtimeWrappers: true
        })
        
}); 