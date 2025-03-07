import {  EdgeRuntime, runServer} from 'edge-runtime'
import {onExit} from 'signal-exit'

import * as fs from "node:fs";
const  initialCode = fs.readFileSync('./playground.ts', 'utf8')

const edgeRuntime = new EdgeRuntime({
       initialCode, 
       extend(context) {
           context.globalThis.Deno = true
           return context
       }
})

const server = await runServer({runtime: edgeRuntime, port: 3000 , writableAll:true, readableAll:true} )
console.log(`> Edge server running at ${server.url}`)
onExit(() => {
    server
        .close()
        .then(() => console.log('> Edge server closed'))
        .catch(console.error);
})

