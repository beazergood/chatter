"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importStar(require("ws"));
function createWebsocketServer() {
    const wss = new ws_1.WebSocketServer({ port: 8080 });
    wss.on('connection', function connection(ws) {
        ws.on('message', function message(data, isBinary) {
            wss.clients.forEach(function each(client) {
                if (client.readyState === ws_1.default.OPEN) {
                    client.send(data, { binary: isBinary });
                }
            });
        });
        ws.send(JSON.stringify({
            isBroadcast: true,
            time: new Date(),
            name: 'Dave',
            message: 'hello world from socket server',
        }));
    });
    wss.on('error', (err) => {
        console.warn(`Client disconnected - reason: ${err}`);
    });
}
exports.default = createWebsocketServer;
//# sourceMappingURL=index.js.map