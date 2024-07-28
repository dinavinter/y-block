import atomico from "@atomico/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
const atomicoConfig =()=> atomico({ cssLiterals: { minify: true, postcss: true  }, customElements:{
                prefix: "y",
                define: [ "./src/*.tsx"],


        }, storybook: {
                fullReload: true,
                include: ["src/*.stories.tsx"],
        } })
export default defineConfig({
        plugins: [ tsconfigPaths({
                parseNative: false,
        }), ...atomicoConfig()],
        build: {
                ssrManifest: true,
                commonjsOptions: {
                        esmExternals: true,
                },
                cssCodeSplit: true,
                cssMinify: true,
                manifest: true,

            
        },
        
        optimizeDeps:{
                // include: ["atomico", "@atomico/hooks"]
                entries: ["src/*"]
        },
               
 });