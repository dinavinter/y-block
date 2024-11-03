import {fetchRequestHandler} from "@trpc/server/adapters/fetch";
import {fetchHandler} from "trpc-playground/handlers/fetch";
import {appRouter} from "./router";

addEventListener('fetch', async (event) => {
    const setupHandler =await fetchHandler({
        router: appRouter,
        trpcApiEndpoint: '/trpc',
        playgroundEndpoint: '/playground',
        // uncomment this if you're using superjson
        request: {
            superjson: true,
        },
    })
    
    return  event.respondWith(  fetchRequestHandler(setupHandler));
// addEventListener('fetch', (event) => {
//     return event.respondWith(
//         fetchRequestHandler({
//             endpoint: '/trpc',
//             req: event.request,
//             router: appRouter,
//             createContext: () => ({}),
//         }),
//     );
});
