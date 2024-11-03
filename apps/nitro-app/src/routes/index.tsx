import 'atomico/ssr/load';
import '@atomico/store'
import '@y-block/dom'
import '@y-block/splitter'
import '@y-block/cm'

import { defineEventHandler, defineRequestMiddleware } from "h3";
// import {html} from "atomico";

 
 export const middleware = defineRequestMiddleware(async (event) => {
     const response = await event.$fetch();
     const html = await response.text();
     return event.respondWith(new Response(
         `<html >
         <head>
        <script type="importmap">
        {
          "imports": {
            "atomico": "https://unpkg.com/atomico",
            "@y-block/cm": "https://cdn.skypack.dev/@y-block/cm",
            "@y-block/dom": "https://cdn.skypack.dev/@y-block/dom",
            "@y-block/splitter": "https://cdn.skypack.dev/@y-block/splitter",
            "@y-block/store": "https://cdn.skypack.dev/@y-block/store"
          }
        }
        </script>
</head>
            <body>
                ${html}
            </body>
        </html>`, {headers: {"Content-Type": "text/html"}}))
 })

export  default  defineEventHandler(async (event) => {
    // console.log('event', document);
    await import ('atomico/ssr');
    const {html} = await import("atomico/html");
    // await import('@atomico/store')
    // await import('@y-block/dom')
    // await import('@y-block/splitter')
    return event.respondWith(new Response(html`<y-store>
        <y-provider-hs/>
          <h1>Editor</h1>
        <y-dom-render source="cm" target="dom"></y-dom-render>
        <y-split>
          <y-cm store="cm" slot="col-1"></y-cm>
          <y-fragment store="dom" slot="col-2" className="m-20 p-10  resize-x container"></y-fragment>
        </y-split>
      </y-store>`.render(), { headers: { "Content-Type": "text/html" } }));
      
});



// server/api/trpc-playground.ts

//
// export default defineLazyEventHandler(async () => {
//    
//     const setupHandler = await h3Handler({
//         router: appRouter,
//         trpcApiEndpoint: '/routes/trpc',
//         playgroundEndpoint: '/routes/trpc-playground',
//         // uncomment this if you're using superjson
//         request: {
//           superjson: true,
//         },
//     })
//
//     return defineEventHandler(setupHandler)
// })