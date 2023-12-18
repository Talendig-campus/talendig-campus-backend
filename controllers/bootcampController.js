const CustomAPIErrorInstance = require("../errors/custom-api");
const {Error: MongoError} = require("mongoose")
const { BootcampService } = require("../services");

/**
 *
 * Controller for a new Bootcamp
 * @returns 201
 */
const addBootcamp = async (req, res) => {
  try {
    const response = await BootcampService.addBootcamp({bootcamp: req.body});
    // console.log(response);
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance) return res.status(400).json(error.message);
    if (error instanceof MongoError) return res.status(400).json(error.message);
    return res.status(500).json(error.message);
  }
};

const getBootcamps = async (req, res) => {
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
    const response = await BootcampService.getAllBootcamps({ filter });
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance) return res.status(400).json(error.message);
    if (error instanceof MongoError) return res.status(400).json(error.message);
    return res.status(404).json(error.message);
  }
};

const getBootcampById = async (req, res) => {
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
    const response = await BootcampService.getBootcampById({ bootcampId: id });
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance) return res.status(400).json(error.message);
    if (error instanceof MongoError) return res.status(400).json(error.message);
    return res.status(404).json(error.message);
  }
};

const deleteBootcamp = async (req, res) => {
  const { id } = req.params;

  if (id == "" || id == undefined) {
    return res.status(400).json();
  }

  try {
    const response = await BootcampService.deleteBootcamp({ bootcampId: id });
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance)
      return res.status(400).json(error);
    return res.status(500).json(error);
  }
};

const updateBootcamp = async (req, res) => {
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
    const response = await BootcampService.updateBootcamp({
      bootcampId: id,
      bootcampCreated: req.body,
    });
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance) return res.status(400).json(error.message);
    if (error instanceof MongoError) return res.status(400).json(error.message);
    return res.status(404).json(error.message);
  }
};


module.exports = {
  addBootcamp,
  getBootcampById,
  getBootcamps,
  updateBootcamp,
  deleteBootcamp
  
};
