/* eslint-disable no-unused-vars */
const Service = require('./Service');
const Institution = require('../models/institution.js');
const Intership = require('../models/intership.js');
const IntershipTalent = require('../models/intershipTalent');
const CustomAPIError = require('../errors/index');
const { SHORTTEXTREPONSE } = require('../constants/helperConstants');
const { textResponseFormat } = require('../utils/utilsFunctions');
const {institutionUtils, intershipUtils, userUtils, statusUtils, Pagination} = require('../utils');
/**
* Create institution
* add a new instritution
*
* institution Institution Created institution object (optional)
* returns createInstitution_200_response
* */
const createInstitution = ({ institution }) => {

  const institutionData = Institution.create(institution);
  if (!institution) {
    throw new CustomAPIError.BadRequestError(
      textResponseFormat(entityName, SHORTTEXTREPONSE.notFound),
    );
  }
  return {
    payload: {
      hasError: false,
      message: 'Institution Creado',
      content: institutionData,
    },
  };
};
/**
* Create intership
* Create intership
*
* intership Intership Created intership object (optional)
* returns createIntership_200_response
* */
const createIntership = ({ intership }) => {

  const intershipData = Intership.create(intership);
  const entityName = 'Intership';

  if (!intership) {
    throw new CustomAPIError.BadRequestError(
      textResponseFormat(entityName, SHORTTEXTREPONSE.notFound),
    );
  }

  return {
    payload: {
      hasError: false,
      message: 'Intership Creado',
      content: intershipData,
    },
  };
};
/**
* Create intershipTalent
* Create intershipTalent
*
* intershipTalent IntershipTalent Created intershipTalent object (optional)
* returns createIntershipTalent_200_response
* */
const createIntershipTalent = async ({ intershipTalent }) => {

  if (!intershipTalent) {
    throw new CustomAPIError.BadRequestError(
      textResponseFormat(entityName, SHORTTEXTREPONSE.notFound),
    );
  }

  const intershipTalendigData = await IntershipTalent.create(intershipTalent);
  const entityName = 'Intership';

  
  return {
    payload: {
      hasError: false,
      message: 'Intership Creado',
      content: intershipTalendigData,
    },
  };
}; 
/**
* Delete institution
* Delete a institution by userId
*
* institutionId String Id of institution that need to be deleted
* returns createInstitution_200_response
* */
const deleteInstitutionById = async ({ institutionId }) => {

  const institution = await institutionUtils.getInstitutionById(institutionId);
  const entityName = 'Intership';

  if (!institution) {
    throw new CustomAPIError.NotFoundError(
      textResponseFormat(entityName, SHORTTEXTREPONSE.notFound),
    );
  }
  await userUtils.deleteUserById(institution.userId);

  return {
    payload: {
      hasError: false,
      message: textResponseFormat(entityName,SHORTTEXTREPONSE.deleted),
      content: {},
    },
  };
  
}; 
/**
* Delete intership
* Delete a intership by userId
*
* intershipId String Id that need to be deleted
* returns EmptyResponse
* */
const deleteIntershipById = async ({ intershipId }) => {
  const intership = await intershipUtils.getIntershipById(intershipId);
  const entityName = 'Intership';

  if (!intership) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(
        entityName,
        SHORTTEXTREPONSE.notFound,
      ),
    );
  }

  const statusId = await statusUtils.getStatusIdByName('inactive');
  const instershipDeleted = await Intership.updateOne({ _id: intershipId }, { statusId });

  if (instershipDeleted.modifiedCount !== 1) {
    throw new Error(SHORTTEXTREPONSE.serverError);
  }

  return {
    payload: {
      hasError: false,
      message: textResponseFormat(entityName,SHORTTEXTREPONSE.deleted),
      content: {},
    },
  };
};
/**
* Delete intershipTalent
* Delete a intershipTalent by userId
*
* intershipTalentId String Id that need to be deleted
* returns EmptyResponse
* */
const deleteIntershipTalentById = async ({ intershipTalentId }) => {
  const intershipTalent = await intershipUtils.getIntershipTalentById(intershipTalentId);
  const entityName = 'IntershipTalent';

  if (!intershipTalent) {
    throw new CustomAPIError.NotFoundError(
      textResponseFormat(entityName, SHORTTEXTREPONSE.notFound),
    );
  }
  const statusId = await statusUtils.getStatusIdByName('inactive');
  const intershipTalentDeleted = await IntershipTalent.updateOne({ _id: intershipTalentId }, { statusId });

  if (intershipTalentDeleted.modifiedCount !== 1) {
    throw new Error(SHORTTEXTREPONSE.serverError);
  }
  return {
    payload: {
      hasError: false,
      message: textResponseFormat(entityName,SHORTTEXTREPONSE.deleted),
      content: {},
    },
  };
};
/**
* Find institution by ID
* Returns a single institution
*
* institutionId String ID of institution to return
* returns createInstitution_200_response
* */
const getInstitutionById = async ({ institutionId }) => {

  const institutionData = await institutionUtils.getInstitutionById(institutionId);
  const entityName = 'Institution';
  console.log(institutionData.userId);
  if (!institutionId) {
    throw new CustomAPIError.NotFoundError(
      textResponseFormat(entityName, SHORTTEXTREPONSE.notFound),
    );
  }

  return {
    payload: {
      hasError: false,
      message: '',
      content: institutionData,
    },
  };
};
/**
* Get institution
* Get institutions
*
* institutionPagination InstitutionPagination Get institutions object (optional)
* returns getInstitutions_200_response
* */
const getInstitutions = async ({ institutionPagination }) => {
  const entityName = 'Institution';

  const { filter, pagination } = institutionPagination;

  const paginationClass = new Pagination(pagination);
  let queryPagination = paginationClass.queryPagination();

  const institutions = await Institution.find(filter, null, queryPagination);
  const count = await Institution.countDocuments(filter);

  queryPagination = { quantity: count, page: paginationClass.page };

  return {
    payload: {
      hasError: false,
      message: textResponseFormat(
        entityName,
        SHORTTEXTREPONSE.found,
      ),
      content: institutions,
      pagination: new Pagination(queryPagination),
    },
  };
};
/**
* Get intership
* Get intership
*
* intershipPagination IntershipPagination Get intership object (optional)
* returns getIntership_200_response
* */
const getIntership = async ({ intershipPagination }) => {
  const entityName = 'Intership';

  const { filter, pagination } = intershipPagination;

  const paginationClass = new Pagination(pagination);
  let queryPagination = paginationClass.queryPagination();

  const interships = await Intership.find(filter, null, queryPagination);
  const count = await Intership.countDocuments(filter);

  queryPagination = { quantity: count, page: paginationClass.page };

  return {
    payload: {
      hasError: false,
      message: textResponseFormat(
        entityName,
        SHORTTEXTREPONSE.found,
      ),
      content: interships,
      pagination: new Pagination(queryPagination),
    },
  };
};
/**
* Find intership by ID
* Returns a single intership
*
* intershipId String ID of institution to return
* returns createIntership_200_response
* */
const getIntershipById = async ({ intershipId }) => {

  const intershipData = await intershipUtils.getIntershipById(intershipId);
  const entityName = 'Intership';

  if (!intershipData) {
    throw new CustomAPIError.NotFoundError(
      textResponseFormat(entityName, SHORTTEXTREPONSE.notFound),
    );
  }
  console.log(intershipData)
  return {
    payload: {
      hasError: false,
      message: '',
      content: intershipData,
    },
  };
};
/**
* Get intershipTalent
* Get intershipTalent
*
* intershipTalentPagination IntershipTalentPagination Get intershipTalent object (optional)
* returns getIntershipTalent_200_response
* */
const getIntershipTalent = async ({ intershipTalentPagination }) => {
  const entityName = 'IntershipTalent';

  const { filter, pagination } = intershipTalentPagination;

  const paginationClass = new Pagination(pagination);
  let queryPagination = paginationClass.queryPagination();

  const intershipTalents = await IntershipTalent.find(filter, null, queryPagination);
  const count = await IntershipTalent.countDocuments(filter);

  queryPagination = { quantity: count, page: paginationClass.page };

  return {
    payload: {
      hasError: false,
      message: textResponseFormat(
        entityName,
        SHORTTEXTREPONSE.found,
      ),
      content: intershipTalents,
      pagination: new Pagination(queryPagination),
    },
  };
};
/**
* Find intershipTalent by ID
* Returns a single intership
*
* intershipTalentId String ID of intershipTalent to return
* returns createIntershipTalent_200_response
* */
const getIntershipTalentCreatedById = async ({ intershipTalentId }) => {

  const intershipTalentData = await intershipUtils.getIntershipTalentById(intershipTalentId);
  const entityName = 'IntershipTalent';

  if (!intershipTalentData) {
    throw new CustomAPIError.NotFoundError(
      textResponseFormat(entityName, SHORTTEXTREPONSE.notFound),
    );
  }

  return {
    payload: {
      hasError: false,
      message: '',
      content: intershipTalentData,
    },
  };
};
/**
* Update an existing institution
* Update an existing institution by Id
*
* institutionId String Id of institution that need to be update
* institutionCreated InstitutionCreated Update an existent institution in the store
* returns createInstitution_200_response
* */
const updateInstitution = async ({ institutionId, institutionCreated }) => {

  const entityName = 'Institution';

  if (institutionId !== institutionCreated._id) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.errorId);
  }
  


  const { _id, ...values } = institutionCreated;

  const updated = await Institution.updateOne({ _id }, values);

  if (updated.modifiedCount !== 1) {
    throw new Error(SHORTTEXTREPONSE.serverError);
  }

  const institutionUpdated = await institutionUtils.getInstitutionById(institutionId);

  return {
    payload: {
      hasError: false,
      message: textResponseFormat(entityName, SHORTTEXTREPONSE.updated),
      content: institutionUpdated,
    },
  };
};

