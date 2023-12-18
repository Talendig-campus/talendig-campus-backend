const CustomAPIErrorInstance = require("../errors/custom-api");
const {Error: MongoError} = require("mongoose")
const { ClaseService } = require("../services");

/**
 *
 * Controller for a new Bootcamp
 * @returns 201
 */
const addClass = async (req, res) => {
  try {
    const response = await ClaseService.addClass({ clase: req.body });
    // console.log(response);
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance) return res.status(400).json(error.message);
    if (error instanceof MongoError) return res.status(400).json(error.message);
    return res.status(500).json(error.message);
  }
};

const getClasses = async (req, res) => {
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
    const response = await ClaseService.getAllClass({ filter });
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance) return res.status(400).json(error.message);
    if (error instanceof MongoError) return res.status(400).json(error.message);
    return res.status(404).json(error.message);
  }
};

const getClassById = async (req, res) => {
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
    const response = await ClaseService.getClassById({ classId: id });
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance) return res.status(400).json(error.message);
    if (error instanceof MongoError) return res.status(400).json(error.message);
    return res.status(404).json(error.message);
  }
};

const deleteClass = async (req, res) => {
  const { id } = req.params;

  if (id == "" || id == undefined) {
    return res.status(400).json();
  }

  try {
    const response = await ClaseService.deleteClass({ classId: id });
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance)
      return res.status(400).json(error);
    return res.status(500).json(error);
  }
};

const updateClass = async (req, res) => {
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
    const response = await ClaseService.updateClass({
      classId: id,
      classCreated: req.body,
    });
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance) return res.status(400).json(error.message);
    if (error instanceof MongoError) return res.status(400).json(error.message);
    return res.status(404).json(error.message);
  }
};


module.exports = {
  addClass,
  getClassById,
  getClasses,
  updateClass,
  deleteClass,
};
