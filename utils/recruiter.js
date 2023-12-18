const RecruiterSchema = require('../models/recruiter');
const userFunctions = require('./user');

const getRecruiterById = async (recruiterId) => RecruiterSchema.findById(recruiterId);

const getUserByRecruiterId = async (recruiterId) => {
  const recruiter = await getRecruiterById(recruiterId);
  if (!recruiter) return null;

  return userFunctions.getUserById(recruiter.userId);
};

module.exports = {
  getRecruiterById,
  getUserByRecruiterId,
};
