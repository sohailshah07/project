require('dotenv').config()
var express = require('express');
var logger = require('morgan');
const connection = require("./connection/connect");
var http = require('http');
var debug = require('debug')('mmnt:server');
const helmet = require("helmet");
const cors = require('cors');

var v1Routes = require('./v1/routes')

var app = express();

// various middleware functions 
app.use(cors())
app.use((req, res, next) => {
  res.append('Access-Control-Expose-Headers', 'x-total, x-total-pages');
  next();
});
app.use(logger('dev'))
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));

// connecting routes
app.use('/api/v1/', v1Routes);

// 404 Error 
app.use((req, res, next) => {
  const err = "Oops! Page Not Found";
  res.status(404).send({ status: 404, message: err });
});

//ERROR HANDLER
app.use((err, req, res, next) => {
  const status = err.status || 400;
  console.log("error ==> ", err)
  if (err.message == "jwt expired" || err.message == "Authentication error") { res.status(401).send({ statusCode: 401, message: err }) }
  if (typeof err == typeof "") { res.status(status).send({ statusCode: status, message: err }) }
  else if (err.Error) res.status(status).send({ statusCode: status, message: err.Error });
  else if (err.message) res.status(status).send({ statusCode: status, message: err.message });
  else res.status(status).send({ statusCode: status, message: err.message });
});


var port = normalizePort(process.env.PORT) || 3010;
app.set('port', port);

var server = http.createServer(app);


server.listen(port, async () => {
  console.log(`Running on port: ${port}`);
  await connection.mongoDbconnection();

});
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
