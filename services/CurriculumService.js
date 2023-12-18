/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Get curriculum
* Show curriculum
*
* userId String The Id of the User to be fetched. 
* returns getCurriculum_200_response
* */
const getCurriculum = ({ userId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        userId,
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
  getCurriculum,
};
