import atomico from "@atomico/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";


export default defineConfig({

        build: {
            ssr: true,

            ssrManifest: true,
            commonjsOptions: {
                esmExternals: true,
            },
            cssCodeSplit: true,
            cssMinify: true,
            manifest: true,
            emptyOutDir: true,
            lib: {
                formats: ["es", "cjs"],
                entry: {
                    index: "src/index.ts",
                    cm: "src/element.tsx",
                    define: "src/element.define.ts",
                    colors: "src/colors.ts",
                    config: "src/config.ts"

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