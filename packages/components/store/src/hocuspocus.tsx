import {c, useEffect, useMemo} from "atomico";
// import {userAwareness} from "../user-awareness/user-awareness";
import {useProviderStore, useStore} from "@atomico/store";
// import {YConnectorStore} from "../provider-store/provider-store";
import * as Y from "yjs";
import { WebsocketProvider } from 'y-websocket'
import {useSyncedDoc, YDocStore} from "./doc";
import { HocuspocusProvider } from "@hocuspocus/provider";

customElements.define('y-provider-hs', c(({room, address}) => {
    // const doc= useSyncedDoc() 
      const {awareness, doc} = useStore(YDocStore);
     const provider = useMemo(( ) => { 
         if(doc){
             const hsprovider = new HocuspocusProvider({
                 url: address,
                 name: room,
                 document: doc,
                 // Listen for updates …
                 onAwarenessUpdate: ({ states }) => {
                     console.log("Awareness" , states);
                 },
                 awareness,
                 connect: true
             });


              hsprovider.on('status', (event: { connected: boolean; }) => {
                 console.log('Status changed:', event)
             })
             return {
                 provider: hsprovider,
                 doc: doc,
                 awareness: hsprovider.awareness,
             }
         }
        

    }, [doc, room])

    // useEffect(() => {
    //     store.doc = provider?.doc
    //     store.awareness = provider?.awareness
    // }, [provider]);

    console.log('ws-provider: provider', provider)

    // useProviderStore(YConnectorStore, provider, [room])

    return <host shadowDom  >
        <slot></slot>
    </host>
}, {
    props: {
        room: {
            type: String,
            reflect: true,
            value: "default"

        },
        address:{
            type: String,
            reflect: true,
            value: "ws://0.0.0.0:8080"
        }
    }
}))

