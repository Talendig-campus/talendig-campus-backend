/* eslint-disable no-unused-vars */
const { StatusCodes } = require('http-status-codes');
const Service = require('./Service');
const Instructor = require('../models/instructor');
const CustomAPIError = require('../errors/index');
const { SHORTTEXTREPONSE } = require('../constants/helperConstants');
const utility = require('../utils');

const userName = 'Instructor';

/**
 * Add a new Instructor to the store
 * Add a new Instructor to the store
 *
 * instructor Instructor Create a new Instructor in the store
 * returns getInstructorById_200_response
 * */
const addInstructor = async ({ instructor }) => {
  if (!instructor) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.noBodyRequest);
  }

  const instructorCreated = await Instructor.create(instructor);

  return {
    code: StatusCodes.CREATED,
    payload: {
      hasError: false,
      message: textResponseFormat(instructorName, SHORTTEXTREPONSE.created),
      content: instructorCreated,
    },
  };
};
/**
 * Add a new Instructor Bootcamp to the store
 * Add a new Instructor Bootcamp to the store
 *
 * instructorBootcamp InstructorBootcamp Create a new Instructor Bootcamp in the store
 * returns addInstructorBootcamp_200_response
 * */
const addInstructorBootcamp = ({ instructorBootcamp }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          instructorBootcamp,
        }),
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405),
      );
    }
  });
/**
 * Delete instructor by ID
 * Deletes instructor based on their ID
 *
 * instructorId String Deletes instructor by ID
 * returns EmptyResponse
 * */
const deleteBootcampinstructor = async ({ instructorId }) => {
  const instructor = await utility.instructorUtils.getInstructorById(
    instructorId,
  );

  if (!instructor) {
    throw new CustomAPIError.NotFoundError(
      utility.utilsFunctions.textResponseFormat(
        userName,
        SHORTTEXTREPONSE.notFound,
      ),
    );
  }

  await utility.userUtils.deleteUserById(instructor.userId);

  return {
    payload: {
      hasError: false,
      message: utility.utilsFunctions.textResponseFormat(
        instructorName,
        SHORTTEXTREPONSE.deleted,
      ),
      content: {},
    },
  };
};
/**
 * Delete instructor bootcamp by ID
 * Deletes instructor from bootcamps based on their ID
 *
 * instructorBootcampId String Deletes instructor bootcamp by ID
 * returns EmptyResponse
 * */
const deleteInstructorBootcamp = ({ instructorBootcampId }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          instructorBootcampId,
        }),
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405),
      );
    }
  });
/**
 * Get all Instructor
 * Get a list of Instructor from the store
 *
 * instructorPagination InstructorPagination Get list of Instructor with filter and pagination (optional)
 * returns getAllInstructor_200_response
 * */
const getAllInstructor = ({ instructorPagination }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          instructorPagination,
        }),
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405),
      );
    }
  });
/**
 * Get all instructor bootcamp
 * Get a list of instructors bootcamp from the store
 *
 * instructorBootcampPagination InstructorBootcampPagination Get instructor bootcamp by filter and pagination (optional)
 * returns getAllInstructorBootcamp_200_response
 * */
const getAllInstructorBootcamp = ({ instructorBootcampPagination }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          instructorBootcampPagination,
        }),
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405),
      );
    }
  });
/**
 * Find Instructor bootcamp by ID
 * Returns a single Instructor Bootcamp
 *
 * instructorBootcampId String ID of Instructor bootcamp to return
 * returns addInstructorBootcamp_200_response
 * */
const getInstructorBootcampById = ({ instructorBootcampId }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          instructorBootcampId,
        }),
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405),
      );
    }
  });
/**
 * Find Instructor by ID
 * Returns a single Instructor
 *
 * instructorId String ID of Instructor to return
 * returns getInstructorById_200_response
 * */
const getInstructorById = ({ instructorId }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          instructorId,
        }),
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405),
      );
    }
  });
/**
 * Update an existing instructor
 * Update an existing instructor by Id
 *
 * instructorId String ID of instrcutor to update
 * instructorCreated InstructorCreated Update an existent instructor in the store
 * returns getInstructorById_200_response
 * */
const updateInstructor = ({ instructorId, instructorCreated }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          instructorId,
          instructorCreated,
        }),
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405),
      );
    }
  });
/**
 * Update an existing instructor bootcamp
 * Update an existing instructor bootcamp by Id
 *
 * instructorBootcampId String ID of instructor bootcamp to update
 * instructorBootcamp InstructorBootcamp Update an existent instructor bootcamp in the store
 * returns addInstructorBootcamp_200_response
 * */
const updateInstructorBootcamp = ({
  instructorBootcampId,
  instructorBootcamp,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          instructorBootcampId,
          instructorBootcamp,
        }),
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405),
      );
    }
  });

module.exports = {
  addInstructor,
  addInstructorBootcamp,
  deleteBootcampinstructor,
  deleteInstructorBootcamp,
  getAllInstructor,
  getAllInstructorBootcamp,
  getInstructorBootcampById,
  getInstructorById,
  updateInstructor,
  updateInstructorBootcamp,
};
