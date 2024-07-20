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
                reportCompressedSize: true,
                emptyOutDir: true,
                
        },  
     

        
       
        plugins: atomico({ cssLiterals: { minify: true, postcss: true }  }),
});