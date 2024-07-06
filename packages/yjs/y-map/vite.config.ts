import atomico from "@atomico/vite";
import {defineConfig} from "vite";
import {resolve} from "path";

export default defineConfig({
    
    build: {
        cssCodeSplit: true, 
        reportCompressedSize: true,
        emptyOutDir: true  
    }, 
    optimizeDeps: {
        entries: [resolve(__dirname, "lib/index.js")]
    }, 
    plugins: atomico({
        vitest: false, 
        tsconfig: resolve(__dirname, "tsconfig.json"),
        cssLiterals: {
            minify: true,
            postcss: true
        }
    })
});