import WebSocket, { WebSocketServer } from 'ws'

function createWebsocketServer() {
  const wss = new WebSocketServer({ port: 8080 })

  wss.on('connection', function connection(ws) {
    ws.on('message', function message(data, isBinary) {
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data, { binary: isBinary })
        }
      })
    })

    ws.send(
      JSON.stringify({
        isBroadcast: true,
        time: new Date(),
        name: 'Chabot',
        message: 'Welcome to le chat',
      })
    )
  })

  wss.on('error', (err) => {
    console.warn(`Client disconnected - reason: ${err}`)
  })
}

export default createWebsocketServer
