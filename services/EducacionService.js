/* eslint-disable no-unused-vars */
const { StatusCodes } = require('http-status-codes');
const Service = require('./Service');
const EducationSchema = require('../models/education');
const CustomAPIError = require('../errors/index');
const { SHORTTEXTREPONSE } = require('../constants/helperConstants');
const { utilsFunctions, Pagination } = require('../utils');

const educationName = 'Education';

/**
* Create portfolio
* Add portfolio
*
* portfolio Portfolio Create portfolio (optional)
* returns createPortfolio_200_response
* */
const createEducation = async ({ education }) => {
  if (!education) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.noBodyRequest);
  }

  const newEducation = await EducationSchema.create(education);

  return {
    code: StatusCodes.CREATED,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        educationName,
        SHORTTEXTREPONSE.created,
      ),
      content: newEducation,
    },
  };
};
/**
/**
* delete a portfolio
* delete a portfolio
*
* portfolioId String id of the portfolio
* returns EmptyResponse
* */
const deleteEducation = async ({ educationId }) => {
  const education = await EducationSchema.findById(educationId);

  if (!education) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(educationName, SHORTTEXTREPONSE.notFound),
    );
  }

  await EducationSchema.deleteOne({ _id: educationId });
  const count = await EducationSchema.countDocuments({ _id: educationId }); // should be 0

  if (count) {
    throw new Error(SHORTTEXTREPONSE.serverError);
  }

  return {
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        educationName,
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
const getEducation = async ({ educationId }) => {
  const education = await EducationSchema.findById(educationId);

  if (!education) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(educationName, SHORTTEXTREPONSE.notFound),
    );
  }

  return {
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        educationName,
        SHORTTEXTREPONSE.found,
      ),
      content: education,
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
const getEducations = async ({ educationPagination }) => {
  const { filter, pagination } = educationPagination;

  const paginationClass = new Pagination(pagination);
  let queryPagination = paginationClass.queryPagination();

  const educations = await EducationSchema.find(filter, null, queryPagination);
  const count = await EducationSchema.countDocuments(filter);

  queryPagination = { quantity: count, page: paginationClass.page };

  return {
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        educationName,
        SHORTTEXTREPONSE.found,
      ),
      content: educations,
      pagination: new Pagination(queryPagination),
    },
  };
};

const updateEducation = async ({ educationId, educationCreated }) => {
  if (educationId !== educationCreated._id) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.errorId);
  }

  const education = await EducationSchema.findById(educationId);

  if (!education) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(educationName, SHORTTEXTREPONSE.notFound),
    );
  }

  const { _id, ...values } = educationCreated;

  const updated = await EducationSchema.updateOne({ _id }, values);

  if (updated.modifiedCount !== 1) {
    throw new Error(SHORTTEXTREPONSE.serverError);
  }

  const educationUpdated = await EducationSchema.findById(educationId);

  return {
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        educationName,
        SHORTTEXTREPONSE.updated,
      ),
      content: educationUpdated,
    },
  };
};

module.exports = {
  createEducation,
  deleteEducation,
  getEducation,
  getEducations,
  updateEducation,
};
