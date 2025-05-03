# @y-block/input

Collaborative Yjs Input Component

## Usage

```jsx
<y-input
  url="wss://your-yjs-server"
  room="room-name"
  ykey="input-key"
  required
  placeholder="Your placeholder here"
></y-input>
```

- `url`: Yjs websocket server URL
- `room`: Room name for collaboration
- `ykey`: Key for the Y.Text in the Yjs document
- `required`: Whether the input is required
- `placeholder`: Placeholder for the input field

This package is designed to be extended for other collaborative input types (maps, arrays, fragments, etc.) with a consistent API and naming convention.

## input

### Properties

| Property | Type   | Description                        |
| -------- | ------ | ---------------------------------- |
| myProp   | string | defines the title of the component |

### Slots

| Property   | Type      | Description     |
| ---------- | --------- | --------------- |
| Unassigned | ChildNode | General content |

### Example

```html
<input my-prop="my value"></input>
```