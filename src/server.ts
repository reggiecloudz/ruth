import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import articleRoutes from './routes/Article';
import userRoutes from './routes/User';

const router = express();

/** Connnect to MongoDB */
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
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

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

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
  // 62be38dbb5a1b4fabba8f6b4
  /** Routes */
  router.use('/articles', articleRoutes);
  router.use('/users', userRoutes);

  /**healthcheck */
  router.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

  /** Error handling */
  router.use((req, res, next) => {
    const err = new Error('Not Found');
    console.log(err);

    return res.status(404).json({ message: err.message });
  });

  http.createServer(router).listen(config.server.port, () => console.log(`Server running on port ${config.server.port}.`));
};
