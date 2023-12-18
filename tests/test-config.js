const { connection } = require('mongoose');
const request = require('supertest');
require('dotenv').config();

const ExpressServer = require('../expressServer');

const expressServer = new ExpressServer(8081);

const { NODE_ENV, MONGO_URI, MONGO_URI_TEST } = process.env;
const conexionString = NODE_ENV === 'test' ? MONGO_URI_TEST : MONGO_URI;
const api = request(expressServer.app);

const TEST_CONFIG = {
  api,
  expressServer,
  conexionString,
  base_url: '/api/v1',
  closeConexion: connection.close(),
};

module.exports = TEST_CONFIG;
