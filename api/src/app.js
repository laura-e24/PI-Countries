const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const countryRoutes = require('./routes/countryRoutes.js');
const activityRoutes = require('./routes/activityRoutes.js');

require('./db.js');

const server = express();

server.name = 'API';
const corsConfig = {
  origin: ['https://henrycountries.vercel.app', 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  allowedHeaders: ['Content-Type']
};

server.use(cors())
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', ['https://henrycountries.vercel.app', 'http://localhost:5173', 'http://127.0.0.1:5173']); // update to match the domain you will make the request from
  // res.header('Access-Control-Allow-Origin', 'https://henrycountries.vercel.app'); // update to match the domain you will make the request from
  // res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5173'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Módulos de rutas
server.use('/countries', countryRoutes);
server.use('/activities', activityRoutes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
