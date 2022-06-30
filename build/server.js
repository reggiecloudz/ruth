"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const Author_1 = __importDefault(require("./routes/Author"));
const Book_1 = __importDefault(require("./routes/Book"));
const router = (0, express_1.default)();
/** Connnect to MongoDB */
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
    console.log('connected');
    startServer();
})
    .catch((err) => {
    console.log(err);
});
/** Start server */
const startServer = () => {
    router.use((req, res, next) => {
        /** Log request */
        console.log(`Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        /** Log response */
        res.on('finish', () => {
            console.log(`Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
        next();
    });
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    /** API Rules */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    /** Routes */
    router.use('/authors', Author_1.default);
    router.use('/books', Book_1.default);
    /**healthcheck */
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));
    /** Error handling */
    router.use((req, res, next) => {
        const err = new Error('Not Found');
        console.log(err);
        return res.status(404).json({ message: err.message });
    });
    http_1.default.createServer(router).listen(config_1.config.server.port, () => console.log(`Server running on port ${config_1.config.server.port}.`));
};
