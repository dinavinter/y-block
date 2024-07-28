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
                lib: {
                        entry: ["src/index.tsx" , 'src/element.tsx'],
                        formats: ["es"]
                },
        },  
     

        
       
        plugins: atomico({ cssLiterals: { minify: true, postcss: true }  }),
});