const InstitutionSchema = require('../models/institution');
const userFunctions = require('./user');

const getInstitutionById = async (institutionId) => InstitutionSchema.findById(institutionId);

const getUserByInstitutionId = async (institutionId) => {
  const institution = await getInstitutionById(institutionId);
  if (!institution) return null;

  return userFunctions.getUserById(institution.userId);
};

module.exports = {
    getInstitutionById,
  getUserByInstitutionId,
};
