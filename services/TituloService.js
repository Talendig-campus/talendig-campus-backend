/* eslint-disable no-unused-vars */
const { StatusCodes } = require('http-status-codes');
const Service = require('./Service');
const TitleSchema = require('../models/title');
const CustomAPIError = require('../errors/index');
const { SHORTTEXTREPONSE } = require('../constants/helperConstants');
const { utilsFunctions, statusUtils, Pagination } = require('../utils');

const titleName = 'Titulo';

/**
* Create title
* The creation of a new title.
*
* title Title Create title object
* returns createTitle_200_response
* */
const createTitle = async ({ title }) => {
  if (!title) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.noBodyRequest);
  }

  const newTitle = await TitleSchema.create(title);

  return {
    code: StatusCodes.CREATED,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        titleName,
        SHORTTEXTREPONSE.created,
      ),
      content: newTitle,
    },
  };
};
/**
* Delete title
* delete title
*
* titleId String Id of the title
* returns EmptyResponse
* */
const deleteTitle = async ({ titleId }) => {
  const title = await TitleSchema.findById(titleId);

  if (!title) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(titleName, SHORTTEXTREPONSE.notFound),
    );
  }

  const statusId = await statusUtils.getStatusIdByName('inactive');
  const eventDeleted = await TitleSchema.updateOne(
    { _id: titleId },
    { statusId },
  );

  if (eventDeleted.modifiedCount !== 1) {
    throw new Error(SHORTTEXTREPONSE.serverError);
  }

  return {
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        titleName,
        SHORTTEXTREPONSE.deleted,
      ),
      content: {},
    },
  };
};
/**
* get title
* get title
*
* titleId String Id of the title
* returns createTitle_200_response
* */
const getSingleTitle = async ({ titleId }) => {
  const title = await TitleSchema.findById(titleId);

  if (!title) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(titleName, SHORTTEXTREPONSE.notFound),
    );
  }

  const isTitleActive = await statusUtils.isActive(title.statusId);

  if (!isTitleActive) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(
        titleName,
        SHORTTEXTREPONSE.userDeleted,
      ),
    );
  }

  return {
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        titleName,
        SHORTTEXTREPONSE.found,
      ),
      content: title,
    },
  };
};
/**
* get titles
* get titles
*
* titlePagination TitlePagination Created title object
* returns getTitles_200_response
* */
const getTitles = async ({ titlePagination }) => {
  const { filter, pagination } = titlePagination;

  const paginationClass = new Pagination(pagination);
  let queryPagination = paginationClass.queryPagination();

  const titles = await TitleSchema.find(filter, null, queryPagination);
  const count = await TitleSchema.countDocuments(filter);

  queryPagination = { quantity: count, page: paginationClass.page };

  return {
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        titleName,
        SHORTTEXTREPONSE.found,
      ),
      content: titles,
      pagination: new Pagination(queryPagination),
    },
  };
};
/**
* update title
* update title
*
* titleId String Id of the title
* titleCreated TitleCreated Created title object
* returns createTitle_200_response
* */
const updateTitle = async ({ titleId, titleCreated }) => {
  if (titleId !== titleCreated._id) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.errorId);
  }

  const title = await TitleSchema.findById(titleId);

  if (!title) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(titleName, SHORTTEXTREPONSE.notFound),
    );
  }

  const isTitleActive = await statusUtils.isActive(title.statusId);

  if (!isTitleActive) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(titleName, SHORTTEXTREPONSE.userDeleted),
    );
  }

  const { _id, ...values } = titleCreated;

  const updated = await TitleSchema.updateOne({ _id }, values);

  if (updated.modifiedCount !== 1) {
    throw new Error(SHORTTEXTREPONSE.serverError);
  }

  const titleUpdated = await TitleSchema.findById(titleId);

  return {
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        titleName,
        SHORTTEXTREPONSE.updated,
      ),
      content: titleUpdated,
    },
  };
};

module.exports = {
  createTitle,
  deleteTitle,
  getSingleTitle,
  getTitles,
  updateTitle,
};
