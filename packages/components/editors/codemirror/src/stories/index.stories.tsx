import { YCm } from "../index";
import { define } from "@atomico/storybook";
import * as Y from "yjs";
import * as awarenessProtocol from 'y-protocols/awareness';

export default {
    title: "@y-block/editors/cm",
    ...define(
        YCm,
        { // Optional
            argTypes: { 
                yText: {
                    description: "yText is a Y.Text type that will be synchronized with the codemirror editor"
                },
                yAwareness: {
                    description: "yAwareness is a Y.Awareness type that will be synchronized with the codemirror editor"
                }
            }
           
        }
)
};
 

export const Ycm = () =>
{ 
    const doc = new Y.Doc();
    const awareness = new awarenessProtocol.Awareness(doc);


     const input =`<form>
<span> I'm content from Ycm story</span> 
<style> 
   span:{
     background: red;
   }
 </style>    
 <fieldset class="block *:my-2 *:w-full">
  <input type="text" name="firstName" placeholder="First Name" autocomplete="given-name"/>
  <input type="text" name="lastName" placeholder="Last Name" autocomplete="family-name"/>
  <input type="email" name="email" placeholder="Email" autocomplete="email"/>
  <input type="password" name="password" placeholder="Password" autocomplete="new-password"/>
 </fieldset>
</form>
 ` 
 setInterval(()=>
        doc.transact( ()=> {
            doc.getText().delete(0, doc.getText().length)

            doc.getText().insert(0, input)

        }), 1500);
        
  return  <y-cm lang text={doc.getText( )} awareness={awareness}></y-cm>;
}


const doc = new Y.Doc();
const awareness = new awarenessProtocol.Awareness(doc);
const awareness2 = new awarenessProtocol.Awareness(doc);


export const YcmSynced = () =>{     
    const input =`<form>
 <span> I'm content from Ycm-Synced story</span>
 <style> 
   span:{
     background: red;
   }
 </style>
 <fieldset class="block *:my-2 *:w-full">
  <input type="text" name="firstName" placeholder="First Name" autocomplete="given-name"/>
  <input type="text" name="lastName" placeholder="Last Name" autocomplete="family-name"/>
  <input type="email" name="email" placeholder="Email" autocomplete="email"/>
  <input type="password" name="password" placeholder="Password" autocomplete="new-password"/>
 </fieldset>
</form>  ` 
       setTimeout(()=>
           doc.transact( ()=> {
               doc.getText().delete(0, doc.getText().length) 
               doc.getText().insert(0, input)

   
           }), 3000);


    awareness2.on("update", (e)=>{
        console.log("awareness2",e)
        awareness.states.set(1, awareness2.getLocalState())

    })
      awareness.setLocalStateField('user', {
            name: "Typing..",
            color: '#8acb88', colorLight: '#8acb8833' 
          })
           
     return  <y-cm lang text={doc.getText( )} awareness={awareness}></y-cm>;
}

export const YcmSynced2 = () =>{     
    const input =`<form>
 <span> I'm content from Ycm-Synced-2 story</span>
 <style> 
   span:{
     background: blue;
   }
 </style>
 <fieldset class="block *:my-2 *:w-full">
  <input type="text" name="firstName" placeholder="First Name" autocomplete="given-name"/>
  <input type="text" name="lastName" placeholder="Last Name" autocomplete="family-name"/>
  <input type="email" name="email" placeholder="Email" autocomplete="email"/>
  <input type="password" name="password" placeholder="Password" autocomplete="new-password"/>
 </fieldset>
</form>  ` 
        setTimeout(()=>
           doc.transact( ()=> {
               doc.getText().delete(0, doc.getText().length)
   
               doc.getText().insert(0, input)

           }),  
           3000);


        awareness.on("update", (e)=>{
            console.log("awareness2",e)
            awareness2.states.set(1, awareness.getLocalState()) 
        })
           
     return  <y-cm lang text={doc.getText( )} awareness={awareness2}></y-cm>;
}


 