 
import {defineRenderHandler} from "nitropack/runtime";

export default defineRenderHandler(async (_event) => {
    
    // @ts-ignore
    await import("atomico/ssr/load");
    const {html} = await import("atomico/html");
    await import('@y-block/cm');

    return {
        body:html`<y-cm>server/routes/index.ts</y-cm>`.render(),
    };
});


