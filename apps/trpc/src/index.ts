import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from './router';
import {fetchHandler} from "trpc-playground/handlers/fetch";



addEventListener('fetch', async (event) => {
  // return event.respondWith(
  //   fetchRequestHandler({
  //     endpoint: '/trpc',
  //     req: event.request,
  //     router: appRouter,
  //     createContext: () => ({}),
  //   }),
  // );

    if(event.request.url.includes('/trpc')){
        return event.respondWith(
            fetchRequestHandler({
                endpoint: '/trpc',
                req: event.request,
                router: appRouter,
                createContext: () => ({}),
            }),
        );
    }
    const setupHandler =await fetchHandler({
        router: appRouter,
        trpcApiEndpoint: '/trpc',
        playgroundEndpoint: '/playground',
        // uncomment this if you're using superjson
        // request: {
        //     superjson: true,
        // },
    })

    return  event.respondWith(setupHandler(event.request));




});
