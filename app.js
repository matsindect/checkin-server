const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const ratelimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const AppError = require('./utils/appError');
const uniErrorHamndler = require('./controllers/errorContoller');

const userRouter = require('./routes/userRouter');

const server = express();

// http security
server.use(helmet());
if (process.env.NNODE_ENV === 'development') {
  server.use(morgan('dev'));
}

// server.use(express.static('./public'));
//limit number of api request to 100
const limiter = ratelimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'You have exceeded the number of request, Try in an hour'
});
server.use('/api', limiter);

//body parser
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(compression());
//Data sanitization
server.use(mongoSanitize());
server.use(xss());

// Prevent parameter polution
server.use(hpp());

// CORS middleware
const enableCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
};
server.use(enableCrossDomain);
//ROUTES;
server.use('/api/v1/users', userRouter);


server.all('*', (req, res, next) => {
  next(new AppError(`Cannot Find ${req.originalUrl} on this server`, 404));
});

server.use(uniErrorHamndler);

module.exports = server;
