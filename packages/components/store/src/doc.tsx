import {Props, c, css, useMemo, useEffect} from "atomico";
import {createStore, useProviderStore, useStore} from "@atomico/store";
import * as Y from "yjs";

export const YDocStore = createStore({doc: undefined as Y.Doc }) 

export const useDocStore = () => useStore(YDocStore)
export const YSyncedDoc = c(function ySyncedDoc( ) {
    const doc=useSyncedDoc()

     useProviderStore(YDocStore, (state)=>({
        ...state,
        doc}), [doc])

    return <host shadowDom >
        <slot></slot>
    </host>
});


type YDocCreationOptions = ConstructorParameters<typeof Y.Doc>[0]


export const YStore = c(  ( ) =>{
 
    return (<host shadowDom >
             <y-doc-synced>
                 <slot></slot>
            </y-doc-synced>
         </host>
    );
},{
    props:{}
})


export const useSyncedDoc = (options?:ConstructorParameters<typeof Y.Doc>[0]) => createSyncedDoc(useStore(YDocStore).doc, options)

export const createSyncedDoc = (doc: Y.Doc, options?:YDocCreationOptions | string ) => {
    const opt:YDocCreationOptions  =
        options instanceof String  && {
            guid: options as string
        } || options as YDocCreationOptions  || {}



    const newDoc = useMemo(() => new Y.Doc({
        autoLoad: true,
        ...opt
    }), [doc]);

    useEffect(() => {
        console.log('createSyncedDoc:useEffect', {doc, newDoc})
        doc && syncDocs(doc, newDoc)
        return () => {
            newDoc.destroy()
        }
    }, [doc])


    return newDoc
}

export function syncDocs(doc1: Y.Doc, doc2: Y.Doc) {
    doc1.on('update', update => {
        console.debug('doc1.on:update', update)
        const stateVector2 = Y.encodeStateVector(doc2)
        const diff = Y.encodeStateAsUpdate(doc1, stateVector2)
        Y.applyUpdate(doc2, diff)

        // Y.applyUpdate(doc2, update)
    })

    doc2.on('update', update => {
        console.debug('doc2.on:update', update)
        const stateVector1 = Y.encodeStateVector(doc1)
        const diff = Y.encodeStateAsUpdate(doc2, stateVector1)
        Y.applyUpdate(doc1, diff)
    })


}

 
