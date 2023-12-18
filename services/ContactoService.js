/* eslint-disable no-unused-vars */
const { StatusCodes } = require('http-status-codes');
const Service = require('./Service');
const ContactSchema = require('../models/contact');
const CustomAPIError = require('../errors/index');
const { SHORTTEXTREPONSE } = require('../constants/helperConstants');
const { utilsFunctions, statusUtils, Pagination } = require('../utils');

const contactName = 'Contacto';
/**
 * Create contact for user
 * The creation of a new contact.
 *
 * contact Contact Created contact object
 * returns createUserContact_200_response
 * */
const createUserContact = async ({ contact }) => {
  if (!contact) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.noBodyRequest);
  }

  const newContact = await ContactSchema.create(contact);

  return {
    code: StatusCodes.CREATED,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        contactName,
        SHORTTEXTREPONSE.created,
      ),
      content: newContact,
    },
  };
};
/**
 * Delete contact for user
 * delete of user contact.
 *
 * contactId String Id of the contact
 * returns EmptyResponse
 * */
const deleteUserContact = async ({ contactId }) => {
  const contact = await ContactSchema.findById(contactId);

  if (!contact) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(contactName, SHORTTEXTREPONSE.notFound),
    );
  }

  const statusId = await statusUtils.getStatusIdByName('inactive');
  const contactDeleted = await ContactSchema.updateOne(
    { _id: contactId },
    { statusId },
  );

  if (contactDeleted.modifiedCount !== 1) {
    throw new Error(SHORTTEXTREPONSE.serverError);
  }

  return {
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        contactName,
        SHORTTEXTREPONSE.deleted,
      ),
      content: {},
    },
  };
};
/**
 * get contacts for user
 * get user contacts.
 *
 * contactId String Id of the contact
 * returns createUserContact_200_response
 * */
const getUserContact = async ({ contactId }) => {
  const contact = await ContactSchema.findById(contactId);

  if (!contact) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(contactName, SHORTTEXTREPONSE.notFound),
    );
  }

  const isContactActive = await statusUtils.isActive(contact.statusId);

  if (!isContactActive) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(
        contactName,
        SHORTTEXTREPONSE.userDeleted,
      ),
    );
  }

  return {
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        contactName,
        SHORTTEXTREPONSE.found,
      ),
      content: contact,
    },
  };
};
/**
 * get contacts for user
 * get user contacts.
 *
 * contactPagination ContactPagination Created contact object
 * returns getUserContacts_200_response
 * */
const getUserContacts = async ({ contactPagination }) => {
  const { filter, pagination } = contactPagination;

  const paginationClass = new Pagination(pagination);
  let queryPagination = paginationClass.queryPagination();

  const contacts = await ContactSchema.find(filter, null, queryPagination);
  const count = await ContactSchema.countDocuments(filter);

  queryPagination = { quantity: count, page: paginationClass.page };

  return {
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        contactName,
        SHORTTEXTREPONSE.found,
      ),
      content: contacts,
      pagination: new Pagination(queryPagination),
    },
  };
};
/**
 * update contact for user
 * update user contact.
 *
 * contactId String Id of the contact
 * contactCreated ContactCreated Created contact object
 * returns createUserContact_200_response
 * */
const updateUserContact = async ({ contactId, contactCreated }) => {
  if (contactId !== contactCreated._id) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.errorId);
  }

  const contact = await ContactSchema.findById(contactId);

  if (!contact) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(contactName, SHORTTEXTREPONSE.notFound),
    );
  }

  const isContactActive = await statusUtils.isActive(contact.statusId);

  if (!isContactActive) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(contactName, SHORTTEXTREPONSE.userDeleted),
    );
  }

  const { _id, ...values } = contactCreated;

  const updated = await ContactSchema.updateOne({ _id }, values);

  if (updated.modifiedCount !== 1) {
    throw new Error(SHORTTEXTREPONSE.serverError);
  }

  const contactUpdated = await ContactSchema.findById(contactId);

  return {
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        contactName,
        SHORTTEXTREPONSE.updated,
      ),
      content: contactUpdated,
    },
  };
};

module.exports = {
  createUserContact,
  deleteUserContact,
  getUserContact,
  getUserContacts,
  updateUserContact,
};
