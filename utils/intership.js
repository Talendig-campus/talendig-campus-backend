const IntershipSchema = require('../models/intership');
const IntershipTalentSchema = require('../models/intershipTalent');
const statusFunctions = require('./status');

const getIntershipById = async (intershipId) => IntershipSchema.findById(intershipId);

const getIntershipTalentById = async (intershipTalentId) => IntershipTalentSchema.findById(intershipTalentId);

const deleteIntershipById = async (intershipId) => {
    const intershipExists = await getIntershipById(intershipId);
  
    if (!intershipExists) {
      return null;
    }
  
    const statusId = await statusFunctions.getStatusIdByName('inactive');
    const intershipDeleted = await IntershipSchema.updateOne({ _id: intershipId }, { statusId });
  
    if (intershipDeleted.modifiedCount !== 1) {
      return null;
    }
  
    return true;
  };

  const deleteIntershipTalentById = async (intershipTalentId) => {
    const intershipTalentExists = await getIntershipTalentById(intershipTalentId);
  
    if (!intershipTalentExists) {
      return null;
    }
  
    const statusId = await statusFunctions.getStatusIdByName('inactive');
    const intershipTalentDeleted = await IntershipTalentSchema.updateOne({ _id: intershipTalentId }, { statusId });
  
    if (intershipTalentDeleted.modifiedCount !== 1) {
      return null;
    }
  
    return true;
  };

module.exports = {
    getIntershipById,
    getIntershipTalentById,
    deleteIntershipById,
    deleteIntershipTalentById,
};
