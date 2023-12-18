/* eslint-disable no-unused-vars */
const { StatusCodes } = require('http-status-codes');
const Service = require('./Service');
const EventSchema = require('../models/event');
const CustomAPIError = require('../errors/index');
const { SHORTTEXTREPONSE } = require('../constants/helperConstants');
const { utilsFunctions, statusUtils, Pagination } = require('../utils');

const eventName = 'Evento';
/**
* Create event for user
* The creation of a new event.
*
* event Event Create event object
* returns createEvent_200_response
* */
const createEvent = async ({ event }) => {
  if (!event) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.noBodyRequest);
  }

  const newEvent = await EventSchema.create(event);

  return {
    code: StatusCodes.CREATED,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        eventName,
        SHORTTEXTREPONSE.created,
      ),
      content: newEvent,
    },
  };
};
/**
* Delete event
* delete event.
*
* eventId String Id of the event
* returns EmptyResponse
* */
const deleteEvent = async ({ eventId }) => {
  const event = await EventSchema.findById(eventId);

  if (!event) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(eventName, SHORTTEXTREPONSE.notFound),
    );
  }

  const statusId = await statusUtils.getStatusIdByName('inactive');
  const eventDeleted = await EventSchema.updateOne(
    { _id: eventId },
    { statusId },
  );

  if (eventDeleted.modifiedCount !== 1) {
    throw new Error(SHORTTEXTREPONSE.serverError);
  }

  return {
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        eventName,
        SHORTTEXTREPONSE.deleted,
      ),
      content: {},
    },
  };
};
/**
* get events
* get events.
*
* eventPagination EventPagination Created event object
* returns getEvents_200_response
* */
const getEvents = async ({ eventPagination }) => {
  const { filter, pagination } = eventPagination;

  const paginationClass = new Pagination(pagination);
  let queryPagination = paginationClass.queryPagination();

  const events = await EventSchema.find(filter, null, queryPagination);
  const count = await EventSchema.countDocuments(filter);

  queryPagination = { quantity: count, page: paginationClass.page };

  return {
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        eventName,
        SHORTTEXTREPONSE.found,
      ),
      content: events,
      pagination: new Pagination(queryPagination),
    },
  };
};
/**
* get single event
* get single event
*
* eventId String Id of the event
* returns createEvent_200_response
* */
const getSingleEvent = async ({ eventId }) => {
  const event = await EventSchema.findById(eventId);

  if (!event) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(eventName, SHORTTEXTREPONSE.notFound),
    );
  }

  const isEventActive = await statusUtils.isActive(event.statusId);

  if (!isEventActive) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(
        eventName,
        SHORTTEXTREPONSE.userDeleted,
      ),
    );
  }

  return {
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        eventName,
        SHORTTEXTREPONSE.found,
      ),
      content: event,
    },
  };
};
/**
* update event for user
* update event.
*
* eventId String Id of the contact
* eventCreated EventCreated Created contact object
* returns createEvent_200_response
* */
const updateEvent = async ({ eventId, eventCreated }) => {
  if (eventId !== eventCreated._id) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.errorId);
  }

  const event = await EventSchema.findById(eventId);

  if (!event) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(eventName, SHORTTEXTREPONSE.notFound),
    );
  }

  const isEventActive = await statusUtils.isActive(event.statusId);

  if (!isEventActive) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(eventName, SHORTTEXTREPONSE.userDeleted),
    );
  }

  const { _id, ...values } = eventCreated;

  const updated = await EventSchema.updateOne({ _id }, values);

  if (updated.modifiedCount !== 1) {
    throw new Error(SHORTTEXTREPONSE.serverError);
  }

  const eventUpdated = await EventSchema.findById(eventId);

  return {
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        eventName,
        SHORTTEXTREPONSE.updated,
      ),
      content: eventUpdated,
    },
  };
};

module.exports = {
  createEvent,
  deleteEvent,
  getEvents,
  getSingleEvent,
  updateEvent,
};
