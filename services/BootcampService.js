/* eslint-disable no-unused-vars */
const CustomAPIError = require('../errors/index');
const { StatusCodes } = require('http-status-codes');
const { SHORTTEXTREPONSE, STATUS } = require('../constants/helperConstants');
const { statusUtils, utilsFunctions } = require('../utils/index');
const BootcampSchema = require('../models/Bootcamp');

const bootcampName = "Bootcamp"

/**
* Add a new Bootcamp
* Add a new Bootcamp
*
* bootcamp Bootcamp Create a new Bootcamp
* returns addBootcamp_200_response
* */
const addBootcamp = async ({ bootcamp }) => {

  if (bootcamp === null || bootcamp === undefined || typeof bootcamp != "object") {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.noBodyRequest);
  }

  const newBootcamp = new BootcampSchema({...bootcamp});
  const bootcampCreated = await newBootcamp.save();

  if (!bootcampCreated) {
    throw new Error(SHORTTEXTREPONSE.serverError);
  }

  return {
    code: StatusCodes.CREATED,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        bootcampName,
        SHORTTEXTREPONSE.created,
      ),
      content: bootcampCreated,
    },
  };

}
/**
* Add a new Bootcamp Assignment to the store
* Add a new Bootcamp Assignment to the store
*
* bootcampAssignment BootcampAssignment Create a new Bootcamp Assignment in the store
* returns addBootcampAssignment_200_response
* */
// const addBootcampAssignment = ({ bootcampAssignment }) => new Promise(
//   async (resolve, reject) => {
//     try {
//       resolve(Service.successResponse({
//         bootcampAssignment,
//       }));
//     } catch (e) {
//       reject(Service.rejectResponse(
//         e.message || 'Invalid input',
//         e.status || 405,
//       ));
//     }
//   },
// );
/**
* Add a new Bootcamp Assignment file to the store
* Add a new Bootcamp Assignment file to the store
*
* bootcampAssignmentFile BootcampAssignmentFile Create a new Bootcamp Assignment file in the store
* returns addBootcampAssignmentFile_200_response
* */
// const addBootcampAssignmentFile = ({ bootcampAssignmentFile }) => new Promise(
//   async (resolve, reject) => {
//     try {
//       resolve(Service.successResponse({
//         bootcampAssignmentFile,
//       }));
//     } catch (e) {
//       reject(Service.rejectResponse(
//         e.message || 'Invalid input',
//         e.status || 405,
//       ));
//     }
//   },
// );
/**
* Add a new Bootcamp Section to the store
* Add a new Bootcamp to the store
*
* bootcampSection BootcampSection Create a new Bootcamp section in the store
* returns addBootcampSection_200_response
* */
// const addBootcampSection = ({ bootcampSection }) => new Promise(
//   async (resolve, reject) => {
//     try {
//       resolve(Service.successResponse({
//         bootcampSection,
//       }));
//     } catch (e) {
//       reject(Service.rejectResponse(
//         e.message || 'Invalid input',
//         e.status || 405,
//       ));
//     }
//   },
// );
/**
* Add a new Bootcamp Subject to the store
* Add a new Bootcamp Subject to the store
*
* bootcampSubject BootcampSubject Create a new Bootcamp Subject in the store
* returns addBootcampSubject_200_response
* */
// const addBootcampSubject = ({ bootcampSubject }) => new Promise(
//   async (resolve, reject) => {
//     try {
//       resolve(Service.successResponse({
//         bootcampSubject,
//       }));
//     } catch (e) {
//       reject(Service.rejectResponse(
//         e.message || 'Invalid input',
//         e.status || 405,
//       ));
//     }
//   },
// );
/**
* Add a new Bootcamp Subject File to the store
* Add a new Bootcamp Subject File to the store
*
* bootcampSubjectFile BootcampSubjectFile Create a new Bootcamp Subject File in the store
* returns addBootcampSubjectFile_200_response
* */
// const addBootcampSubjectFile = ({ bootcampSubjectFile }) => new Promise(
//   async (resolve, reject) => {
//     try {
//       resolve(Service.successResponse({
//         bootcampSubjectFile,
//       }));
//     } catch (e) {
//       reject(Service.rejectResponse(
//         e.message || 'Invalid input',
//         e.status || 405,
//       ));
//     }
//   },
// );
/**
* Deletes a bootcamp
* delete a bootcamp
*
* bootcampId String bootcamp id to delete
* returns EmptyResponse
* */
const deleteBootcamp = async ({ bootcampId }) => {
  const bootcampExist = await BootcampSchema.findOne({_id : bootcampId}).populate('status', {name: 1});

  if (!bootcampExist) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(bootcampName, SHORTTEXTREPONSE.notFound),
    );
  }

  if (bootcampExist.status?.name !== STATUS.active) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(bootcampName, SHORTTEXTREPONSE.notFound),
    );
  }
  const status = await statusUtils.getStatusIdByName(STATUS.inactive);
  const bootcampDeleted = await BootcampSchema.updateOne({_id: bootcampId}, {status});

  if (bootcampDeleted.modifiedCount !== 1) {
    throw new CustomAPIError.BadRequestError(
      utilsFunctions.textResponseFormat(bootcampName, SHORTTEXTREPONSE.serverError),
    );
  }

  return {
    code: StatusCodes.NO_CONTENT,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        bootcampName,
        SHORTTEXTREPONSE.deleted,
      ),
      content: {},
    },
  };
}
/**
* Deletes a Bootcamp assignment
* delete a Bootcamp assignment
*
* bootcampAssignmentId String Bootcamp assignment id to delete
* returns EmptyResponse
* */
// const deleteBootcampAssignment = ({ bootcampAssignmentId }) => new Promise(
//   async (resolve, reject) => {
//     try {
//       resolve(Service.successResponse({
//         bootcampAssignmentId,
//       }));
//     } catch (e) {
//       reject(Service.rejectResponse(
//         e.message || 'Invalid input',
//         e.status || 405,
//       ));
//     }
//   },
// );
/**
* Deletes a bootcamp assignment file
* delete a bootcamp assignment file
*
* bootcampAssignmentFileId String Bootcamp assignment file id to delete
* returns EmptyResponse
* */
// const deleteBootcampAssignmentFile = ({ bootcampAssignmentFileId }) => new Promise(
//   async (resolve, reject) => {
//     try {
//       resolve(Service.successResponse({
//         bootcampAssignmentFileId,
//       }));
//     } catch (e) {
//       reject(Service.rejectResponse(
//         e.message || 'Invalid input',
//         e.status || 405,
//       ));
//     }
//   },
// );
/**
* Deletes a Bootcamp Section
* delete a Bootcamp Section
*
* bootcampSectionId String Bootcamp section id to delete
* returns EmptyResponse
* */
// const deleteBootcampSection = ({ bootcampSectionId }) => new Promise(
//   async (resolve, reject) => {
//     try {
//       resolve(Service.successResponse({
//         bootcampSectionId,
//       }));
//     } catch (e) {
//       reject(Service.rejectResponse(
//         e.message || 'Invalid input',
//         e.status || 405,
//       ));
//     }
//   },
// );
/**
* Deletes a Bootcamp Subject
* delete a Bootcamp Subject
*
* bootcampSubjectId String Bootcamp subject id to delete
* returns EmptyResponse
* */
// const deleteBootcampSubject = ({ bootcampSubjectId }) => new Promise(
//   async (resolve, reject) => {
//     try {
//       resolve(Service.successResponse({
//         bootcampSubjectId,
//       }));
//     } catch (e) {
//       reject(Service.rejectResponse(
//         e.message || 'Invalid input',
//         e.status || 405,
//       ));
//     }
//   },
// );
/**
* Deletes a Bootcamp Subject File
* delete a Bootcamp Subject File
*
* bootcampSubjecFileId String Bootcamp subject file id to delete
* returns EmptyResponse
* */
// const deleteBootcampSubjectFile = ({ bootcampSubjecFileId }) => new Promise(
//   async (resolve, reject) => {
//     try {
//       resolve(Service.successResponse({
//         bootcampSubjecFileId,
//       }));
//     } catch (e) {
//       reject(Service.rejectResponse(
//         e.message || 'Invalid input',
//         e.status || 405,
//       ));
//     }
//   },
// );
/**
* Get all talent assignment files
* Get a list of talents assignment files from the store
*
* bootcampAssignmentFilePagination BootcampAssignmentFilePagination Get talent assignment files by filter and pagination (optional)
* returns addBootcampAssignmentFile_200_response
* */
// const getAllBootcampAssignmentFiles = ({ bootcampAssignmentFilePagination }) => new Promise(
//   async (resolve, reject) => {
//     try {
//       resolve(Service.successResponse({
//         bootcampAssignmentFilePagination,
//       }));
//     } catch (e) {
//       reject(Service.rejectResponse(
//         e.message || 'Invalid input',
//         e.status || 405,
//       ));
//     }
//   },
// );
/**
* Get all bootcamp assignment
* Get a list of bootcamp assignment from the store
*
* bootcampAssignmentPagination BootcampAssignmentPagination Get bootcamp assignment by filter and pagination (optional)
* returns addBootcampAssignment_200_response
* */
// const getAllBootcampAssignments = ({ bootcampAssignmentPagination }) => new Promise(
//   async (resolve, reject) => {
//     try {
//       resolve(Service.successResponse({
//         bootcampAssignmentPagination,
//       }));
//     } catch (e) {
//       reject(Service.rejectResponse(
//         e.message || 'Invalid input',
//         e.status || 405,
//       ));
//     }
//   },
// );
/**
* Get all Bootcamp Sections
* Get a list of Bootcamp Sections from the store
*
* bootcampSectionPagination BootcampSectionPagination Get list of Bootcamp Sections with filter and pagination (optional)
* returns getAllBootcampSections_200_response
* */
// const getAllBootcampSections = ({ bootcampSectionPagination }) => new Promise(
//   async (resolve, reject) => {
//     try {
//       resolve(Service.successResponse({
//         bootcampSectionPagination,
//       }));
//     } catch (e) {
//       reject(Service.rejectResponse(
//         e.message || 'Invalid input',
//         e.status || 405,
//       ));
//     }
//   },
// );
/**
* Get all Bootcamp Subjects
* Get a list of Bootcamp Subjects from the store
*
* bootcampSubjectPagination BootcampSubjectPagination Get list of Bootcamp Subjects with filter and pagination (optional)
* returns getAllBootcampSubject_200_response
* */
// const getAllBootcampSubject = ({ bootcampSubjectPagination }) => new Promise(
//   async (resolve, reject) => {
//     try {
//       resolve(Service.successResponse({
//         bootcampSubjectPagination,
//       }));
//     } catch (e) {
//       reject(Service.rejectResponse(
//         e.message || 'Invalid input',
//         e.status || 405,
//       ));
//     }
//   },
// );
/**
* Get all Bootcamp Subject File
* Get a list of Bootcamp Subject Files from the store
*
* bootcampSubjectFilePagination BootcampSubjectFilePagination Get list of Bootcamp Subject Files with filter and pagination (optional)
* returns addBootcampSubjectFile_200_response
* */
// const getAllBootcampSubjectFile = ({ bootcampSubjectFilePagination }) => new Promise(
//   async (resolve, reject) => {
//     try {
//       resolve(Service.successResponse({
//         bootcampSubjectFilePagination,
//       }));
//     } catch (e) {
//       reject(Service.rejectResponse(
//         e.message || 'Invalid input',
//         e.status || 405,
//       ));
//     }
//   },
// );
/**
* Get all talents from the bootcamp
* Get a list of talents from the bootcamp
*
* talentBootcampPagination TalentBootcampPagination Get talents from bootcamp by filter and pagination (optional)
* returns getAllBootcampTalent_200_response
* */
// const getAllBootcampTalent = ({ talentBootcampPagination }) => new Promise(
//   async (resolve, reject) => {
//     try {
//       resolve(Service.successResponse({
//         talentBootcampPagination,
//       }));
//     } catch (e) {
//       reject(Service.rejectResponse(
//         e.message || 'Invalid input',
//         e.status || 405,
//       ));
//     }
//   },
// );
/**
* Get all bootcamps
* Get a list of Bootcamps
*
* bootcampPagination BootcampPagination Get list of bootcamps with filter and pagination (optional)
* returns getAllBootcamps_200_response
* */
const getAllBootcamps = async ({ filter }) => {
  const bootcamps = await BootcampSchema.find(filter).populate('status', {name: 1}) || null;

  if (bootcamps === null) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.noBodyRequest);
  }

  return {
    code: StatusCodes.OK,
    payload: {
      hasError: false,
      content: bootcamps,
    },
  }
}
/**
* Find Bootcamp by ID
* Returns a single Bootcamp assignment
*
* bootcampAssignmentId String ID of Bootcamp assignment to return
* returns getBootcampAssignment_200_response
* */
// const getBootcampAssignment = ({ bootcampAssignmentId }) => new Promise(
//   async (resolve, reject) => {
//     try {
//       resolve(Service.successResponse({
//         bootcampAssignmentId,
//       }));
//     } catch (e) {
//       reject(Service.rejectResponse(
//         e.message || 'Invalid input',
//         e.status || 405,
//       ));
//     }
//   },
// );
/**
* Find bootcamp assignment file by ID
* Returns a single bootcamp assignment file
*
* bootcampAssignmentFileId String ID of bootcamp assignment file to return
* returns getBootcampAssignmentFile_200_response
* */
// const getBootcampAssignmentFile = ({ bootcampAssignmentFileId }) => new Promise(
//   async (resolve, reject) => {
//     try {
//       resolve(Service.successResponse({
//         bootcampAssignmentFileId,
//       }));
//     } catch (e) {
//       reject(Service.rejectResponse(
//         e.message || 'Invalid input',
//         e.status || 405,
//       ));
//     }
//   },
// );
/**
* Find Bootcamp by ID
* Returns a single bootcamp
*
* bootcampId String ID of bootcamp to return
* returns addBootcamp_200_response
* */
const getBootcampById = async ({ bootcampId }) => {
  const bootcamp = await BootcampSchema.findOne({_id: bootcampId});

  if (bootcamp === null) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(bootcampName, SHORTTEXTREPONSE.notFound),
    );
  }

  return {
    code: StatusCodes.OK,
    payload: {
      hasError: false,
      content: bootcamp,
    },
  }

}
/**
* Find Bootcamp Section by ID
* Returns a single Bootcamp Section
*
* bootcampSectionId String ID of Bootcamp Section to return
* returns addBootcampSection_200_response
* */
// const getBootcampSectionById = ({ bootcampSectionId }) => new Promise(
//   async (resolve, reject) => {
//     try {
//       resolve(Service.successResponse({
//         bootcampSectionId,
//       }));
//     } catch (e) {
//       reject(Service.rejectResponse(
//         e.message || 'Invalid input',
//         e.status || 405,
//       ));
//     }
//   },
// );
/**
* Find Bootcamp Subject by ID
* Returns a single Bootcamp Subject
*
* bootcampSubjectId String ID of Bootcamp Subject to return
* returns addBootcampSubject_200_response
* */
// const getBootcampSubjectById = ({ bootcampSubjectId }) => new Promise(
//   async (resolve, reject) => {
//     try {
//       resolve(Service.successResponse({
//         bootcampSubjectId,
//       }));
//     } catch (e) {
//       reject(Service.rejectResponse(
//         e.message || 'Invalid input',
//         e.status || 405,
//       ));
//     }
//   },
// );
/**
* Find Bootcamp subject by ID
* Returns a single Bootcamp Subject File
*
* bootcampSubjecFileId String ID of Bootcamp Subject File to return
* returns getBootcampSubjectFileById_200_response
* */
// const getBootcampSubjectFileById = ({ bootcampSubjecFileId }) => new Promise(
//   async (resolve, reject) => {
//     try {
//       resolve(Service.successResponse({
//         bootcampSubjecFileId,
//       }));
//     } catch (e) {
//       reject(Service.rejectResponse(
//         e.message || 'Invalid input',
//         e.status || 405,
//       ));
//     }
//   },
// );
/**
* Update an existing Bootcamp
* Update an existing Bootcamp by Id
*
* bootcampId String ID of bootcamp to return
* bootcampCreated BootcampCreated Update an existent bootcamp in the store
* returns addBootcamp_200_response
* */
const updateBootcamp = async({ bootcampId, bootcampCreated }) => {
  const bootcamp = await BootcampSchema.findOne({_id: bootcampId}).populate('status', {name:1});

  if (!bootcamp || bootcamp === undefined) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(bootcampName, SHORTTEXTREPONSE.notFound),
    );
  }

  const updated = await BootcampSchema.findByIdAndUpdate(bootcampId , bootcampCreated, { new: true });

  // if (updated.modifiedCount !== 1) {
  //   throw new CustomAPIError.BadRequestError(
  //     utilsFunctions.textResponseFormat(bootcampName, SHORTTEXTREPONSE.serverError),
  //   );
  // }

  return {
    code:StatusCodes.OK,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        bootcampName,
        SHORTTEXTREPONSE.updated,
      ),
      content: updated,
    },
  };
}
/**
* Update an existing Bootcamp assignment
* Update an existing Bootcamp assignment by Id
*
* bootcampAssignmentId String name of bootcamp assignment that need to be deleted
* bootcampAssigmentCreated BootcampAssigmentCreated Update an existent Bootcamp assignment
* returns getBootcampAssignment_200_response
* */
// const updateBootcampAssignment = ({ bootcampAssignmentId, bootcampAssigmentCreated }) => new Promise(
//   async (resolve, reject) => {
//     try {
//       resolve(Service.successResponse({
//         bootcampAssignmentId,
//         bootcampAssigmentCreated,
//       }));
//     } catch (e) {
//       reject(Service.rejectResponse(
//         e.message || 'Invalid input',
//         e.status || 405,
//       ));
//     }
//   },
// );
/**
* Update an existing Bootcamp assignment file
* Update an existing Bootcamp Assignment File by Id
*
* bootcampAssignmentFileId String bootcamp Assignment File that need to be deleted
* bootcampAssigmentFileCreated BootcampAssigmentFileCreated Update an existent Bootcamp Assignment File in the store
* returns getBootcampAssignmentFile_200_response
* */
// const updateBootcampAssignmentFile = ({ bootcampAssignmentFileId, bootcampAssigmentFileCreated }) => new Promise(
//   async (resolve, reject) => {
//     try {
//       resolve(Service.successResponse({
//         bootcampAssignmentFileId,
//         bootcampAssigmentFileCreated,
//       }));
//     } catch (e) {
//       reject(Service.rejectResponse(
//         e.message || 'Invalid input',
//         e.status || 405,
//       ));
//     }
//   },
// );
/**
* Update an existing Bootcamp Section
* Update an existing Bootcamp Section by Id
*
* bootcampSectionId String name of bootcamp section to update
* bootcampSection BootcampSection Update an existent Bootcamp Section in the store
* returns addBootcampSection_200_response
* */
// const updateBootcampSection = ({ bootcampSectionId, bootcampSection }) => new Promise(
//   async (resolve, reject) => {
//     try {
//       resolve(Service.successResponse({
//         bootcampSectionId,
//         bootcampSection,
//       }));
//     } catch (e) {
//       reject(Service.rejectResponse(
//         e.message || 'Invalid input',
//         e.status || 405,
//       ));
//     }
//   },
// );
/**
* Update an existing Bootcamp Subject
* Update an existing Bootcamp Subject by Id
*
* bootcampSubjectId String Bootcamp Subject that needs to be deleted
* bootcampSubject BootcampSubject Update an existent Bootcamp Subject in the store
* returns addBootcampSubject_200_response
* */
// const updateBootcampSubject = ({ bootcampSubjectId, bootcampSubject }) => new Promise(
//   async (resolve, reject) => {
//     try {
//       resolve(Service.successResponse({
//         bootcampSubjectId,
//         bootcampSubject,
//       }));
//     } catch (e) {
//       reject(Service.rejectResponse(
//         e.message || 'Invalid input',
//         e.status || 405,
//       ));
//     }
//   },
// );
/**
* Update an existing Bootcamp subject file
* Update an existing Bootcamp Subject File by Id
*
* bootcampSubjecFileId String Bootcamp subject file that need to be deleted
* bootcampSubjectFile BootcampSubjectFile Update an existent Bootcamp Subject File in the store
* returns getBootcampSubjectFileById_200_response
* */
// const updateBootcampSubjectFile = ({ bootcampSubjecFileId, bootcampSubjectFile }) => new Promise(
//   async (resolve, reject) => {
//     try {
//       resolve(Service.successResponse({
//         bootcampSubjecFileId,
//         bootcampSubjectFile,
//       }));
//     } catch (e) {
//       reject(Service.rejectResponse(
//         e.message || 'Invalid input',
//         e.status || 405,
//       ));
//     }
//   },
// );

module.exports = {
  addBootcamp,
  // addBootcampAssignment,
  // addBootcampAssignmentFile,
  // addBootcampSection,
  // addBootcampSubject,
  // addBootcampSubjectFile,
  deleteBootcamp,
  // deleteBootcampAssignment,
  // deleteBootcampAssignmentFile,
  // deleteBootcampSection,
  // deleteBootcampSubject,
  // deleteBootcampSubjectFile,
  // getAllBootcampAssignmentFiles,
  // getAllBootcampAssignments,
  // getAllBootcampSections,
  // getAllBootcampSubject,
  // getAllBootcampSubjectFile,
  // getAllBootcampTalent,
  getAllBootcamps,
  // getBootcampAssignment,
  // getBootcampAssignmentFile,
  getBootcampById,
  // getBootcampSectionById,
  // getBootcampSubjectById,
  // getBootcampSubjectFileById,
  updateBootcamp,
  // updateBootcampAssignment,
  // updateBootcampAssignmentFile,
  // updateBootcampSection,
  // updateBootcampSubject,
  // updateBootcampSubjectFile,
};
