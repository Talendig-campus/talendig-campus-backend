/* eslint-disable no-unused-vars */
const { StatusCodes } = require('http-status-codes');
const Service = require('./Service');
const StatusSchema = require('../models/status');
const CustomAPIError = require('../errors/index');
const { SHORTTEXTREPONSE } = require('../constants/helperConstants');
const { utilsFunctions} = require('../utils');

const statusName = 'Estado';
/**
 * create a state
 * create a new state
 *
 * state State Create state object
 * returns createState_200_response
 * */
const createStatus = async ({ status }) => {
  if (status == "" || status == undefined || typeof status !== "string") {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.noBodyRequest);
  }


  const newStatus = new StatusSchema({ name: status });
  const statusCreated = await newStatus.save();

  return {
    code: StatusCodes.CREATED,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        statusName,
        SHORTTEXTREPONSE.created,
      ),
      content: statusCreated,
    },
  };
};
/**
 * delete a state
 * delete a state
 *
 * stateId String id of the state
 * returns EmptyResponse
 * */
const deleteStatus = async ({ statusId }) => {
  const status = await StatusSchema.findById(statusId) || null;

  if (status === null) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(statusName, SHORTTEXTREPONSE.notFound),
    );
  }

  await StatusSchema.deleteOne({ _id: statusId });
  const count = await StatusSchema.countDocuments({ _id: statusId }); // should be 0

  if (count) {
    throw new Error(SHORTTEXTREPONSE.serverError);
  }

  return {
    code: StatusCodes.NO_CONTENT,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        statusName,
        SHORTTEXTREPONSE.deleted,
      ),
      content: {},
    },
  };
};
/**
 * get state for user
 * get state.
 *
 * stateId String Id of the state
 * returns createState_200_response
 * */
const getSingleStatus = async ({ statusId }) => {
  const status = await StatusSchema.findById(statusId) || null;

  if (status === null) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(statusName, SHORTTEXTREPONSE.notFound),
    );
  }

  return {
    code: StatusCodes.OK,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        statusName,
        SHORTTEXTREPONSE.found,
      ),
      content: status,
    },
  };
};
/**
 * get states info
 * state info
 *
 * statePagination StatePagination Created state object
 * returns getStates_200_response
 * */
const getStatus = async ({ filter }) => {

  if (!filter instanceof Object) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.noBodyRequest);
  }

  // const paginationClass = new Pagination(pagination);
  // let queryPagination = paginationClass.queryPagination();

  const status = await StatusSchema.find(filter);
  // const count = await StatusSchema.countDocuments(filter);

  // queryPagination = { quantity: count, page: paginat ionClass.page };

  return {
    code: StatusCodes.OK,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        statusName,
        SHORTTEXTREPONSE.found,
      ),
      content: status,
    },
  };
};
/**
 * update a state
 * update a state
 *
 * stateId String Id of the state
 * stateCreated StateCreated Created contact object
 * returns createState_200_response
 * */
const updateStatus = async ({ statusId, statusCreated }) => {

  const status = (await StatusSchema.find({ _id: statusId })) || null;

  if (status === null) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(statusName, SHORTTEXTREPONSE.notFound),
    );
  }

  const { status: newName } = statusCreated;

  const statusUpdated = await StatusSchema.findByIdAndUpdate(statusId, { name: newName }, {new: true});

  return {
    code: StatusCodes.OK,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        statusName,
        SHORTTEXTREPONSE.updated,
      ),
      content: statusUpdated,
    },
  };
};

module.exports = {
  createStatus,
  deleteStatus,
  getSingleStatus,
  getStatus,
  updateStatus,
};
