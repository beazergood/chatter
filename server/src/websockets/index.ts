import WebSocket, { WebSocketServer } from 'ws'
import { uid } from 'uid'

function createWebsocketServer() {
  const wss = new WebSocketServer({ port: 8080 })

  wss.on('connection', function connection(ws: any) {
    ws._id = uid()

    ws.on('message', function message(data: any, isBinary: boolean) {
      console.log('ws._id: ', ws._id)
      const messageId = uid()
      console.log('messageId: ', messageId)
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          const parsedMessage = JSON.parse(data.toString())

          let clientMessage
          if (parsedMessage._newMessage) {
            // new message, broadcast out
            console.log('we are ADDING a new message....')
            clientMessage = {
              ...parsedMessage,
              size: wss.clients.size,
              _id: messageId,
            }
          } else if (parsedMessage._editedMessage) {
            // a specific message has been edited. broadcast the change so clients can update their feed
            console.log('we are EDITING a message....')
            clientMessage = {
              ...parsedMessage,
              size: wss.clients.size,
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
