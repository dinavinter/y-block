// // file: /routes/[...trpc].ts
//
// // Import your router:
// import { appRouter } from '~/trpc/router.ts'
//
// import { defineNitroTRPCEventHandler } from 'trpc-nitro-adapter'
//
// // Export as default the defineNitroTRPCEventHandler function:
// export default defineNitroTRPCEventHandler({
//     router: appRouter,
//     createContext: () => {
//         // Return your custom defined context here:
//         return {}
//     }
// })