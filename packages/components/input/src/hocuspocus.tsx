import { HocuspocusProvider } from "@hocuspocus/provider";
import { c, Props, Type, useEffect, useMemo, useProp } from "atomico";
import * as Y from "yjs";
import * as awarenessProtocol from "y-protocols/awareness";

export function connectHocuspocus({url="ws://localhost:1234",name="default",broadcast=true,forceSyncInterval=1000,connect=true}: Props<typeof connectHocuspocus>){
    // const {doc} = document// ?{doc:document} : useDocStore();
     const [docProp, setDoc] = useProp<Y.Doc>("doc");
    const [_p, setProvider] = useProp<HocuspocusProvider>("provider");
    const [_a, setAwareness] = useProp<awarenessProtocol.Awareness>("awareness")
    const doc = useMemo(()=>docProp || new Y.Doc({guid:name}),[docProp, name])
    const awareness = useMemo(()=>new awarenessProtocol.Awareness(doc),[doc])      
    const provider = useMemo(()=>new HocuspocusProvider({
        url: url ,
        name: name,
        document: doc || new Y.Doc({guid:name}),
        connect: connect,
        broadcast: broadcast,
        awareness: awareness,
        forceSyncInterval: forceSyncInterval,
        onConnect: () => {
            console.log("connected to", url, name, provider.document.guid);
        }
     }),[doc])


     useEffect(()=>{
        // setDoc(provider.document);
        setAwareness(provider.awareness);
        setProvider(provider);
     },[provider])
 
   
  
  return <host></host>
}

  connectHocuspocus.props={
    url: {
      type: String,
      required: true,
      default: "ws://localhost:1234",
    },
    name: {
      type: String,
      required: true,
      default: "default",
    },
    broadcast: {
      type: Boolean,
      required: false,
      reflect: true,
      default: true,
    },
    connect: {
      type: Boolean,
      required: false,
      reflect: true,
      default: true,
    },
    forceSyncInterval: {
      type: Number,
      required: true,
      attribute: "force-sync-interval",
    },
    doc: {
      type: Object as Type<Y.Doc>,
      required: false, 
      reflect: false
    },
    provider: {
      type: Object as Type<HocuspocusProvider>,
      required: false, 
      reflect: false
    },
    awareness: {
      type: Object as Type<awarenessProtocol.Awareness>,
      required: false, 
      reflect: false
    },

  
  }
  
  customElements.define("y-hocuspocus", c(connectHocuspocus));
  