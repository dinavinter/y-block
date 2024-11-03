import 'atomico/ssr/load';
import '@atomico/store'
import '@y-block/dom'
import '@y-block/splitter'
import '@y-block/cm'

addEventListener('fetch', async event => {
    const {searchParams} = new URL(event.request.url)
    const url = searchParams.get('url')
    if (!!url) {
        return event.respondWith(await fetch(url))
    }

    return event.respondWith(new Response(await playground(), {status: 200, headers: {'Content-Type': 'text/html'}}))
})


//
async function playground() {
      await import ('atomico/ssr');
    const {html} = await import("atomico/html");
    // await import('@y-block/cm')
    // await import('@y-block/dom')
    // await import('@y-block/splitter')
    return new Response(html`<y-store>
        <y-provider-hs/>
          <h1>Editor</h1>
        <y-dom-render source="cm" target="dom"></y-dom-render>
        <y-split>
          <y-cm store="cm" slot="col-1"></y-cm>
          <y-fragment store="dom" slot="col-2" className="m-20 p-10  resize-x container"></y-fragment>
        </y-split>
      </y-store>`.render(), { headers: { "Content-Type": "text/html" } });

}