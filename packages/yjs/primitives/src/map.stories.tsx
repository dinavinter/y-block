import {define} from "@atomico/storybook";
import * as Y from 'yjs';
import {h} from "atomico";
import {YMap} from "./map";
import "@y-block/primitives/array";

export default {
    title: "@y-block/map",
    ...define(YMap)
};

export const BasicMap = (props) => <y-map map={ymap({key1: "value1", key2: "value2"})}>
    <input $:value="key1"></input>
    <input $:value="key2"></input>

</y-map>;

export const ComplexMap = (props) =>
    <y-map map={ymap({
        users: yarray([
            {name: "John Doe", age: 30}, 
            {name: "Limor", age: 25}
        ])
    })}>
        <y-array $:array="users">
            <input $:value="name" style={{margin:"4px", padding:"4px"}}></input>
            <input $:value="age"  style={{margin:"4px", padding:"4px"}}></input>
            <br/>
        </y-array>
    </y-map>;

export const LazyMap = (props) => {
    const lazyMap = new Y.Doc().getMap("map");
    lazyMap.set("text","Lazy loading.." );
    lazyMap.set("idx", 1);

    setInterval(() => {
        lazyMap. set("idx",lazyMap.get("idx") as number + 1);

    }, 1000);

    return <y-map map={lazyMap}>
        <input $:value="text"></input>
        <input $:value="idx" type={"number"}></input>
    </y-map>;
};

 
function ymap(obj) {
    const map = new Y.Doc().getMap("map");
    Object.entries(obj).forEach(([key, value]) => {
        map.set(key, value);
    });
    return map;
}

 
function yarray(elements) {
    const array = new Y.Array();
    array.push(elements)
     return array;
}