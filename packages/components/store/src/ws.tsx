import {c, useEffect, useMemo} from "atomico";
// import {userAwareness} from "../user-awareness/user-awareness";
import {useProviderStore, useStore} from "@atomico/store";
// import {YConnectorStore} from "../provider-store/provider-store";
import * as Y from "yjs";
import { WebsocketProvider } from 'y-websocket'
import {useSyncedDoc, YDocStore} from "./doc";

customElements.define('y-provider-ws', c(({room, address}) => {
    // const doc= useSyncedDoc() 
      const store = useStore(YDocStore);
      const doc = store?.doc 
     const provider = useMemo(( ) => { 
         if(doc){
             const wsProvider = new WebsocketProvider(`${address}`, room, doc)
             wsProvider.connect()
             wsProvider.on('status', (event: { connected: boolean; }) => {
                 console.log('Status changed:', event)
             })
             return {
                 provider: wsProvider,
                 doc: doc,
                 awareness: wsProvider.awareness,
             }
         }
        

    }, [doc, room])

    useEffect(() => {
        store.doc = provider?.doc
        store.awareness = provider?.awareness
    }, [provider]);

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