/**
* Update an existing intership
* Update an existing intership by Id
*
* intershipId String ID of intership to update
* intershipCreated IntershipCreated Update an existent intership in the store (optional)
* returns createIntership_200_response
* */

const updateIntershipId = async ({ intershipId, intershipCreated }) => {

  const entityName = 'Instership';

  if (intershipId !== intershipCreated._id) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.errorId);
  }

  const { _id, ...values } = intershipCreated;

  const updated = await Intership.updateOne({ _id }, values);

  if (updated.modifiedCount !== 1) {
    throw new Error(SHORTTEXTREPONSE.serverError);
  }

  const intershipUpdated = await intershipUtils.getIntershipById(intershipId);

  return {
    payload: {
      hasError: false,
      message: textResponseFormat(entityName, SHORTTEXTREPONSE.updated),
      content: intershipUpdated,
    },
  };
};
/**
* Update an existing intershipTalent
* Update an existing intershipTalent by Id
*
* intershipTalentId String ID of intershipTalent to update
* intershipTalentCreated IntershipTalentCreated Update an existent intershipTalent in the store (optional)
* returns createIntershipTalent_200_response
* */
const updateIntershipTalentId = async ({ intershipTalentId, intershipTalentCreated }) => {

  const entityName = 'IntershipTalent';

  if (intershipTalentId !== intershipTalentCreated._id) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.errorId);
  }

  const { _id, ...values } = intershipTalentCreated;

  const updated = await IntershipTalent.updateOne({ _id }, values);

  if (updated.modifiedCount !== 1) {
    throw new Error(SHORTTEXTREPONSE.serverError);
  }

  const intershipTalentUpdated = await intershipUtils.getIntershipTalentById(intershipTalentId);

  return {
    payload: {
      hasError: false,
      message: textResponseFormat(entityName, SHORTTEXTREPONSE.updated),
      content: intershipTalentUpdated,
    },
  };
};

module.exports = {
  createInstitution,
  createIntership,
  createIntershipTalent,
  deleteInstitutionById,
  deleteIntershipById,
  deleteIntershipTalentById,
  getInstitutionById,
  getInstitutions,
  getIntership,
  getIntershipById,
  getIntershipTalent,
  getIntershipTalentCreatedById,
  updateInstitution,
  updateIntershipId,
  updateIntershipTalentId,
};
