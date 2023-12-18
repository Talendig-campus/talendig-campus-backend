const CustomAPIErrorInstance = require("../errors/custom-api");
const {Error: MongoError} = require("mongoose")
const { TecnologiaService } = require("../services");

/**
 *
 * Controller for a new Languaje
 * @returns 201
 */
const addTechnology = async (req, res) => {
    const { technology } = req.body;

    if (technology == "" || technology == undefined) {
        return res.status(400).json();
      }

  try {
    const response = await TecnologiaService.createTechnology({ technology });
    // console.log(response);
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance) return res.status(400).json(error.message);
    if (error instanceof MongoError) return res.status(400).json(error.message);
    return res.status(500).json(error.message);
  }
};

const getTechnologies = async (req, res) => {
  const { filter } = req.body;
  // console.log(req.body);

  if (filter == null || filter == "" || filter == undefined) {
    return res.status(400).json({
      hasError: true,
      payload: {
        message: "Filter not found",
      },
    });
  }

  try {
    const response = await TecnologiaService.getTechnologies({ filter });
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance) return res.status(400).json(error.message);
    if (error instanceof MongoError) return res.status(400).json(error.message);
    return res.status(404).json(error.message);
  }
};

const getTechnologyById = async (req, res) => {
  const { id } = req.params;

  if (id == "" || id == undefined || id == null) {
    return res.status(400).json({
      hasError: true,
      payload: {
        message: "id not found",
      },
    });
  }

  try {
    const response = await TecnologiaService.getSingleTechnology({ technologyId: id });
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance) return res.status(400).json(error.message);
    if (error instanceof MongoError) return res.status(400).json(error.message);
    return res.status(404).json(error.message);
  }
};

const deleteTechnology = async (req, res) => {
  const { id } = req.params;

  if (id == "" || id == undefined) {
    return res.status(400).json();
  }

  try {
    const response = await TecnologiaService.deleteTechnology({ technologyId: id });
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance) return res.status(400).json(error.message);
    if (error instanceof MongoError) return res.status(400).json(error.message);
    return res.status(500).json(error.message);
  }
};

const updateTechnology = async (req, res) => {
  const { id } = req.params;

  if (id == "" || id == undefined) {
    return res.status(400).json({
      hasError: true,
      payload: {
        message: "id not found",
      },
    });
  }

  try {
    const response = await TecnologiaService.updateTechnology({
      technologyId: id,
      technologyCreated: req.body,
    });
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance) return res.status(400).json(error.message);
    if (error instanceof MongoError) return res.status(400).json(error.message);
    return res.status(500).json(error.message);
  }
};


module.exports = {
  addTechnology,
  getTechnologies,
  getTechnologyById,
  updateTechnology,
  deleteTechnology
};
