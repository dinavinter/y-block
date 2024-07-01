## y-map

The `y-map` component is a tiny custom web component built with Atomico and Yjs. It allows you to bind and observe a Yjs `Y.Map` in a reactive manner, rendering its entries dynamically based on provided templates.

### Properties

| Property | Type   | Description                        |
| -------- | ------ | ---------------------------------- |
| map      | Y.Map  | A Yjs Map instance to be observed and rendered. |

### Slots

| Property   | Type      | Description     |
| ---------- | --------- | --------------- |
| Unassigned | ChildNode | General content |

### Usage

#### Basic Example

The following example demonstrates a basic usage of the `y-map` component with static key-value pairs.

```html
<y-map map={ymap({key1: "value1", key2: "value2"})}>
    <input $:value="key1"></input>
    <input $:value="key2"></input>
</y-map>
```
#### Complex Example
This example shows how to use the y-map component with nested y-array components to handle more complex data structures.

for example, the following code snippet demonstrates how to use the `y-map` component with a nested `y-array` component to handle a list of users.

Map setup:
```javascript
const map = new Y.Doc().getMap("map");
map.set("users", new Y.Array([
    {name: "John Doe", age: 30},
    {name: "Jane Doe", age: 25}
])); 
 ```

```html
<y-map map="map">
    <y-array $:array="users">
        <input $:value="name"></input>
        <input $:value="age"></input>
    </y-array>
</y-map>
```

#### Lazy Loading Example
The LazyMap story demonstrates how to dynamically update the map over time. This example updates the idx property of the map every second.

```html
<script>
    const lazyMap = new Y.Doc().getMap("lazyMap");
    lazyMap.set("idx", 0);
    setInterval(() => {
        lazyMap.set("idx", lazyMap.get("idx") + 1);
    }, 1000);
</script>

<y-map map="lazyMap">
    <input $:value="idx" type="number"></input>
</y-map>
```
 