/* eslint-disable no-unused-vars */
const { StatusCodes } = require('http-status-codes');
const Service = require('./Service');
const ReportSchema = require('../models/report');
const CustomAPIError = require('../errors/index');
const { SHORTTEXTREPONSE } = require('../constants/helperConstants');
const { utilsFunctions, statusUtils, Pagination } = require('../utils');

const reportName = 'Report';

/**
* Create report
* The creation of a new report.
*
* report Report Create report object
* returns createReport_200_response
* */
const createReport = async ({ report }) => {
  if (!report) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.noBodyRequest);
  }

  const newReport = await ReportSchema.create(report);

  return {
    code: StatusCodes.CREATED,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        reportName,
        SHORTTEXTREPONSE.created,
      ),
      content: newReport,
    },
  };
};
/**
* Delete report
* delete report
*
* reportId String Id of the report
* returns EmptyResponse
* */
const deleteReport = async ({ reportId }) => {
  const report = await ReportSchema.findById(reportId);

  if (!report) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(reportName, SHORTTEXTREPONSE.notFound),
    );
  }

  const statusId = await statusUtils.getStatusIdByName('inactive');
  const eventDeleted = await ReportSchema.updateOne(
    { _id: reportId },
    { statusId },
  );

  if (eventDeleted.modifiedCount !== 1) {
    throw new Error(SHORTTEXTREPONSE.serverError);
  }

  return {
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        reportName,
        SHORTTEXTREPONSE.deleted,
      ),
      content: {},
    },
  };
};
/**
* get reports
* get reports
*
* reportPagination ReportPagination Created report object
* returns getReports_200_response
* */
const getReports = async ({ reportPagination }) => {
  const { filter, pagination } = reportPagination;

  const paginationClass = new Pagination(pagination);
  let queryPagination = paginationClass.queryPagination();

  const reports = await ReportSchema.find(filter, null, queryPagination);
  const count = await ReportSchema.countDocuments(filter);

  queryPagination = { quantity: count, page: paginationClass.page };

  return {
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        reportName,
        SHORTTEXTREPONSE.found,
      ),
      content: reports,
      pagination: new Pagination(queryPagination),
    },
  };
};
/**
* get report
* get report
*
* reportId String Id of the report
* returns createReport_200_response
* */
const getSingleReport = async ({ reportId }) => {
  const report = await ReportSchema.findById(reportId);

  if (!report) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(reportName, SHORTTEXTREPONSE.notFound),
    );
  }

  const isReportActive = await statusUtils.isActive(report.statusId);

  if (!isReportActive) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(
        reportName,
        SHORTTEXTREPONSE.userDeleted,
      ),
    );
  }

  return {
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        reportName,
        SHORTTEXTREPONSE.found,
      ),
      content: report,
    },
  };
};
/**
* update report
* update report
*
* reportId String Id of the report
* reportCreated ReportCreated Created report object
* returns createReport_200_response
* */
const updateReport = async ({ reportId, reportCreated }) => {
  if (reportId !== reportCreated._id) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.errorId);
  }

  const report = await ReportSchema.findById(reportId);

  if (!report) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(reportName, SHORTTEXTREPONSE.notFound),
    );
  }

  const isReportActive = await statusUtils.isActive(report.statusId);

  if (!isReportActive) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(reportName, SHORTTEXTREPONSE.userDeleted),
    );
  }

  const { _id, ...values } = reportCreated;

  const updated = await ReportSchema.updateOne({ _id }, values);

  if (updated.modifiedCount !== 1) {
    throw new Error(SHORTTEXTREPONSE.serverError);
  }

  const eventUpdated = await ReportSchema.findById(reportId);

  return {
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        reportName,
        SHORTTEXTREPONSE.updated,
      ),
      content: eventUpdated,
    },
  };
};

module.exports = {
  createReport,
  deleteReport,
  getReports,
  getSingleReport,
  updateReport,
};
