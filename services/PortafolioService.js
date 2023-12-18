/* eslint-disable no-unused-vars */
const Service = require('./Service');
const portfolioSchema = require('../models/portafolio');
const { textResponseFormat } = require('../utils/utilsFunctions');
const CustomAPIError = require('../errors/index');
const { SHORTTEXTREPONSE } = require('../constants/helperConstants');
const { statusUtils, Pagination } = require('../utils');

/**
 * Create portfolio
 * Add portfolio
 *
 * portfolio Portfolio Create portfolio (optional)
 * returns createPortfolio_200_response
 * */
const createPortfolio = async ({ portfolio }) => {
  const portfolioData = await portfolioSchema.create(portfolio);
  const entityName = 'Portfolio';

  if (!portfolio) {
    throw new CustomAPIError.BadRequestError(
      textResponseFormat(entityName, SHORTTEXTREPONSE.notFound),
    );
  }

  return {
    payload: {
      hasError: false,
      message: 'Intership Creado',
      content: portfolioData,
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
const deleteportfolio = async ({ portfolioId }) => {
  const portfolioExists = await portfolioSchema.findById(portfolioId);
  const entityName = 'Portfolio';

  if (!portfolioExists) {
    return null;
  }

  const statusId = await statusUtils.getStatusIdByName('inactive');
  const portfolioDeleted = await portfolioSchema.updateOne(
    { _id: portfolioId },
    { statusId },
  );

  if (portfolioDeleted.modifiedCount !== 1) {
    return null;
  }

  return {
    payload: {
      hasError: false,
      message: textResponseFormat(entityName, SHORTTEXTREPONSE.deleted),
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
const getPortfolio = async ({ portfolioId }) => {
  const portfolioData = await portfolioSchema.findById(portfolioId);
  const entityName = 'Portfolio';

  if (!portfolioData) {
    throw new CustomAPIError.NotFoundError(
      textResponseFormat(entityName, SHORTTEXTREPONSE.notFound),
    );
  }
  return {
    payload: {
      hasError: false,
      message: '',
      content: portfolioData,
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
const getPortfolios = async ({ portfolioPagination }) => {
  const entityName = 'Portfolio';

  const { filter, pagination } = portfolioPagination;

  const paginationClass = new Pagination(pagination);
  let queryPagination = paginationClass.queryPagination();

  const portfolios = await portfolioSchema.find(filter, null, queryPagination);
  const count = await portfolioSchema.countDocuments(filter);

  queryPagination = { quantity: count, page: paginationClass.page };

  return {
    payload: {
      hasError: false,
      message: textResponseFormat(entityName, SHORTTEXTREPONSE.found),
      content: portfolios,
      pagination: new Pagination(queryPagination),
    },
  };
};

module.exports = {
  createPortfolio,
  deleteportfolio,
  getPortfolio,
  getPortfolios,
};
