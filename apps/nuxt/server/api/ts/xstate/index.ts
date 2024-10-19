// import {
//     createFSBackedSystem,
//     createSystem,
//     createVirtualCompilerHost,
//     createVirtualTypeScriptEnvironment
// } from "@typescript/vfs";
// import {server} from "vite";
//
// export default defineEventHandler(event => {
//     const fs = new Map<string, string>();
//     // const environment = server.environments.client
//     // addLib("xstate", fs)
//     // environment.transformRequest("https://esm.sh/xstate");
//     console.log(server.environments.ssr.moduleGraph)
//     const environment = server.environments.client;
//     const  transformed =await environment.transformRequest("https://esm.sh/xstate");
//     transformed.map.
//     const mdl =  import.meta.resolve("xstate" )
//         const system = createFSBackedSystem(fs, "..");
//       console.log("system" ,system.realpath("."));
//      
//    //   const compiler = createVirtualCompilerHost(system,   xstate, {
//    //          declaration: true,
//    //          declarationMap: true,
//    //          emitDeclarationOnly: true,
//    //      });
//    //  
//    // const mp= compiler.compilerHost.resolveModuleNameLiterals("xstate")
//    //
//    //  const a=  compiler.getSourceFile("index.ts")
//    //     const env = createVirtualTypeScriptEnvironment(system, ["index.ts"], xstate, {
//    //         declaration: true,
//    //         declarationMap: true,
//    //         emitDeclarationOnly: true,
//    //     });
//    //     env.
// }
//
// const getLib = (name: string) => {
//     const lib = dirname(require.resolve(name))
//     return readFileSync(join(lib, name), "utf8")
// }
//
// const addLib = (name: string, map: Map<string, string>) => {
//     map.set("/" + name, getLib(name))
// }
//
//
//
// //
// // import { createServer, createRunnableDevEnvironment } from 'vite'
// //
// // const server = await createServer({
// //     server: { middlewareMode: true },
// //     appType: 'custom',
// //     environments: {
// //         node: {
// //             dev: {
// //                 // Default Vite SSR environment can be overridden in the config, so
// //                 // make sure you have a Node environment before the request is received.
// //                 createEnvironment(name, config) {
// //                     return createRunnableDevEnvironment(name, config)
// //                 },
// //             },
// //         },
// //     },
// // })
// //
// // // You might need to cast this to RunnableDevEnvironment in TypeScript or use
// // // the "isRunnableDevEnvironment" function to guard the access to the runner
// // const environment = server.environments.node
// //
// // app.use('*', async (req, res, next) => {
// //     const url = req.originalUrl
// //
// //     // 1. Read index.html
// //     let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
// //
// //     // 2. Apply Vite HTML transforms. This injects the Vite HMR client,
// //     //    and also applies HTML transforms from Vite plugins, e.g. global
// //     //    preambles from @vitejs/plugin-react
// //     template = await server.transformIndexHtml(url, template)
// //
// //     // 3. Load the server entry. import(url) automatically transforms
// //     //    ESM source code to be usable in Node.js! There is no bundling
// //     //    required, and provides full HMR support.
// //     const { render } = await environment.runner.import('/src/entry-server.js')
// //
// //     // 4. render the app HTML. This assumes entry-server.js's exported
// //     //     `render` function calls appropriate framework SSR APIs,
// //     //    e.g. ReactDOMServer.renderToString()
// //     const appHtml = await render(url)
// //
// //     // 5. Inject the app-rendered HTML into the template.
// //     const html = template.replace(`<!--ssr-outlet-->`, appHtml)
// //
// //     // 6. Send the rendered HTML back.
// //     res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
// // })
