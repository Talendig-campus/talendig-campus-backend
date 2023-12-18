const http = require('node:http');
const swaggerUI = require('swagger-ui-express');
const express = require('express');
const cors = require('cors');

// * Routes import
const ExpressRoutes = require('./routes/main-router');

// *  transform the previus object imported and iterate for each route
const routes = Object.keys(ExpressRoutes);
const transformForRoutes = routes.map(route => route.split(/\R/)[0]);

class ExpressServer {
  constructor(port) {
    this.port = port;
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.setupMiddleware();
  }

  setupMiddleware() {
    // this.setupAllowedMedia();
    this.app.use(cors());
    this.app.use(express.json({limit: '14MB'}));
    this.app.use(express.urlencoded({ extended: false }));
    // Simple test to see that the server is up and responding
    this.app.get('/hello', (req, res) =>
      res.send(`Hello World. path`),
    );

    // View the openapi document in a visual interface. Should be able to test from this page
    // todo: this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(this.schema));

    // * routes 
    transformForRoutes.forEach((route, i) => {
      this.app.use(`/api/v1/${route}`, ExpressRoutes[`${routes[i]}`]);
    })

    // this.app.use('/api/v1/user', ExpressRoutes.userRoutes);
    // this.app.use('/api/v1/bootcamp', ExpressRoutes.bootcampRoutes);
    // this.app.use('/api/v1/class', ExpressRoutes.classRoutes);
    // this.app.use('/api/v1/evaluacion', ExpressRoutes.evaulacionRoutes);
    // this.app.use('/api/v1/language', ExpressRoutes.languajeRoutes);
    // this.app.use('/api/v1/status', ExpressRoutes.statusRoutes);
    // this.app.use('/api/v1/accessLevel', ExpressRoutes.accessLevelRoutes);
    // this.app.use('/api/v1/technology', ExpressRoutes.technologyRoutes);
  }

  launch() {
    const serverStarted = this.httpServer.listen(this.port);
    console.log(`Listening on port http://localhost:${this.port}`);
    return serverStarted;
  }


  async close({server}) {
    if (server !== undefined) {
      await server.close();
      console.log(`Server on port ${this.port} shut down`);
    }
  }
}

module.exports = ExpressServer;
