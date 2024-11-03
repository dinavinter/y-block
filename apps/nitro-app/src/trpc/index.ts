// import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
// import { appRouter } from './router';
// import {h3Handler} from "trpc-playground/handlers/h3";
//
// addEventListener('fetch', (event) => {
//     // const setupHandler = await h3Handler({
//     //     router: appRouter,
//     //     trpcApiEndpoint: '/routes/trpc',
//     //     playgroundEndpoint: '/routes/trpc-playground',
//     //     // uncomment this if you're using superjson
//     //     request: {
//     //         superjson: true,
//     //     },
//     // })
//     return event.respondWith(
//         fetchRequestHandler({
//             endpoint: '/trpc',
//             req: event.request,
//             router: appRouter,
//             createContext: () => ({}),
//         }),
//     );
// });