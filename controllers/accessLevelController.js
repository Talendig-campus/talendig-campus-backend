const CustomAPIErrorInstance = require("../errors/custom-api");
const { NivelAccesoService } = require("../services");

/**
 *
 * Controller for a new Access Level
 * @returns 201
 *
 */
const addAccessLevel = async (req, res) => {
  const { accessLevel } = req.body;

  if (accessLevel == "" || accessLevel == undefined) {
    return res.status(400).json();
  }

  try {
    const response = await NivelAccesoService.createAccessLevel({
      accessLevel,
    });
    // console.log(response);
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance)
      return res.status(400).json(error);
    return res.status(500).json(error);
  }
};

const getAccessLevels = async (req, res) => {
  const { filter } = req.body;

  try {
    const response = await NivelAccesoService.getAccessLevels({ filter: {} });
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance)
      return res.status(400).json(error.message);
    return res.status(404).json(error);
  }
};

const getAccessLevelById = async (req, res) => {
  const { id } = req.params;

  if (id == "" || id == undefined) {
    return res.status(400).json();
  }

  try {
    const response = await NivelAccesoService.getSingleAccessLevel({
      accessLevelId: id,
    });
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance) return res.status(400).json(error.message);
    return res.status(500).json(error);
  }
};

const deleteAccessLevel = async (req, res) => {
  const { id } = req.params;

  if (id == "" || id == undefined) {
    return res.status(400).json();
  }

  try {
    const response = await NivelAccesoService.deleteAccessLevel({
      accessLevelId: id,
    });
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance) return res.status(400).json(error.message);
    return res.status(500).json(error);
  }
};

module.exports = {
  addAccessLevel,
  deleteAccessLevel,
  getAccessLevelById,
  getAccessLevels,
};
