/* eslint-disable no-unused-vars */
const { StatusCodes } = require('http-status-codes');
const TechnologySchema = require('../models/technology');
const CustomAPIError = require('../errors/index');
const { SHORTTEXTREPONSE } = require('../constants/helperConstants');
const { utilsFunctions } = require('../utils');

const technologyName = 'Tecnologia';

/**
 * Create technology
 * The creation of a new technology.
 *
 * technology Technology Create technology object
 * returns createTechnology_200_response
 * */
const createTechnology = async ({ technology }) => {

  // console.log(`before ${technology}`);
  if (technology == null || technology == undefined || technology == "") {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.noBodyRequest);
  }
  
  // console.log(`after ${technology}`);
  const preTechnology =  new TechnologySchema({name: technology});
  const newTechnology = await preTechnology.save();
  // console.log(newTechnology);

  return {
    code: StatusCodes.CREATED,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        technologyName,
        SHORTTEXTREPONSE.created,
      ),
      content: newTechnology,
    },
  };
};
/**
/**
* Delete technology
* delete technology
*
* technologyId String Id of the technology
* returns EmptyResponse
* */
const deleteTechnology = async ({ technologyId }) => {
  const technology = await TechnologySchema.findById(technologyId);

  if (technology === null) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(
        technologyName,
        SHORTTEXTREPONSE.notFound,
      ),
    );
  }

  // const statusId = await statusUtils.getStatusIdByName('inactive');
  const technologyDeleted = await TechnologySchema.deleteOne({_id: technologyId});
  
  if (technologyDeleted.deletedCount !== 1) {
    throw new Error(SHORTTEXTREPONSE.serverError);
  }

  return {
    code: StatusCodes.NO_CONTENT,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        technologyName,
        SHORTTEXTREPONSE.deleted,
      ),
      content: {},
    },
  };
};
/**
 * get technology
 * get technology
 *
 * technologyId String Id of the technology
 * returns createTechnology_200_response
 * */
const getSingleTechnology = async ({ technologyId }) => {
  const technology = await TechnologySchema.findById(technologyId) || null;

  if (technology === null) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(
        technologyName,
        SHORTTEXTREPONSE.notFound,
      ),
    );
  }

  // const isTechnologyActive = await statusUtils.isActive(technology.statusId);

  // if (!isTechnologyActive) {
  //   throw new CustomAPIError.NotFoundError(
  //     utilsFunctions.textResponseFormat(
  //       technologyName,
  //       SHORTTEXTREPONSE.userDeleted,
  //     ),
  //   );
  // }

  return {
    code: StatusCodes.OK,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        technologyName,
        SHORTTEXTREPONSE.found,
      ),
      content: technology,
    },
  };
};
/**
 * get technologys
 * get technologys
 *
 * technologyPagination TechnologyPagination Created technology object
 * returns getTechnologys_200_response
 * */
const getTechnologies = async ({ filter }) => {
  if (!filter instanceof Object) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.noBodyRequest);
  }

  const technologies = await TechnologySchema.find(filter);

  return {
    code: StatusCodes.OK,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        technologyName,
        SHORTTEXTREPONSE.found,
      ),
      content: technologies,
    },
  };
};
/**
 * update technology
 * update technology
 *
 * technologyId String Id of the technology
 * technologyCreated TechnologyCreated Created technology object
 * returns createTechnology_200_response
 * */
const updateTechnology = async ({ technologyId, technologyCreated }) => {
  
  const technology = await TechnologySchema.find({_id: technologyId}) || null;

  if (technology === null) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(
        technologyName,
        SHORTTEXTREPONSE.notFound,
      ),
    );
  }


  const { technology: newTechnology } = technologyCreated;

  const technologyUpdated = await TechnologySchema.findByIdAndUpdate(technologyId, {name: newTechnology}, {new: true});
  // if (updated.modifiedCount !== 1) {
  //   throw new Error(SHORTTEXTREPONSE.serverError);
  // }


  return {
    code: StatusCodes.OK,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        technologyName,
        SHORTTEXTREPONSE.updated,
      ),
      content: technologyUpdated,
    },
  };
};

module.exports = {
  createTechnology,
  deleteTechnology,
  getSingleTechnology,
  getTechnologies,
  updateTechnology,
};
