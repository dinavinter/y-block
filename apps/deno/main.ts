import { type Route, route, serveDir } from "@std/http";

const routes: Route[] = [
  {
    pattern: new URLPattern({ pathname: "/" }),
    handler: () => new Response(`
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
             "@y-block/store/" : "https://esm.sh/@y-block/store@1.0.2-beta.15/", 
             "@y-block/dom" : "https://esm.sh/@y-block/dom@1.0.2-beta.15" ,
             "@y-block/cm/define": "https://esm.sh/@y-block/cm@1.0.2-beta.23/element.define",
             "yjs": "https://esm.sh/yjs"
          }
        }
        </script>
 <script type="module" >
   import * as Y from "yjs";
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
        <y-provider-hs ></y-provider-hs>
          <h1>Editor</h1>
        <y-dom-render source="cm" target="dom"></y-dom-render>
        <y-split>
          <y-cm store="cm" slot="col-1"></y-cm>
          <y-fragment store="dom" slot="col-2" className="m-20 p-10  resize-x container"></y-fragment>
        </y-split>
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
  },
];

function defaultHandler(_req: Request) {
  return new Response("Not found", { status: 404 });
}

const handler = route(routes, defaultHandler);

export default {
  fetch(req) {
    return handler(req);
  },
} satisfies Deno.ServeDefaultExport;
