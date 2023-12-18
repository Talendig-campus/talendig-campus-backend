/* eslint-disable no-unused-vars */
const { StatusCodes } = require('http-status-codes');
const Service = require('./Service');
const WorkExperienceSchema = require('../models/workExperience');
const CustomAPIError = require('../errors/index');
const { SHORTTEXTREPONSE } = require('../constants/helperConstants');
const { utilsFunctions, Pagination } = require('../utils');

const workExperienceName = 'Experiencia Laboral';

/**
* Create portfolio
* Add portfolio
*
* portfolio Portfolio Create portfolio (optional)
* returns createPortfolio_200_response
* */
const createWorkExperience = async ({ workExperience }) => {
  if (!workExperience) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.noBodyRequest);
  }

  const newWorkExperience = await WorkExperienceSchema.create(workExperience);

  return {
    code: StatusCodes.CREATED,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        workExperienceName,
        SHORTTEXTREPONSE.created,
      ),
      content: newWorkExperience,
    },
  };
};
/**
* delete a portfolio
* delete a portfolio
*
* portfolioId String id of the portfolio
* returns EmptyResponse
* */
const deleteWorkExperience = async ({ workExperienceId }) => {
  const workExperience = await WorkExperienceSchema.findById(workExperienceId);

  if (!workExperience) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(workExperienceName, SHORTTEXTREPONSE.notFound),
    );
  }

  await WorkExperienceSchema.deleteOne({ _id: workExperienceId });
  const count = await WorkExperienceSchema.countDocuments({ _id: workExperienceId }); // should be 0

  if (count) {
    throw new Error(SHORTTEXTREPONSE.serverError);
  }

  return {
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        workExperienceName,
        SHORTTEXTREPONSE.deleted,
      ),
      content: {},
    },
  };
};
/**
* get a portfolio
* get a portfolio
*
* portfolioId String id of the portfolio
* returns createPortfolio_200_response
* */
const getWorkExperience = async ({ workExperienceId }) => {
  const workExperience = await WorkExperienceSchema.findById(workExperienceId);

  if (!workExperience) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(workExperienceName, SHORTTEXTREPONSE.notFound),
    );
  }

  return {
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        workExperienceName,
        SHORTTEXTREPONSE.found,
      ),
      content: workExperience,
    },
  };
};
/**
* Get portfolios
* Show portfolios
*
* portfolioPagination PortfolioPagination Get portfolios (optional)
* returns getPortfolios_200_response
* */
const getWorkExperiences = async ({ workExperiencePagination }) => {
  const { filter, pagination } = workExperiencePagination;

  const paginationClass = new Pagination(pagination);
  let queryPagination = paginationClass.queryPagination();

  const workExperiences = await WorkExperienceSchema.find(filter, null, queryPagination);
  const count = await WorkExperienceSchema.countDocuments(filter);

  queryPagination = { quantity: count, page: paginationClass.page };

  return {
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        workExperienceName,
        SHORTTEXTREPONSE.found,
      ),
      content: workExperiences,
      pagination: new Pagination(queryPagination),
    },
  };
};

const updateWorkExperience = async ({ workExperienceId, workExperienceCreated }) => {
  if (workExperienceId !== workExperienceCreated._id) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.errorId);
  }

  const workExperience = await WorkExperienceSchema.findById(workExperienceId);

  if (!workExperience) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(workExperienceName, SHORTTEXTREPONSE.notFound),
    );
  }

  const { _id, ...values } = workExperienceCreated;

  const updated = await WorkExperienceSchema.updateOne({ _id }, values);

  if (updated.modifiedCount !== 1) {
    throw new Error(SHORTTEXTREPONSE.serverError);
  }

  const workExperienceUpdated = await WorkExperienceSchema.findById(workExperienceId);

  return {
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        workExperienceName,
        SHORTTEXTREPONSE.updated,
      ),
      content: workExperienceUpdated,
    },
  };
};

module.exports = {
  createWorkExperience,
  deleteWorkExperience,
  getWorkExperience,
  getWorkExperiences,
  updateWorkExperience,
};
