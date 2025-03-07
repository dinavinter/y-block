import { type Route, route, serveDir } from "@std/http";
import {hocuspocusHandler} from "./hocuspocus.ts";

const routes: Route[] = [
  {
    pattern: new URLPattern({ pathname: "/" }),
    handler: (req: Request, info:Deno.ServeHandlerInfo<Deno.NetAddr>) => new Response(`
<head>
  <script type="importmap">
        {
          "imports": {
            "atomico": "https://unpkg.com/atomico",
             "atomico": "https://esm.sh/atomico",
             "atomico/": "https://esm.sh/atomico/",
             "@atomico/": "https://esm.sh/@atomico/",
             "allow-deduple": "https://esm.sh/@atomico/wrapper/allow-deduple",
             "@y-block/splitter": "https://esm.sh/@y-block/splitter@1.0.2-beta.15",
             "@y-block/store/" : "https://esm.sh/@y-block/store@1.0.2-beta.16/", 
             "@y-block/dom" : "https://esm.sh/@y-block/dom@1.0.2-beta.15" ,
             "@y-block/cm/define": "https://esm.sh/@y-block/cm@1.0.2-beta.23/element.define",
             "yjs": "https://esm.sh/yjs"
          }
        }
        </script>
 <script type="module" >
   import "https://esm.sh/@y-block/primitives/array.define";
    import '@y-block/cm/define';
    import '@y-block/splitter';
    import "@y-block/store/ws";
    import "@y-block/store/hocuspocus";
    import "@y-block/store/doc.define";
    import "@y-block/dom";
   
</script>

</head>
<body>
<y-store>
        <y-provider-hs address="ws://localhost:4567">
          <h1>Editor</h1>
        <y-dom-render source="cm" target="dom"></y-dom-render>
        <y-split>
          <y-cm store="cm" slot="col-1"></y-cm>
          <y-fragment store="dom" slot="col-2" className="m-20 p-10  resize-x container"></y-fragment>
        </y-split>
        </y-provider-hs>
</y-store>
</body>`, {
        headers: {
            "Content-Type": "text/html",
        },
    }),
  },
  {
    pattern: new URLPattern({ pathname: "/users/:id" }),
    handler: (_req, _info, params) => new Response(params?.pathname.groups.id),
  },
  {
    pattern: new URLPattern({ pathname: "/static/*" }),
    handler: (req) => serveDir(req),
  },{
        pattern: new URLPattern({ pathname: "/ws" }),
        handler: hocuspocusHandler
    }
   
];

function defaultHandler(_req: Request) {
  return new Response("Not found", { status: 404 });
}

const handler = route(routes, defaultHandler);
export default {
   fetch(req, info) {
       
    return handler(req);
  }, 
} satisfies Deno.ServeDefaultExport;


/*
if (req.headers.get("upgrade") === "websocket") {
           const { socket, response } = Deno.upgradeWebSocket(req);
           socket.on = socket.addEventListener.bind(socket);
           socket.off = socket.removeEventListener.bind(socket);
           socket.emit = socket.dispatchEvent.bind(socket);
           socket.removeListener = socket.removeEventListener.bind(socket);
           socket.once = (event, listener) => {
                const wrappedListener = (event) => {
                     listener(event);
                     socket.off(event.type, wrappedListener);
                };
                socket.on(event, wrappedListener);
              };

           socket.onmessage = (event) => {
               console.log(`RECEIVED: ${event.data}`);
              
           };

           socket.onopen = () => {
               console.log("CONNECTED");

               hocuspocusHandler({
                   request: req,
                   socket
               });
           };

           console.log("Upgraded to WebSocket " , socket, response);
         
           return response;
       }
 */