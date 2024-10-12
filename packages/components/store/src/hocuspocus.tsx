import {c,  useMemo} from "atomico";
import { useStore} from "@atomico/store";
import { YDocStore} from "./doc";
import { HocuspocusProvider } from "@hocuspocus/provider";

customElements.define('y-provider-hs', c(({room, address}) => {
      const {awareness, doc} = useStore(YDocStore);
     const provider = useMemo(( ) => { 
         if(doc){
             const hsprovider = new HocuspocusProvider({
                 url: address,
                 name: room,
                 document: doc,
                 
                 // Listen for updates …
                 onAwarenessUpdate: ({ states }) => {
                     console.debug("awareness" , states);
                 },
                 awareness,
                 connect: true
             });


              hsprovider.on('status', (event: { connected: boolean; }) => {
                  event.connected? console.log('Hocuspocus connected:', event) :console.log('Hocuspocus disconnected:', event)
             })
             return {
                 provider: hsprovider,
                 doc: doc,
                 awareness: hsprovider.awareness,
             }
         }
        

    }, [doc, room])

    // const store = useStore(YDocStore);
    //
    // useEffect(() => {
    //     store.doc = provider?.doc
    //     store.awareness = provider?.awareness
    // }, [provider]);

    console.log('ws-provider: provider', provider)


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

