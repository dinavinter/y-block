import {c, useMemo} from "atomico";
// import {userAwareness} from "../user-awareness/user-awareness";
import { useStore} from "@atomico/store";
import {YDocStore} from "~/doc";
import {WebsocketProvider} from "y-websocket";

customElements.define('y-provider-ws', c(({room, address}) => {
    const {awareness, doc} = useStore(YDocStore);
     const provider = useMemo(( ) => { 
         if(doc){
             const wsProvider = new WebsocketProvider(`${address}`, room, doc, {
                    connect: true,
                    awareness: awareness 
             })
             wsProvider.connect()
             wsProvider.on('status', (event: { connected: boolean; }) => {
                 event.connected? console.log('WS connected:', event) :console.log('WS disconnected:', event)
             })
             return {
                 provider: wsProvider,
                 doc: doc,
                 awareness: wsProvider.awareness,
             }
         } 
    }, [doc, room])

    // useEffect(() => {
    //     store.doc = provider?.doc
    //     store.awareness = provider?.awareness
    // }, [provider]);

    console.debug('ws-provider: provider', provider)


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
            value: "ws://127.0.0.1:1234"
        }
    }
}))

