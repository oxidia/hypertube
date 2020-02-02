const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const indexRouter = require('./api/routes/index');
const usersRouter = require('./api/routes/users');
const moviesRouter = require('./api/routes/movies');
const streamRouter = require('./api/routes/stream');

const app = express();

mongoose.connect(`mongodb://${process.env.DATABASE_URL}/hypertube`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Config socket.io
const server = require('http').createServer(app);
const io = require('socket.io')(server);

require('./api/socket')(io);

server.listen(4000);

app.set('io', io);

// Enable CORS
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/movies', moviesRouter);
app.use('/api/v1/stream', streamRouter);

app.use((req, res, next) => {
  const error = new Error('resource not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  // console.log(error);
  res.status(error.status || 500).send({
    message: error.message
  });
});

module.exports = app;
