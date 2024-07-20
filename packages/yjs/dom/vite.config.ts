import atomico from "@atomico/vite";
import { defineConfig } from "vite";

export default defineConfig({
        
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
               
        plugins: atomico({ cssLiterals: { minify: true, postcss: true  }, customElements:{
                        prefix: "y",
                define: [ "./src/*.tsx"],
                         
              
                }, storybook: {
                        fullReload: true,
                        include: ["src/*.stories.tsx"],
                } }),
});