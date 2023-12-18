/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Create a project
* The creation of a new project.
*
* project Project Created project file (optional)
* returns createProject_200_response
* */
const createProject = ({ project }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        project,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* delete a project
* delete a project
*
* projectId String id of the project
* returns EmptyResponse
* */
const deleteproject = ({ projectId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        projectId,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* get a project
* get a project
*
* projectId String id of the project
* returns createProject_200_response
* */
const getProject = ({ projectId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        projectId,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get projects
* get created project
*
* projectPagination ProjectPagination get a list of projects
* returns getProjects_200_response
* */
const getProjects = ({ projectPagination }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        projectPagination,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Update project
* Update project.
*
* projectId String id of the project
* projectCreated ProjectCreated update project (optional)
* returns createProject_200_response
* */
const updateProject = ({ projectId, projectCreated }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        projectId,
        projectCreated,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  createProject,
  deleteproject,
  getProject,
  getProjects,
  updateProject,
};
