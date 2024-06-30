## y-array

### Properties

| Property | Type    | Description                         |
|----------|---------|-------------------------------------|
| array    | Y.Array | defines the array for the componnet |

### Slots

|   | Type      | Description       |
| --------- | --------- |-------------------|
|  | ChildNode | The item template |

### Examples

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
#### Object Example

If you have an array of objects like this:

```javascript
doc.getArray('my-array').insert(0, [
    {firstName: "Hello", lastName:"Array!", style:{padding: "5px", margin: "5px"}},
    {firstName: "So", lastName:"Sweet!", style:{padding: "5px", margin: "5px"}}
])
```
You can create a component like this:
```html
<y-array array="doc.getArray('my-array')">
    <input $:placeholder="firstName" $:style="style" />
    <input $:placeholder="lastName"  $:style="style" />
</y-array>
```