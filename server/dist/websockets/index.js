"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
function createWebsocketServer() {
    const wss = new ws_1.WebSocketServer({ port: 8080 });
    wss.on('connection', function connection(ws) {
        ws.on('message', function message(data) {
            console.log('received: %s', data);
        });
        ws.send(JSON.stringify({ connected: 'hello world' }));
    });
}
exports.default = createWebsocketServer;
//# sourceMappingURL=index.js.map