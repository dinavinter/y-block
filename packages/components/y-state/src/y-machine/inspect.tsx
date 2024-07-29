import {createStore, useProviderStore, useStore} from "@atomico/store";
import {c, useCallback, useEffect, useRef, useRefEffect, useState} from "atomico";
import {createBrowserInspector} from "@statelyai/inspect";
import {InspectionEvent, Observer} from "xstate";

type InspectorStoreProps ={
    inspector?: ReturnType<typeof createBrowserInspector>

}

const InspectorStore = createStore<InspectorStoreProps>({
})

export const useInspector = () => useStore(InspectorStore)
customElements.define("inspector-store", c(function inspectorStore() {
    const store = useProviderStore(InspectorStore, {
     }, [])

  
    
    return <host shadowDom>
         <inspect-store>
            <slot></slot>
        </inspect-store>
    </host>

}))
type InspectStoreProps ={
    inspect?: ReturnType<typeof createBrowserInspector>["inspect"],

}
const inspectStore =createStore<InspectStoreProps>({
    
})
export const useInspect = () => useStore(inspectStore)

customElements.define("inspect-store", c(function () {
    const store = useStore(InspectorStore)
    const next = useCallback((e) => {
        console.debug("inspecting", e.type,e, store.inspector)
        store.inspector?.inspect.next(e)
    }, [store.inspector])

    const error = useCallback((e) => {
        console.error("error", e)
        store.inspector?.inspect.error(e)
    })

    const complete = useCallback(() => {
        console.debug("complete")
        store.inspector?.inspect.complete()
    })

    const inspect: Observer<InspectionEvent> = {
        next,
        error,
        complete
    };

     useProviderStore(inspectStore, {
        inspect: inspect
    }, [])
    
    return <host shadowDom>
        <slot></slot>
    </host>

}))



export const MachineInspector = c(function machineInspector() {
    const iframe = useRef<HTMLIFrameElement>()
    const [inspector, setInspector] = useState()
    const store = useStore(InspectorStore)
    //
    // const store =useProviderStore(InspectorStore, {
    //     inspector, 
    //     inspect:inspect, 
    //     stop:inspector?.stop, 
    //     // start:inspector?.start,
    //     adapter:inspector?.adapter
    // }, [inspector])
    
    useEffect(() => {
        if(inspector){
            console.debug("setting inspector", inspector, store)
            store.inspector = inspector
        }
    }, [inspector])
   
    useEffect(
        // 👇 current will be the value assigned to ref.current
        ()=>{ if(iframe.current ){
            const inspector = createBrowserInspector({
                filter: (inspEvent) => {
                    if (inspEvent.type === '@xstate.event') {
                        // Skip mouse drag events
                        return inspEvent.event.type !== 'mouse.drag';
                    }
                    return true;
                },
                autoStart: true, 
                
            })
            setInspector(inspector)
 
            return ()=>{
                inspector?.stop()
            }
        }   },
        [iframe.current]
    );

    return <host shadowDom>
        <slot></slot>
        {/*<iframe ref={iframe} />*/}
    </host>
})

customElements.define("machine-inspector", MachineInspector)