import atomico from "@atomico/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
const atomicoConfig =()=> atomico({ 
        cssLiterals: { minify: true, postcss: true  }, 
        customElements:{
                prefix: "y",
                define: [ "./src/*.tsx"], 
        }, storybook: {
                fullReload: true,
                include: ["src/*.stories.tsx"],
        } })


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
                                "define/doc": "src/doc.define.ts",
                                "hocuspocus": "src/hocuspocus.ts",
                                "ws": "src/ws.ts"
                        },
                }
        },


        plugins: [...atomico({
                cssLiterals: {minify: true, postcss: true}



                , storybook: {
                        fullReload: true,
                        include: ["src/*.stories.tsx"],
                },
                runtimeWrappers: true
        }),tsconfigPaths({
                parseNative: false,
        })]
});
