import atomico from "@atomico/vite";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");
const atomicoConfig =()=> atomico({ cssLiterals: { minify: true, postcss: true  }, customElements:{
  prefix: "y",
  define: [ "./src/*.tsx"],


}, storybook: {
  fullReload: true,
  include: ["src/*.stories.tsx"],
} })


export default defineConfig({
    define: {
        "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV),
        "process.env":  env
    },
    // optimizeDeps: {
    //   // include: ['@codemirror/state'],
    //   exclude: ['typescript'],
    //   holdUntilCrawlEnd: true,
    //   // needsInterop: ['@codemirror/state'],
    //   },
    build: {
      
        ssrEmitAssets: true,
        ssrManifest: true,

        manifest: true,
        commonjsOptions: {
            esmExternals: true,
            
        },
        cssCodeSplit: true,
        cssMinify: true,
        emptyOutDir: true,
         
        rollupOptions: {
          //  external: ['@codemirror/state', 'typescript','yjs'],
  

          // treeshake: {
          //   moduleSideEffects: ['@cxai/ide'],
          //   preset: 'safest',
          //   annotations: true,
          //   correctVarValueBeforeDeclaration: true,
          //   manualPureFunctions: ['@cxai/ide'],
          //   propertyReadSideEffects: true,
          //   tryCatchDeoptimization: true,
          //   unknownGlobalSideEffects: true,
          // },
          preserveSymlinks: true,
          plugins: [
            {
              name: 'codemirror',
              resolveId(id) {
                if (id.includes('@codemirror/state')) {
                  return id;
                }
              }
            }
          ],
          input: {
            'index': './src/index.ts',
            'element': './src/element.tsx',
            'input': './src/input.tsx',
            'worker': './src/worker.ts',
            'forms': './forms.html',
            'preview': './index.html',
          },
          
          output: {
            dir: './lib',
            entryFileNames: '[name].js',
            format: 'esm',
            preserveModules: true,
            
            chunkFileNames(chunkInfo) {
              if (chunkInfo.isEntry) {
                return  chunkInfo.name;   
              }
              const packageName = chunkInfo.name && chunkInfo.name.match(/.*node_modules\/(@?[^\/]*)/)?.[1];
              return `vendor-${packageName}`;   

            },
            // manualChunks:  function (id) {
            //   if (id.includes("node_modules")) {
            //      //find the package name, support nesting node_modules ../../node_modules/.pnpm/comlink@4.4.2/node_modules/comlink/dist/esm/comlink.mjs
            //      const packageName = id && id.match(/.*node_modules\/(@?[^\/]*)/)?.[1];
            //      return `vendor-${packageName}`;   
            //   }
            // }
          }
        }
       
       
      },

      plugins: [ tsconfigPaths({
        parseNative: false,
    }), ...atomicoConfig()],
    
});