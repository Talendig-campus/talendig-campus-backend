const CustomAPIErrorInstance = require("../errors/custom-api");
const { EstadoService } = require("../services");

/**
 *
 * Controller for a new Status
 * @returns 201
 */
const addStatus = async (req, res) => {
  const { status } = req.body;

  if (status == "" || status == undefined) {
    return res.status(400).json();
  }

  try {
    const response = await EstadoService.createStatus({ status });
    // console.log(response);
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance)
      return res.status(400).json(error);
    return res.status(500).json(error);
  }
};

const getAllStatus = async (req, res) => {
  const { filter, pagination } = req.body;

  try {
    const response = await EstadoService.getStatus({
      statusPagination: { filter, pagination },
    });
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance)
      return res.status(400).json(error);
    return res.status(404).json(error);
  }
};

const getStatussLevelById = async (req, res) => {
  const { id } = req.params;

  if (id == "" || id == undefined) {
    return res.status(400).json();
  }

  try {
    const response = await EstadoService.getSingleStatus({ statusId: id });
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance)
      return res.status(400).json(error);
    return res.status(404).json(error);
  }
};

const deleteStatus = async (req, res) => {
  const { id } = req.params;

  if (id == "" || id == undefined) {
    return res.status(400).json();
  }

  try {
    const response = await EstadoService.deleteStatus({ statusId: id });
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance)
      return res.status(400).json(error);
    return res.status(500).json(error);
  }
};

const updateStatus = async (req, res) => {
  const { id } = req.params;

  if (id == "" || id == undefined) {
    return res.status(400).json();
  }

  try {
    const response = await EstadoService.updateStatus({
      statusCreated: req.body,
      statusId: id,
    });
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance)
      return res.status(400).json(error);
    return res.status(404).json(error);
  }
};

module.exports = {
  addStatus, 
  getAllStatus, 
  getStatussLevelById,
  updateStatus,
  deleteStatus
};
