## y-array

The `y-array` component is a custom web component built with Atomico and Yjs. It allows you to bind and observe a Yjs `Y.Array` in a reactive manner, rendering its items dynamically based on provided templates.

### Properties

| Property | Type    | Description                         |
|----------|---------|-------------------------------------|
| array    | Y.Array | A Yjs Array instance to be observed and rendered. |

### Slots

| Property   | Type      | Description       |
| ---------- | --------- |-------------------|
| Unassigned | ChildNode | The item template |

### Usage

#### Basic Example

If you have an array of strings like this:

```javascript
doc.getArray('my-array').insert(0, ["Hello", "Array!"])
```
You can create a component like this:
```html
<y-array array="doc.getArray('my-array')">
    <input $:placeholder="item" />
</y-array>
``` 
#### Nested Example

If you have an array of objects, you can create and use the y-array component like this:


```javascript
doc.getArray('my-array').insert(0, [
    {firstName: "Hello", lastName:"Array!", style:{padding: "5px", margin: "5px"}},
    {firstName: "So", lastName:"Sweet!", style:{padding: "5px", margin: "5px"}}
])
```
```html
<y-array array="doc.getArray('my-array')">
    <input $:placeholder="firstName" $:style="style" />
    <input $:placeholder="lastName"  $:style="style" />
</y-array>
```

#### Lazy Loading Example
The Lazy story demonstrates how to dynamically update the array over time.  This example pushes a new item to the array every second.



```html
<script>
    const lazyArray = doc.getArray('lazyArray')
    lazyArray.push([{ text: "Lazy loading..", idx: 1 }]);

    setInterval(() => {
        lazyArray.push([{ text: `item ${idx}`, idx: lazyArray.get(lazyArray.length - 1).idx + 1 }]);
    }, 1000)
</script>

<y-array array="doc.getArray('lazyArray')">
    <input $:placeholder="text"></input>
    <input $:placeholder="idx"></input>
</y-array>
```

#### Package Size:
                1.74 kB | gzip: 0.84 kB

| File         | Size   | Gzip         |
lib/index.js    0.10 kB │ gzip: 0.10 kB
lib/element.js  1.64 kB │ gzip: 0.74 kB

[//]: # ()
[//]: # (#### Custom Template Example)

[//]: # (The following example demonstrates how to use a custom template to render the array items. )

[//]: # ()
[//]: # (```html)

[//]: # (<y-array array="doc.getArray&#40;'my-array'&#41;">)

[//]: # (    <template $:item="{firstName, lastName}">)

[//]: # (        <div style="padding: 5px; margin: 5px;">)

[//]: # (            <span>{firstName}</span>)

[//]: # (            <span>{lastName}</span>)

[//]: # (        </div>)

[//]: # (    </template>)

[//]: # (</y-array>)

[//]: # (```)