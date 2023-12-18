const InstructorSchema = require('../models/instructor');
const userFunctions = require('./user');

const getInstructorById = async (instructorId) => InstructorSchema.findById(instructorId);

const getUserByInstructorId = async (instructorId) => {
  const instructor = await getInstructorById(instructorId);
  if (!instructor) return null;

  return userFunctions.getUserById(instructor.userId);
};

module.exports = {
  getInstructorById,
  getUserByInstructorId,
};
