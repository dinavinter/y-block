import atomico from "@atomico/vite";
import { defineConfig,loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");
const atomicoConfig = () =>
    atomico({
        cssLiterals: { minify: true, postcss: true },
        customElements: {
            prefix: "y",
            define: ["./src/*.tsx"],
        },
        storybook: {
            fullReload: true,
            include: ["src/*.stories.tsx"],
        },
    });

export default defineConfig({
    define: {
        "process.env": env,
    },
    plugins: [
        tsconfigPaths({
            parseNative: false,
        }),
        ...atomicoConfig(),
    ],
//     optimizeDeps:{
//         exclude:['@hocuspocus/provider','yjs'],
        
//     },
    build: {
      
        ssrEmitAssets: true,
        ssrManifest: true,
        
        manifest: true,
        commonjsOptions: {
            esmExternals: true,
            chunkFileNames: 'chunks/[name].[hash].js',
            assetFileNames: 'assets/[name].[ext]',
            entryFileNames: '[name].js',
            format: 'esm',
            
        },
        cssCodeSplit: true,
        cssMinify: true,
        emptyOutDir: true,
         
        rollupOptions: { 
          preserveSymlinks: true,

          
          input: {
            'index': './src/index.ts',
            'input': './src/input.tsx',
          },
          output: {
            assetFileNames: 'assets/[name].[ext]',
            chunkFileNames: 'chunks/[name].[hash].js',
            entryFileNames: '[name].js',
            format: 'esm',
            dir: './lib',
            preserveModules: true,
          },
        },
    },
});
