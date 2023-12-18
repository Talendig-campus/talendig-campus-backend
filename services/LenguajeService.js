/* eslint-disable no-unused-vars */
const { StatusCodes } = require("http-status-codes");
const Service = require("./Service");
const CustomAPIError = require("../errors/index");
const LanguageSchema = require("../models/lenguaje");
const { SHORTTEXTREPONSE } = require("../constants/helperConstants");
const { utilsFunctions } = require("../utils");

const languageName = "Language";

/**
 * Create language
 * The creation of a new language.
 *
 * language Language Create language object
 * returns createLanguage_200_response
 * */
const createLanguage = async ({ language }) => {
  if (language == "" || language == undefined) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.noBodyRequest);
  }

  const newLanguaje = new LanguageSchema({ name: language });
  const languageCreated = await newLanguaje.save();

  return {
    code: StatusCodes.CREATED,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        languageName,
        SHORTTEXTREPONSE.created
      ),
      content: languageCreated,
    },
  };
};
/**
 * Delete language
 * delete language
 *
 * languageId String Id of the language
 * returns EmptyResponse
 * */

const deleteLanguage = async ({ languageId }) => {
  const language = await LanguageSchema.findById(languageId) || null;

  if (language === null) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(languageName, SHORTTEXTREPONSE.notFound)
    );
  }

  await LanguageSchema.deleteOne({ _id: languageId });

  const testLanguage = await LanguageSchema.countDocuments({ _id: languageId });

  if (testLanguage) {
    throw new Error(SHORTTEXTREPONSE.serverError);
  }

  return {
    code: StatusCodes.NO_CONTENT,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        languageName,
        SHORTTEXTREPONSE.deleted
      ),
      content: {},
    },
  };
};
/**
 * get languages
 * get language.
 *
 * languagePagination LanguagePagination Created language object
 * returns getLanguages_200_response
 * */
const getLanguages = async ({ filter }) => {
  if (!filter instanceof Object) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.noBodyRequest);
  }

  // const paginationClass = new Pagination(pagination);
  // let queryPagination = paginationClass.queryPagination();

  const language = await LanguageSchema.find(filter);
  // const count = await LanguageSchema.countDocuments(filter);

  // queryPagination = { quantity: count};

  return {
    code: StatusCodes.OK,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        languageName,
        SHORTTEXTREPONSE.found
      ),
      content: language,
    },
  };
};
/**
 * get language
 * get language.
 *
 * languageId String Id of the language
 * returns createLanguage_200_response
 * */
const getSingleLanguage = async ({ languageId }) => {
  const language = await LanguageSchema.findById(languageId) || null;

  if (language === null) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(languageName, SHORTTEXTREPONSE.notFound)
    );
  }

  return {
    code: StatusCodes.OK,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        languageName,
        SHORTTEXTREPONSE.found
      ),
      content: language,
    },
  };
};
/**
 * update language
 * update language
 *
 * languageId String Id of the language
 * languageCreated LanguageCreated Created language object
 * returns createLanguage_200_response
 * */
const updateLanguage = async ({ languageId, languageCreated }) => {
  
  const language = (await LanguageSchema.find({ _id: languageId })) || null;
  // console.log(language);
  if (language === null) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(languageName, SHORTTEXTREPONSE.notFound)
    );
  }

  const { language: newName } = languageCreated;
  // console.log(newName);

  const updated = await LanguageSchema.findByIdAndUpdate(languageId, { name: newName });
  // console.log(updated)

  return {
    code: StatusCodes.OK,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        languageName,
        SHORTTEXTREPONSE.updated
      ),
      content: updated,
    },
  };
};

module.exports = {
  createLanguage,
  deleteLanguage,
  getLanguages,
  getSingleLanguage,
  updateLanguage,
};
