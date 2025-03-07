import "atomico/ssr/load";

export default eventHandler(async (event) => {
  const {html} = await import("atomico/html");
  await import('@y-block/cm')
  await import('@y-block/dom')

  return event.respondWith(new Response(html`<y-cm>server/routes/index.ts</y-cm>`.render() , {status: 200, headers: { "Content-Type": "text/html" } }));
});


