// const {join} = require('node:path');
// const {MigrateFiles} = require('./migrate');
// const rootDirMigrate = join(__dirname, '../', '../', 'talendig-campus', 'Talendig-Campus-Provisional-Backend', 'utils');
// const outputDir = join(__dirname, 'utils');
// MigrateFiles(rootDirMigrate, outputDir);

require('dotenv').config();
require('express-async-errors');
const connectDB = require('./db/connect');
const ExpressServer = require('./expressServer');

const { NODE_ENV, MONGO_URI, MONGO_URI_TEST, PORT } = process.env;
const conexionString = NODE_ENV === 'test' ? MONGO_URI_TEST : MONGO_URI;
const port = PORT ?? 4000;

const launchServer = async () => {
  try {
    const expressServer = new ExpressServer(port);
    expressServer.launch();
    console.log(`Express server running at port ${port}`);
  } catch (error) {
    console.log(error);
  }
};

const start = async () => {
  try {
    launchServer().catch((e) => console.log(e));
    await connectDB(conexionString);
  } catch (error) {
    console.log(error);
  }
};

start();



