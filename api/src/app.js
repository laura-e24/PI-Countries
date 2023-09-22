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
  origin: ['https://henrycountries.vercel.app/', 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept']
};

server.use(cors(corsConfig))
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

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
