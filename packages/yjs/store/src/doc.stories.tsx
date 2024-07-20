import {render, useEffect, useRef} from "atomico";
import {c, useMemo, useState} from "atomico";
import {useProviderStore, useStore} from "@atomico/store";
import {define} from "@atomico/storybook";
import {useSyncedDoc, YDocStore, YStore} from "./doc";
import * as Y from "yjs";
 import './doc.define'
 
export default {
    title: "@y-block/store/doc",
    ...define( YStore)
};



customElements.define("doc-text-consumer", c(({name}) => {
    const {doc} = useStore(YDocStore)
    const text = useMemo(() => doc?.getText(name), [doc, name])
    const [content, setContent] = useState("")
    useEffect(() => {
        const observer = () => {
            setContent(text?.toString())
        }
        text?.observe(observer)
        return () => text?.unobserve(observer)
    }, [text])
    return <host shadowDom>
        <textarea placeholder={`consumer for ${name}`} readonly>{content}</textarea>
    </host>
}, {
    props: {
        name: String
    }

}))

customElements.define(
    "doc-text-editor",
    c(
        function yTextEditor({name}) {
            const {doc} = useStore(YDocStore);
            const text = useMemo(() => doc?.getText(name), [doc, name]);

            const handleChange = (event) => {
                console.log("handleChange", event.type, event.target.value);
                doc?.transact(() => {
                    text?.delete(0, text?.length);
                    text?.insert(0, event.target.value);
                });
            };

            return (
                <host shadowDom>
                    <textarea placeholder={`editor for ${name}`} contenteditable oninput={handleChange}></textarea>
                </host>
            );
        },
        {
            props: {
                name: String,
            },
        }
    )
);


export const StoreProvider = () => {

    return (
        <y-store>
            <table>
                <tr>
                    <td>
                        <h5>Editor</h5>
                        <doc-text-editor name="exampleText"/>
                    </td>
                    <td>
                        <h5>Consumer</h5>
                        <doc-text-consumer name="exampleText"/>
                    </td>

                </tr>
                <tr>
                    <td>
                        <doc-text-editor name="exampleText"/>
                    </td>
                    <td>
                        <doc-text-consumer name="exampleText"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <doc-text-editor name="example-2"/>
                    </td>
                    <td>
                        <doc-text-consumer name="example-2"/>
                    </td>
                </tr>
            </table>
        </y-store>
    );
};
export const DocSynced = () => {
    
    const doc = useMemo(() => new Y.Doc(), [])
    
    useEffect(() => {
        setInterval(() => {
            doc.transact(() => {
                doc.getText("example").insert(0, "hi there")
            })
        })
    }, [doc]);
    
    return <y-doc-store doc={doc}>
                <y-doc-synced>
                    <doc-text-editor name="example"/> 
                    <doc-text-consumer name="example"/>
                </y-doc-synced>
            </y-doc-store>
}




export const ProgrammaticProvider = () => {
    const doc= useSyncedDoc();
     useProviderStore(YDocStore, (state)=>({
        ...state,
        doc}), [doc])
    useEffect(() => {
        setInterval(() => {
            doc.transact(() => {
                doc.getText("example").delete(0, doc.getText("example").length)
                doc.getText("example").insert(0, new Date().toISOString())
            })
        }, 500)
    }) 
    
   return   <div>
        <div>Programmatic `useProviderStore`</div>
         <doc-text-consumer name="example"/>
       </div> 
};
//
// export const TextEditor = ({name} : {name:string}) => {
//     const {doc} = useStore(YDocStore);
//     const text = useMemo(() => doc?.getText(name), [doc]);
//     const handleChange = (event) => {
//         console.log("handleChange", event.type, event.target.value);
//         doc?.transact(() => {
//             text?.delete(0, text?.length);
//             text?.insert(0, event.target.value);
//         });
//     };
//     return (
//       <textarea contenteditable oninput={handleChange}></textarea>
//     );
// }


// // const TextConsumer = c(({name}) => {
//     //     const {doc} = useStore(YDocStore)
//     //     const text = useMemo(() => doc?.getText(name), [doc, name])
//     //     const [content, setContent] = useState("")
//     //     useEffect(() => {
//     //         const observer = () => {
//     //             setContent(text?.toString())
//     //         }
//     //         text?.observe(observer)
//     //         return () => text?.unobserve(observer)
//     //     }, [text])
//     //     return <host shadowDom >
//     //         <div>{content}</div>
//     //     </host>
//     // })
//     //
// export const Editor = () => {
//     const TextEditor = c(({name}) => {
//         const {doc} = useStore(YDocStore)
//         const text = useMemo(() => doc?.getText(name), [doc, name])
//         const [content, setContent] = useState("")
//         useEffect(() => {
//             const observer = () => {
//                 setContent(text?.toString())
//             }
//             text?.observe(observer)
//             return () => text?.unobserve(observer)
//         }, [text])
//         return <host shadowDom >
//             <div>{content}</div>
//         </host>
//     }, {
//         props: {
//             name: String
//         }
//
//     })
//
//     return (
//         <y-store>
//             {h(<TextEditor name="exampleText"></TextEditor>)}
//
//             <doc-text-consumer name="exampleText" />
//
//         </y-store>
//     );
// };

// export const ProviderExample = () => {
//   
//    const WsProvider= c(
//       function yWsProvider({ room, address }) {
//         const doc = useSyncedDoc();
//         const [status, setStatus] = useState("disconnected");
//
//         const provider = useMemo(() => {
//           const wsProvider = new WebsocketProvider(`${address}`, room, doc);
//           wsProvider.connect();
//           wsProvider.on("status", (event) => {
//             console.log("Status changed:", event);
//             setStatus(event.connected ? "connected" : "disconnected");
//           });
//          
//           return {
//             provider: wsProvider,
//             doc: doc,
//             awareness: wsProvider.awareness,
//           };
//         }, [room]);
//
//         console.log("ws-provider: provider", provider);
//
//         return (
//           <host shadowDom>
//             <div>Websocket provider is</div> <span style={{
//                 color: status === "connected" ? "green" : "red"
//           }}>{status}</span>
//             <slot></slot>
//           </host>
//         );
//       },
//       {
//         props: {
//           room: {
//             type: String,
//             reflect: true,
//           },
//           address: {
//             type: String,
//             reflect: true,
//             value: "ws://localhost:1234",
//           },
//         },
//       }
//     );
//   
//   
//     
//
// 
//  
//
//   return (
//     <y-store>
//       <WsProvider room="exampleRoom" address="ws://localhost:1234">
//         <div>Y-Store with Provider Example</div>
//         <doc-text-editor name="exampleText"></doc-text-editor>
//         <doc-text-consumer name="exampleText"></doc-text-consumer>
//       </WsProvider>
//     </y-store>
//   );
// };

