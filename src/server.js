const path = require('path');
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const passport = require('passport');
const passportMiddleware = require('./middleware/passport');
const config = require('./config/config');
const articleRoutes = require('./routes/Article');
const commentRoutes = require('./routes/Comment');
const userRoutes = require('./routes/User');
const authRoutes = require('./routes/Auth');
const socketIO = require('socket.io');

const app = express();

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
  // Require static assets from public folder
  app.use(express.static(path.join(__dirname, 'public')));

  // Set 'views' directory for any views
  // being rendered res.render()
  app.set('views', path.join(__dirname, 'views'));

  // Set view engine as EJS
  app.engine('ejs', require('ejs').renderFile);
  app.set('view engine', 'ejs');

  app.use((req, res, next) => {
    /** Log request */
    console.log(`Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    /** Log response */
    res.on('finish', () => {
      console.log(`Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
    });
    next();
  });

  //Passport
  app.use(passport.initialize());
  passport.use(passportMiddleware);

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  /** API Rules */
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    next();
  });

  var server = http.createServer(app);

  // setup socket.io
  const io = socketIO(server, { cors: { origin: '*' } });

  /** Routes */
  app.get('/', (req, res) => {
    res.render('index');
  });
  app.use('/api/v1', require('./routes/Socket')(io));
  app.use('/authentication', authRoutes);
  app.use('/articles', articleRoutes);
  app.use('/users', userRoutes);
  app.use('/comments', commentRoutes);

  /**healthcheck */
  app.get('/ping', (req, res, next) => res.status(200).json({ message: 'pong' }));

  /** Error handling */
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    console.log(err);
    return res.status(404).json({ message: err.message });
  });

  io.on('connection', (socket) => {
    console.log(socket.id);
  });
  server.listen(config.server.port, () => console.log(`Server running on port ${config.server.port}.`));
};
