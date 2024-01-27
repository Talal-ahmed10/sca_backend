"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
require('dotenv').config({ path: '.env.local' });
require('./db');
const serverless = require('serverless-http');
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*',
}));
app.use((0, express_1.json)());
app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Hello!',
    });
});
app.use('/api', require('./routers/auth.router'));
app.use('/api/user', require('./routers/user.router'));
app.use('/api/inventory', require('./routers/inventory.router'));
app.use('/api/supplier', require('./routers/supplier.router'));
app.use((req, res) => {
    return res.status(404).json({
        message: 'Not Found',
    });
});
if (process.env.NODE_ENV === 'local') {
    const PORT = 3000;
    app.listen(PORT, () => console.log(`Sever is live on: http://localhost:${PORT}/`));
}
exports.handler = serverless(app);
//# sourceMappingURL=app.js.map