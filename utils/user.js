const UserSchema = require('../models/User');
const statusFunctions = require('./status');

const getUserById = async (userId) => UserSchema.findById(userId);

const deleteUserById = async (userId) => {
  const userExists = await getUserById(userId);

  if (!userExists) {
    return null;
  }

  const statusId = await statusFunctions.getStatusIdByName('inactive');
  const userDeleted = await UserSchema.updateOne({ _id: userId }, { statusId });

  if (userDeleted.modifiedCount !== 1) {
    return null;
  }

  return true;
};

const isUserActive = async (userId) => {
  const user = await getUserById(userId);

  if (!user) {
    return false;
  }

  const status = await statusFunctions.getStatusById(user.statusId);

  return status.name === 'active';
};

module.exports = {
  getUserById,
  deleteUserById,
  isUserActive,
};
