const { StatusCodes } = require('http-status-codes');
// const validator = require('validator');
const {randomInt} = require('node:crypto');
const CustomAPIError = require('../errors/index');
const { SHORTTEXTREPONSE } = require('../constants/helperConstants');
const {
  userUtils,
  utilsFunctions,
} = require('../utils/index');
const UserSchema = require('../models/User');

const userName = 'Usuario';

/**
 * Add a new usuario to the store
 * Add a new usuario to the store
 *
 * user User Create a new usuario in the store
 * returns getUserById_200_response
 * */
const addUser = async ({ user }) => {
  // console.log(user);

  if (user === null || user === undefined || typeof user != "object") {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.noBodyRequest);
  }
  
  // console.log(typeof user);
  // const preUser = user;
  // preUser.avatar = user.name[0].toUpperCase() + user.lastName[0].toUpperCase();
  // preUser.statusId = await statusUtils.getStatusIdByName('active');

  const talentId = randomInt(11111111, 99999999).toString();
  const defaultPassword = user.password ? user.password : randomInt(11111111, 99999999).toString();
  const newUser = new UserSchema({...user, talentId, password: defaultPassword});

  const userCreated = await newUser.save();

  if (!userCreated) {
    throw new Error(SHORTTEXTREPONSE.serverError);
  }

  return {
    code: StatusCodes.CREATED,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        userName,
        SHORTTEXTREPONSE.created,
      ),
      content: userCreated,
      credentials: {
        talentId,
        password: defaultPassword
      }
    },
  };
};
/**
 * Deletes a usuario
 * delete a usuario
 *
 * userId String Usuario id to delete
 * returns EmptyResponse
 * */
const deleteUser = async ({ userId }) => {
  const userExists = await userUtils.getUserById(userId);

  if (!userExists) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(userName, SHORTTEXTREPONSE.notFound),
    );
  }

  // const statusId = await statusUtils.getStatusIdByName('inactive');
  // const userDeleted = await UserSchema.updateOne({ _id: userId }, { statusId });

  if (userDeleted.modifiedCount !== 1) {
    throw new Error(SHORTTEXTREPONSE.serverError);
  }

  return {
    code: StatusCodes.NO_CONTENT,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        userName,
        SHORTTEXTREPONSE.deleted,
      ),
      content: {},
    },
  };
};
/**
 * Get all users
 * Get a list of users from the store
 *
 * userPagination UserPagination Get list of users with filter and pagination (optional)
 * returns getAllUsers_200_response
 * */
const getAllUsers = async ({ filter }) => {
  const users = await UserSchema.find(filter).populate("accessLevel", {createdAt: 0, updatedAt: 0}) || null;
  console.log(users);
  // const count = await UserSchema.countDocuments(filter);

  if (users === null) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.noBodyRequest);
  }

  return {
    code: StatusCodes.OK,
    payload: {
      hasError: false,
      content: users,
    },
  };
};
/**
 * Find user by ID
 * Returns a single user
 *
 * userId String ID of user to return
 * returns getUserById_200_response
 * */
const getUserById = async ({ userId }) => {
  const user = await userUtils.getUserById(userId);

  if (user === null) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(userName, SHORTTEXTREPONSE.notFound),
    );
  }

  return {
    code: StatusCodes.OK,
    payload: {
      hasError: false,
      message: '',
      content: user,
    },
  };
};
/**
 * Login user
 * Log an user in
 *
 * credentials Credentials Log users in to use the app (optional)
 * returns EmptyResponse
 * */
const logInUser = async ({ credentials }) => {
  const { talentId, password } = credentials;

  if (!talentId || !password) {
    throw new CustomAPIError.BadRequestError(
      'Todos los campos son obligatorios',
    );
  }


  const user = await UserSchema.findByCredentials({ talentId, password });

  if (user === SHORTTEXTREPONSE.userNotFound) {
    throw new CustomAPIError.NotFoundError(
      'Estas credenciales no coinciden con un usuario registrado',
    );
  }

  const token = await user.generateAuthToken();

  return {
    code: StatusCodes.OK,
    hasError: false,
    payload: {
      content: {
        user,
        token,
      },
    },
  };
};
/**
 * Logout user
 * Log an user out
 *
 * userToken String userToken of user that need to be Logged Out
 * returns EmptyResponse
 * */
const logOutUser = async ({ user }) => {

  if (!user) return {code: StatusCodes.BAD_REQUEST, payload: {hasError: true}}
  user.lastConnectionDate = Date.now();
  user.tokens = [];
  await user.save();

  return {
    code: StatusCodes.NO_CONTENT,
    payload: {
      hasError: false,
    }
  }
};
/**
 * Update an existing user
 * Update an existing user by Id
 *
 * userId String userId of user that need to be updated
 * userCreated UserCreated Update an existent user in the store
 * returns getUserById_200_response
 * */
const updateUser = async ({ userId, userCreated }) => {
  const reqFields = Object.keys(userCreated);
  const user = await userUtils.getUserById(userId);

  if (!user || user === undefined) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(userName, SHORTTEXTREPONSE.notFound),
    );
  }
    reqFields.forEach(field => user[field] = userCreated[field]);
    await user.save();
  // const updated = await UserSchema.updateOne({ _id: userId }, userCreated, { new: true });

  // if (updated.modifiedCount !== 1) {
  //   throw new CustomAPIError.BadRequestError(
  //     utilsFunctions.textResponseFormat(userName, SHORTTEXTREPONSE.serverError),
  //   );
  // }

  const userUpdated = await userUtils.getUserById(userId);

  return {
    code:StatusCodes.OK,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        userName,
        SHORTTEXTREPONSE.updated,
      ),
      content: userUpdated,
    },
  };
};

module.exports = {
  addUser,
  deleteUser,
  getAllUsers,
  getUserById,
  logInUser,
  logOutUser,
  updateUser,
};
