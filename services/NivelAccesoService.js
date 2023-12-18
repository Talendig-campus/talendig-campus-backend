/* eslint-disable no-unused-vars */
const { StatusCodes } = require('http-status-codes');
const AccessLevelSchema = require('../models/accessLevel');
const CustomAPIError = require('../errors/index');
const { SHORTTEXTREPONSE } = require('../constants/helperConstants');
const { utilsFunctions } = require('../utils');

const accessLevelName = 'Nivel de acceso';

/**
 * Create accessLevel
 * The creation of a new accessLevel.
 *
 * accessLevel AccessLevel Create accessLevel object
 * returns createAccessLevel_200_response
 * */
const createAccessLevel = async ({ accessLevel }) => {
  if (accessLevel == "" || accessLevel == undefined || accessLevel == null) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.noBodyRequest);
  }

  const newAccessLevel = new AccessLevelSchema({ name: accessLevel });
  const accessLevelCreated = await newAccessLevel.save();

  return {
    code: StatusCodes.CREATED,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        accessLevelName,
        SHORTTEXTREPONSE.created,
      ),
      content: accessLevelCreated,
    },
  };
};

/**
 * get accessLevels
 * get accessLevels
 *
 * accessLevelPagination AccessLevelPagination Create accessLevel object
 * returns getAccessLevels_200_response
 * */
const getAccessLevels = async ({ filter }) => {

  if (!filter instanceof Object) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.noBodyRequest);
  }
  const accessLevels = await AccessLevelSchema.find(filter);
  // const count = await AccessLevelSchema.countDocuments(filter);

  return {
    code: StatusCodes.OK,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        accessLevelName,
        SHORTTEXTREPONSE.found,
      ),
      content: accessLevels,
    },
  };
};
/**
 * get accessLevel
 * get accessLevel
 *
 * accessLevelId String Id of the accessLevel
 * returns createAccessLevel_200_response
 * */
const getSingleAccessLevel = async ({ accessLevelId }) => {
  const accessLevel = await AccessLevelSchema.findById(accessLevelId) || null;

  if (accessLevel === null) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(
        accessLevelName,
        SHORTTEXTREPONSE.notFound,
      ),
    );
  }

  // const isAccessLevelActive = await statusUtils.isActive(accessLevel.statusId);

  // if (!isAccessLevelActive) {
  //   throw new CustomAPIError.NotFoundError(
  //     utilsFunctions.textResponseFormat(
  //       accessLevelName,
  //       SHORTTEXTREPONSE.userDeleted,
  //     ),
  //   );
  // }

  return {
    code: StatusCodes.OK,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        accessLevelName,
        SHORTTEXTREPONSE.found,
      ),
      content: accessLevel,
    },
  };
};
/**
 * update accessLevel
 * update accessLevel
 *
 * accessLevelId String Id of the accessLevel
 * accessLevelCreated AccessLevelCreated Created accessLevel object
 * @returns createAccessLevel_200_response
 * */
const updateAccessLevel = async ({ accessLevelId, accessLevelCreated }) => {
  

  const accessLevel = await AccessLevelSchema.find({ _id: accessLevelId }) || null;

  if (accessLevel === null) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(
        accessLevelName,
        SHORTTEXTREPONSE.notFound,
      ),
    );
  }

  const {accessLevel: newAcces} = accessLevelCreated

  // const isAccessLevelActive = await statusUtils.isActive(accessLevel.statusId);

  // if (!isAccessLevelActive) {
  //   throw new CustomAPIError.NotFoundError(
  //     utilsFunctions.textResponseFormat(accessLevelName, SHORTTEXTREPONSE.userDeleted),
  //   );
  // }

  await AccessLevelSchema.findByIdAndUpdate(accessLevelId, {name: newAcces});


  const accessLevelUpdated = await AccessLevelSchema.findById(accessLevelId);

  return {
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        accessLevelName,
        SHORTTEXTREPONSE.updated,
      ),
      content: accessLevelUpdated,
    },
  };
};

const deleteAccessLevel = async ({ accessLevelId }) => {
  const accessLevel = await AccessLevelSchema.findById(accessLevelId) || null;

  if (accessLevel === null) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(
        accessLevelName,
        SHORTTEXTREPONSE.notFound,
      ),
    );
  }

  await AccessLevelSchema.findByIdAndDelete(accessLevelId);


  return {
    code: StatusCodes.NO_CONTENT,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        accessLevelName,
        SHORTTEXTREPONSE.updated,
      ),
    },
  };
}

module.exports = {
  createAccessLevel,
  getAccessLevels,
  getSingleAccessLevel,
  updateAccessLevel,
  deleteAccessLevel
};
