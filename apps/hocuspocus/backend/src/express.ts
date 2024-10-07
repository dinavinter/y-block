import { Logger } from '@hocuspocus/extension-logger'
import { Server } from '@hocuspocus/server'
import express from 'express'
import expressWebsockets from 'express-ws'

const server = Server.configure({
  extensions: [
    new Logger(),
  ],
})

const { app } = expressWebsockets(express())

app.get('/', (request, response) => {
  response.send('Hello World!')
})

app.ws('/:documentName', (websocket, request: any) => {
  const context = { user_id: 1234 }
  server.handleConnection(websocket, request, context)
})

app.listen(1234, () => console.log('Listening on http://127.0.0.1:1234…'))
