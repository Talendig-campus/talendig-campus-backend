const StatusSchema = require('../models/status');
const CustomAPIError = require('../errors/index');

const getStatusIdByName = async (name) => {
  const statusId = await StatusSchema.findOne({ name });
  return statusId.id;
};

const getStatusById = async (statusId) => StatusSchema.findById(statusId);

const isActive = async (statusId) => {
  if (!statusId) {
    throw new CustomAPIError.BadRequestError('Por favor, agregar el statusId');
  }

  const status = await StatusSchema.findById(statusId);

  return status.name === 'active';
};

module.exports = {
  getStatusIdByName,
  getStatusById,
  isActive,
};
