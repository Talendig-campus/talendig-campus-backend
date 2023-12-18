/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Create profile
* The creation of a new profile.
*
* profile Profile Create profile object
* returns createProfile_200_response
* */
const createProfile = ({ profile }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        profile,
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
* Delete profile
* delete profile
*
* profileId String Id of the profile
* returns EmptyResponse
* */
const deleteProfile = ({ profileId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        profileId,
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
* get profiles
* get profiles
*
* profilePagination ProfilePagination Created profile object
* returns getProfiles_200_response
* */
const getProfiles = ({ profilePagination }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        profilePagination,
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
* get profile
* get profile.
*
* profileId String Id of the profile
* returns createProfile_200_response
* */
const getSingleProfile = ({ profileId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        profileId,
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
* update profile
* update profile
*
* profileId String Id of the profile
* profileCreated ProfileCreated Created profile object
* returns createProfile_200_response
* */
const updateProfile = ({ profileId, profileCreated }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        profileId,
        profileCreated,
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
  createProfile,
  deleteProfile,
  getProfiles,
  getSingleProfile,
  updateProfile,
};
