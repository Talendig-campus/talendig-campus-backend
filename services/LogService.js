/* eslint-disable no-unused-vars */
const Service = require('./Service');
const logSchema = require('../models/log');
const { textResponseFormat } = require('../utils/utilsFunctions');
const CustomAPIError = require('../errors/index');
const { SHORTTEXTREPONSE } = require('../constants/helperConstants');
const {statusUtils, Pagination} = require('../utils');
/**
* Create log
* The creation of a new log.
*
* log Log Create log object
* returns createLog_200_response
* */
const createLog = ({ log }) => {

  const logData = logSchema.create(log);
  const entityName = 'Log'

  if (!log) {
    throw new CustomAPIError.BadRequestError(
      textResponseFormat(entityName, SHORTTEXTREPONSE.notFound),
    );
  }
    
  return {
    payload: {
      hasError: false,
      message: 'Log creado',
      content: logData,
    },
  };
};
/**
* Delete log
* delete log
*
* logId String Id of the log
* returns EmptyResponse
* */
const deleteLog = async ({ logId }) => {

  const logExists = await logSchema.findById(logId);
  const entityName = 'Log';

  if (!logExists) {
    throw new CustomAPIError.NotFoundError(
      textResponseFormat(entityName, SHORTTEXTREPONSE.notFound),
    );
  }
  {
    const logDeleted = await logSchema.findByIdAndDelete(logId);

  return {
    payload: {
      hasError: false,
      message: textResponseFormat(entityName,SHORTTEXTREPONSE.deleted),
      content: logDeleted,
    },
  };
};
}; 
/**
* get logs
* get logs
*
* logPagination LogPagination Created log object
* returns getLogs_200_response
* */
const getLogs = async ({ logPagination }) => {
  const entityName = 'Log';

  const { filter, pagination } = logPagination;

  const paginationClass = new Pagination(pagination);
  let queryPagination = paginationClass.queryPagination();

  const logs = await logSchema.find(filter, null, queryPagination);
  const count = await logSchema.countDocuments(filter);

  queryPagination = { quantity: count, page: paginationClass.page };

  return {
    payload: {
      hasError: false,
      message: textResponseFormat(
        entityName,
        SHORTTEXTREPONSE.found,
      ),
      content: logs,
      pagination: new Pagination(queryPagination),
    },
  };
};
/**
* get log
* get log.
*
* logId String Id of the log
* returns createUserContact_200_response
* */
const getSingleLog = async ({ logId }) => {

  const LogData = await logSchema.findById(logId);
  const entityName = 'Log';

  if (!LogData) {
    throw new CustomAPIError.NotFoundError(
      textResponseFormat(entityName, SHORTTEXTREPONSE.notFound),
    );
  }
  return {
    payload: {
      hasError: false,
      message: '',
      content: LogData,
    },
  };
};
/**
* update log
* update log.
*
* logId String Id of the log
* contactCreated ContactCreated Created log object
* returns createUserContact_200_response
* */
const updateLog = async ({ logId, contactCreated }) => {

  const entityName = 'Log';

  if (logId !== contactCreated._id) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.errorId);
  }

  const { _id, ...values } = contactCreated;

  const updated = await logSchema.updateOne({ _id }, values);

  if (updated.modifiedCount !== 1) {
    throw new Error(SHORTTEXTREPONSE.serverError);
  }

  const LogUpdated = await logSchema.findById(logId);

  return {
    payload: {
      hasError: false,
      message: textResponseFormat(entityName, SHORTTEXTREPONSE.updated),
      content: LogUpdated,
    },
  };
};

module.exports = {
  createLog,
  deleteLog,
  getLogs,
  getSingleLog,
  updateLog,
};
