/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
const { StatusCodes } = require('http-status-codes');
const Service = require('./Service');
const FileSchema = require('../models/file');
const CustomAPIError = require('../errors/index');
const { SHORTTEXTREPONSE } = require('../constants/helperConstants');
const { utilsFunctions, Pagination } = require('../utils');

const fileName = 'Archivo';

/**
* Create file
* The creation of a new file.
*
* file File Create file object
* returns createFile_200_response
* */
const createFile = async ({ file }) => {
  if (!file) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.noBodyRequest);
  }

  const newFile = await FileSchema.create(file);

  return {
    code: StatusCodes.CREATED,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        fileName,
        SHORTTEXTREPONSE.created,
      ),
      content: newFile,
    },
  };
};
/**
* Delete file
* delete file
*
* fileId String Id of the file
* returns EmptyResponse
* */
const deleteFile = async ({ fileId }) => {
  const file = await FileSchema.findById(fileId);

  if (!file) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(fileName, SHORTTEXTREPONSE.notFound),
    );
  }

  await FileSchema.deleteOne({ _id: fileId });
  const count = await FileSchema.countDocuments({ _id: fileId }); // should be 0

  if (count) {
    throw new Error(SHORTTEXTREPONSE.serverError);
  }

  return {
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        fileName,
        SHORTTEXTREPONSE.deleted,
      ),
      content: {},
    },
  };
};
/**
* get files
* get files.
*
* filePagination FilePagination Created contact object
* returns getFiles_200_response
* */
const getFiles = async ({ filePagination }) => {
  const { filter, pagination } = filePagination;

  const paginationClass = new Pagination(pagination);
  let queryPagination = paginationClass.queryPagination();

  const files = await FileSchema.find(filter, null, queryPagination);
  const count = await FileSchema.countDocuments(filter);

  queryPagination = { quantity: count, page: paginationClass.page };

  return {
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        fileName,
        SHORTTEXTREPONSE.found,
      ),
      content: files,
      pagination: new Pagination(queryPagination),
    },
  };
};
/**
* get single file.
* get single file.
*
* fileId String Id of the file
* returns createFile_200_response
* */
const getSingleFile = async ({ fileId }) => {
  const file = await FileSchema.findById(fileId);

  if (!file) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(fileName, SHORTTEXTREPONSE.notFound),
    );
  }

  return {
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        fileName,
        SHORTTEXTREPONSE.found,
      ),
      content: file,
    },
  };
};
/**
* update file
* update file.
*
* fileId String Id of the file
* fileCreated FileCreated Created contact object
* returns createFile_200_response
* */
const updateFile = async ({ fileId, fileCreated }) => {
  if (fileId !== fileCreated._id) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.errorId);
  }

  const file = await FileSchema.findById(fileId);

  if (!file) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(fileName, SHORTTEXTREPONSE.notFound),
    );
  }

  const { _id, ...values } = fileCreated;

  const updated = await FileSchema.updateOne({ _id }, values);

  if (updated.modifiedCount !== 1) {
    throw new Error(SHORTTEXTREPONSE.serverError);
  }

  const fileUpdated = await FileSchema.findById(fileId);

  return {
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        fileName,
        SHORTTEXTREPONSE.updated,
      ),
      content: fileUpdated,
    },
  };
};

module.exports = {
  createFile,
  deleteFile,
  getFiles,
  getSingleFile,
  updateFile,
};
