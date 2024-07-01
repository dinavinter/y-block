# Y-Block
YJS in custom elements, simple collabrative components powered by YJS.

## Installation
```bash
pnpm install @y-block/components
```

## Blocks
- [y-fragment](./yjs/y-fragment/README.md)
- [y-array](./yjs/y-array/README.md)
- [y-map](./yjs/y-map/README.md)
- [y-text](./yjs/y-text/README.md)
- [y-doc](./yjs/y-doc/README.md)

## Usage
```html
<!DOCTYPE html>
<html lang="en">
<script type="module">
    import '@y-block/components/y-doc/y-doc.js'
    import '@y-block/components/y-array/y-array.js'
    import '@y-block/components/y-text/y-text.js'
    import * as Y from 'yjs'
    const doc = new Y.Doc()
    doc.getArray('my-array').insert(0, ["Hello", "Array!"])
</script>
<body>
    <y-doc>
        <y-array array="doc.getArray('my-array')">
            <input $:placeholder="item" />
        </y-array>
    </y-doc>
</body>
</html>
```