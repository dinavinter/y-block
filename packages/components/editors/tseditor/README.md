# TypeScript Editor Web Component

A web component that provides a TypeScript editor with autocomplete, type checking, and syntax highlighting. Optionally supports real-time collaboration using Yjs.

## Installation

```bash
npm install @cxai/ide
```

## Usage

### Browser

```html
<script type="module">
  import '@cxai/ide';
</script>

<ts-editor value="import { createMachine } from 'xstate';" url="%YJS_URL%" room="%YJS_ROOM%" component="codemirror" > 
  
</ts-editor>

```



## Properties

### TypeScript Editor
- `value`: Get or set the editor content

### Collaboration Provider
- `url`: WebSocket URL of the Hocuspocus server
- `room`: Room name for collaboration (defaults to 'default-room'), this will be the doc id
- `component`: The component name in the yjs docm, defaults to 'codemirror'
## License

MIT
