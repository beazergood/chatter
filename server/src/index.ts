//@ts-nocheck
import express from 'express'
import createWebsocketServer from './websockets/index.js'
import cors from 'cors'

const app = express()
app.use(cors())
const port = process.env.PORT || 5001

const server = app.listen(port, () => {
  console.log('hello world! server here')
  if (process.send) {
    process.send(`Server running at http://localhost:${port}\n\n`)
  }
})

createWebsocketServer()

process.on('message', (message) => {
  console.log(message)
})

export default app
