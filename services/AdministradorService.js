/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Add a new administrator to the store
* Add a new administrator to the store
*
* administrator Administrator Create a new administrator in the store
* returns getAdministratorById_200_response
* */
const addAdministrator = ({ administrator }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        administrator,
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
* Deletes a administrator
* delete a administrator
*
* administradorId String Administrator id to delete
* returns EmptyResponse
* */
const deleteAdministrator = ({ administradorId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        administradorId,
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
* Find administrator by ID
* Returns a single administrator
*
* administradorId String ID of administrator to return
* returns getAdministratorById_200_response
* */
const getAdministratorById = ({ administradorId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        administradorId,
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
* Update an existing administrator
* Update an existing administrator by Id
*
* administradorId String ID of administrator to update
* administratorCreated AdministratorCreated Update an existent administrator in the store
* returns getAdministratorById_200_response
* */
const updateAdministrator = ({ administradorId, administratorCreated }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        administradorId,
        administratorCreated,
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
  addAdministrator,
  deleteAdministrator,
  getAdministratorById,
  updateAdministrator,
};
