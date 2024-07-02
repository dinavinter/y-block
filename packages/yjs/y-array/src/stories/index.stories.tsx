import { YArray } from "@y-block/array";
import { define } from "@atomico/storybook";
import * as Y from 'yjs';
import {useInternals} from "@atomico/hooks";

export default {
    title: "@y-block/array",
    ...define( YArray)
};

export const Story = (props) =><y-array array={yarray(["from y-array!", "item 2"])}>
    <input $:placeholder="item" />
</y-array>;
  
export const WithObjects = (props) => <y-array array={yarray([
    {firstName: "Hello", lastName:"Array!", style:{padding: "5px", margin: "5px"}},
    {firstName: "So", lastName:"Sweet!", style:{padding: "5px", margin: "5px"}}])}>
    <input $:placeholder="firstName" $:style="style" />
    <input $:placeholder="lastName"  $:style="style" /> 
</y-array>;
    
    
 
export const Lazy = (props) => { 
    const lazyArray = new Y.Doc().getArray("array");
    lazyArray.push([{text: "Lazy loading.." , idx: 1}])
    setInterval(() =>{
        if(lazyArray.length >= 10) {
            lazyArray.delete(0, 5) 
        }
       
        const idx = lazyArray.get(lazyArray.length-1).idx + 1;
        lazyArray.push([{text: `item ${idx}` , idx: idx}])
    } , 1000)
    
    return <y-array  array={lazyArray}>
        <input $:placeholder="text"  />
    </y-array>;
}
    
    
 

function yarray(elements) {
    const array = new Y.Doc().getArray("array");
    array.push(elements)
    return array;
}