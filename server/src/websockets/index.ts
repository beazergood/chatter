import WebSocket, { WebSocketServer } from 'ws'
import { uid } from 'uid'

function createWebsocketServer() {
  const wss = new WebSocketServer({ port: 8080 })

  wss.on('connection', function connection(ws: any) {
    ws._id = uid()

    ws.on('message', function message(data: any, isBinary: boolean) {
      const messageId = uid()

      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          const parsedMessage = JSON.parse(data.toString())

          let clientMessage
          if (parsedMessage.control === 'add') {
            // new message, broadcast out
            clientMessage = {
              ...parsedMessage.message,
              _created: new Date(),
              _id: messageId,
              _newMessage: true,
            }
          } else if (parsedMessage.control === 'edit') {
            // a specific message has been edited. broadcast the change so clients can update their feed
            clientMessage = {
              ...parsedMessage.message,
              _modified: new Date(),
            }
          } else if (parsedMessage.control === 'delete') {
            // message deleted. add delete date and broadcast
            clientMessage = {
              ...parsedMessage.message,
              _deleted: new Date(),
            }
          }

          client.send(JSON.stringify(clientMessage), {
            binary: isBinary,
          })
        }
      })
    })

    ws.send(
      JSON.stringify({
        _newUserId: ws._id,
        _created: new Date(),
        name: '🐱 Chatbot',
        message: 'Welcome to le chat',
        size: wss.clients.size,
        newConnection: true,
      })
    )
  })

  wss.on('error', (err) => {
    console.warn(`Client disconnected - reason: ${err}`)
  })
  wss.on('close', function close() {
    console.log('web socket closed')
  })
}

export default createWebsocketServer
