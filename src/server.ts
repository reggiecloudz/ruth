import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import passport from 'passport';
import middlewarePassport from './middleware/passport';
import { config } from './config/config';
import articleRoutes from './routes/Article';
import userRoutes from './routes/User';
import authRoutes from './routes/Auth';

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

  //Passport
  router.use(passport.initialize());
  passport.use(middlewarePassport);

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

  /** Routes */
  router.use('/authentication', authRoutes);
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
