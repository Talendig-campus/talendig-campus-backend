const UserController = require("./userController");
const BootcampController = require("./bootcampController");
const ClassController = require("./classController");
const evaluacionController = require("./evaluacionController");
const languajeController = require("./languajeController");
const accessLevelController = require("./accessLevelController");
const statusController = require("./statusController");
const technologyController = require("./technologyController");

module.exports = {
  UserController,
  evaluacionController,
  languajeController,
  accessLevelController,
  statusController,
  technologyController,
  BootcampController,
  ClassController
};
