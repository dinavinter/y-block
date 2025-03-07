//https://nitro.unjs.io/config
export default defineNitroConfig({
        srcDir: "server",
        sourceMap: "inline",
        renderer: '~/renderer.ts',
        compatibilityDate: "2024-09-29",
        imports: {
            autoImport: true,
            dirs: ["src"],
            virtualImports: ["https://esm.sh/atomico", "https://esm.sh/@atomico/store", "https://esm.sh/@y-block/cm@1.0.2-beta.5", "https://esm.sh/@y-block/dom", "https://esm.sh/@y-block/splitter", "https://esm.sh/tailwindcss/colors.js"]
        },
    }

);
