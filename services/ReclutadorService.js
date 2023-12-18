/* eslint-disable no-unused-vars */
const { StatusCodes } = require('http-status-codes');
const Service = require('./Service');
const RecruiterSchema = require('../models/recruiter');
const CustomAPIError = require('../errors/index');
const { SHORTTEXTREPONSE } = require('../constants/helperConstants');
const {
  utilsFunctions,
  recruiterUtils,
  userUtils,
  Pagination,
} = require('../utils');

const recruiterName = 'Reclutador';
/**
 * Create recruiter
 * The creation of a new recruiter.
 *
 * recruiter Recruiter Created recruiter object (optional)
 * returns createRecruiter_200_response
 * */
const createRecruiter = async ({ recruiter }) => {
  if (!recruiter) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.noBodyRequest);
  }

  const newRecruiter = await RecruiterSchema.create(recruiter);

  return {
    code: StatusCodes.CREATED,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        recruiterName,
        SHORTTEXTREPONSE.created,
      ),
      content: newRecruiter,
    },
  };
};
/**
 * Delete recruiter by recruiterId
 * Delete a single recruiter.
 *
 * recruiterId String The name that needs to be deleted
 * returns EmptyResponse
 * */
const deleteRecruiter = async ({ recruiterId }) => {
  const recruiter = await recruiterUtils.getRecruiterById(recruiterId);

  if (!recruiter) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(
        recruiterName,
        SHORTTEXTREPONSE.notFound,
      ),
    );
  }

  await userUtils.deleteUserById(recruiter.userId);

  return {
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        recruiterName,
        SHORTTEXTREPONSE.deleted,
      ),
      content: {},
    },
  };
};
/**
 * Get recruiters
 * Get recruiters
 *
 * recruiterPagination RecruiterPagination Get recruiter object (optional)
 * returns getRecruiter_200_response
 * */
const getRecruiter = async ({ recruiterPagination }) => {
  const { filter, pagination } = recruiterPagination;

  const paginationClass = new Pagination(pagination);
  let queryPagination = paginationClass.queryPagination();

  const recruiters = await RecruiterSchema.find(filter, null, queryPagination);
  const count = await RecruiterSchema.countDocuments(filter);

  queryPagination = { quantity: count, page: paginationClass.page };

  return {
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        recruiterName,
        SHORTTEXTREPONSE.found,
      ),
      content: recruiters,
      pagination: new Pagination(queryPagination),
    },
  };
};
/**
 * Get recruiter by recruiterId
 * get a single recruiter
 *
 * recruiterId String The Id of the recruiter to be fetched.
 * returns createRecruiter_200_response
 * */
const getRecruiterById = async ({ recruiterId }) => {
  const recruiter = await RecruiterSchema.findById(recruiterId);

  if (!recruiter) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(
        recruiterName,
        SHORTTEXTREPONSE.notFound,
      ),
    );
  }

  const isUserActive = await userUtils.isUserActive(recruiter.userId);

  if (!isUserActive) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(
        recruiterName,
        SHORTTEXTREPONSE.userDeleted,
      ),
    );
  }

  return {
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        recruiterName,
        SHORTTEXTREPONSE.found,
      ),
      content: recruiter,
    },
  };
};
/**
 * Update recruiter by recruiterId
 * Update the recruiter by their Id.
 *
 * recruiterId String Id of the recuriter that need to be updated
 * recruiterCreated RecruiterCreated Update an existent recruiter (optional)
 * returns createRecruiter_200_response
 * */
const updateRecruiter = async ({ recruiterId, recruiterCreated }) => {
  if (recruiterId !== recruiterCreated._id) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.errorId);
  }

  const recruiter = await RecruiterSchema.findById(recruiterId);

  if (!recruiter) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(
        recruiterName,
        SHORTTEXTREPONSE.notFound,
      ),
    );
  }

  const isUserActive = await userUtils.isUserActive(recruiter.userId);

  if (!isUserActive) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(SHORTTEXTREPONSE.userDeleted),
    );
  }

  const { _id, ...values } = recruiterCreated;

  const updated = await RecruiterSchema.updateOne({ _id }, values);

  if (updated.modifiedCount !== 1) {
    throw new Error(SHORTTEXTREPONSE.serverError);
  }

  const recruiterUpdated = await recruiterUtils.getRecruiterById(recruiterId);

  return {
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        recruiterName,
        SHORTTEXTREPONSE.updated,
      ),
      content: recruiterUpdated,
    },
  };
};

module.exports = {
  createRecruiter,
  deleteRecruiter,
  getRecruiter,
  getRecruiterById,
  updateRecruiter,
};
