"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-nocheck
const express_1 = __importDefault(require("express"));
const index_js_1 = __importDefault(require("./websockets/index.js"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = process.env.PORT || 5001;
const server = app.listen(port, () => {
    console.log('hello world! server here');
    if (process.send) {
        process.send(`Server running at http://localhost:${port}\n\n`);
    }
});
(0, index_js_1.default)();
process.on('message', (message) => {
    console.log(message);
});
exports.default = app;
//# sourceMappingURL=index.js.map