import { define } from "@atomico/storybook";
import { YInput } from ".";
import * as Y from "yjs";
import { useEffect, useState, useCallback, useMemo, useRef } from "atomico";
export default {
    title: "@y-block/input",
    ...define(YInput)
};

 

export const Form = () =>{
    const doc = useMemo(()=>new Y.Doc({guid:"storybook-room"}),[]);
    const yText = doc.getText("test-input");
    const [text, setText] = useState(yText.toJSON());
    const [submitted, setSubmitted] = useState({});
    const form = useRef<HTMLFormElement>();

    useEffect(()=>{
        yText.observe(e=>{
            setText(yText.toJSON());
        })
        return ()=>yText.unobserve(e=>{
            setText(yText.toJSON());
        })
    },[yText])

    const handleChange = useCallback((e:Event)=>{
        if(e.target instanceof HTMLInputElement && (e.target as HTMLInputElement).value){
        doc.transact(()=>{
            yText.delete(0, yText.length);
            yText.insert(0, (e.target as HTMLInputElement).value);
        })
        }
    },[doc])

    const handleSubmit = useCallback((e:Event)=>{
        e.preventDefault();
        setSubmitted(Object.fromEntries(new FormData(form.current!)));
    },[])


    useEffect(()=>{
        console.log("Form", doc.guid, text);
    },[text])
   
    return <>
        <y-hocuspocus 
             url="wss://yjs.cfapps.us10-001.hana.ondemand.com" 
             name="storybook-room"
             broadcast={true}
             document={doc}
             force-sync-interval={1000} 
             connect={true} />
        <input
                type="text"
                placeholder="Type collaboratively..."
                oninput={handleChange} />
        <button onclick={()=>{
            doc.transact(()=>{
                  yText.delete(0, yText.length);
                yText.insert(0, "Hello");
            })
        }}>Change</button>
    
    <form ref={form} onsubmit={handleSubmit}>
            <y-input    
                name="text1"
                component="test-input"
                document={doc}
                placeholder="Type collaboratively..." 
                style="width:300px;"  />
           
           <y-input    
                name="text2"
                component="test-input"
                document={doc}
                placeholder="Type collaboratively..." 
                style="width:300px;"  />

            <p><b>YJS[text-input]:</b> {text}</p>

            <button type="submit">Submit</button>
            <output name="output">
                {JSON.stringify(submitted)}
            </output>
    </form>
</>
}


