## Welcome to le-chat 🐱💬🇫🇷

Whether you know Javascript or not, hopefully you will be able to read this project and understand how it works as well as how I build software.

There's two apps to run: client and server
To run the client app open a terminal and run
`cd client && npm run dev`
once built open a browser window http://localhost:4200

To run the server app open a terminal and run
`cd server && npm run dev`

## Client Angular App
Contains a very simple Angular app with a couple of screens for reading and sending messages to other users in a chat room.

Tools & libraries core to my development workflow include:
    - Storybook to develop components and build a component library
    - TailwindCSS for easy to maintain styling
    
## Server Express App
Starts a websocket using ws package and emits messages over a socket.
- written in Typescript
- uses Nodemon and Concurrently to both compile Typescript changes and refresh server on changes.