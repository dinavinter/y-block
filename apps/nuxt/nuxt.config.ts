// import {createResolver} from 'nuxt-kit'
// https://nuxt.com/docs/api/configuration/nuxt-config
// const resolve = createResolver(import.meta.url).resolve
import { addServerHandler,defineNuxtModule, createResolver, addServerImportsDir } from '@nuxt/kit'
import {searchForWorkspaceRoot} from "vite";
// webpack: {
//     module: {
//         rules: [
//             {
//                 test: /\.worker\.js$/i,
//                 use: [
//                     {
//                         loader: 'comlink-loader',
//                         options: {
//                             singleton: true
//                         }
//                     }
//                 ]
//             }
//         ]
//     }
//
// },

export default defineNuxtConfig({
    setup(options) {
        const resolver = createResolver(import.meta.url)

        addServerHandler({
            route: '/robots.txt',
            handler: resolver.resolve('./runtime/robots.get.ts')
        })
        addServerImportsDir(resolver.resolve('./template'))
        

        resolver.alias('@template', './template')
    },
    compatibilityDate: '2024-04-03',
    devtools: {
      enabled: true,

      timeline: {
        enabled: true
      }
    },
    build: {
        transpile: ['@vue/repl' ],
    },

    nitro: {
        storage: {  
            db: {
                driver: 'fs',
                base: './.data/kv'
            }
        },
 
            serverAssets: [{
            baseName: 'template',
            dir: './template'
        }],
    },
    modules: ['nuxt-codemirror', '@nuxtjs/tailwindcss', '@vite-pwa/nuxt', '@vueuse/nuxt'],

    vite:{
        
        resolve: {
            alias: {
                '@template':  './template'
            },
        },
         optimizeDeps: {
            include : ['@vue/repl'],
        },
        server: {
            fs: {
                allow: ['..',  searchForWorkspaceRoot(process.cwd())]
            }
        },
    }

})