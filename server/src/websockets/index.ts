import { WebSocketServer } from 'ws'

function createWebsocketServer() {
  const wss = new WebSocketServer({ port: 8080 })

  wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
      console.log('received: %s', data)
    })

    ws.send(JSON.stringify({ connected: 'hello world' }))
  })
}

export default createWebsocketServer
