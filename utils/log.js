const logSchema = require('../models/log');
const statusFunctions = require('./status');


const getLogById = async (logId) => logSchema.findById(logId);

const deleteLogById = async (logId) => {
    const logExists = await getLogById(logId);
  
    if (!logExists) {
      return null;
    }
  
    const statusId = await statusFunctions.getStatusIdByName('inactive');
    const logDeleted = await logSchema.updateOne({ _id: logId }, { statusId });
  
    if (logDeleted.modifiedCount !== 1) {
      return null;
    }
  
    return true;
  };

module.exports = {
    getLogById,
    deleteLogById,
};
