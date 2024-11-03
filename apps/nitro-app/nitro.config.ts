//https://nitro.unjs.io/config
import { defineNitroConfig } from "nitropack/config";
import 'atomico/ssr/load';
export default defineNitroConfig({
  srcDir: "src",
  compatibilityDate: "2024-09-29",
  externals: {
    external: ["@atomico/store",  "atomico", "@atomico/hooks"],
  },
  modules:  [
    {}
  ],
  imports:{
    autoImport: true,
    dirs: ["src"],
     virtualImports: {
        "atomico": "https://unpkg.com/atomico",
        "@atomico/store": "https://esm.sh/@atomico/store"
        }
  },
  experimental: {
    bundleRuntimeDependencies: false,
     
    typescriptBundlerResolution: true,
    asyncContext: true,
 
  }
});
