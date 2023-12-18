/* eslint-disable no-unused-vars */
const CustomAPIError = require('../errors/index');
const { StatusCodes } = require('http-status-codes');
const { SHORTTEXTREPONSE, STATUS, ACCESSLEVELS } = require('../constants/helperConstants');
const { statusUtils, utilsFunctions } = require('../utils/index');
const ClassSchema = require('../models/Class');

const className = "Clase"


const addClass = async ({ clase }) => {
    if (clase === null || clase === undefined || typeof clase != "object") {
        throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.noBodyRequest);
      }

    const verifyInstructor = await ClassSchema.findOne({_id: clase.instructor})
      .populate('accessLevel', {name: 1, _id: 0});

      if (!verifyInstructor || verifyInstructor.accessLevel?.name != ACCESSLEVELS.instructor) {
        throw new CustomAPIError.BadRequestError(
          utilsFunctions.textResponseFormat(className, "El instructor de esta clase es invalido"),
        );
      }
    
      const newClass = new ClassSchema({...clase});
      const classCreated = await newClass.save();
    
      if (!classCreated) {
        throw new Error(SHORTTEXTREPONSE.serverError);
      }
    
      return {
        code: StatusCodes.CREATED,
        payload: {
          hasError: false,
          message: utilsFunctions.textResponseFormat(
            className,
            SHORTTEXTREPONSE.created,
          ),
          content: classCreated,
        },
      };
}

const deleteClass = async ({ classId }) => {
    const classExist = await ClassSchema.findOne({_id : classId}).populate('status', {name: 1});

  if (!classExist) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(className, SHORTTEXTREPONSE.notFound),
    );
  }

  if (classExist.status?.name != STATUS.active) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(className, SHORTTEXTREPONSE.notFound),
    );
  }
  const status = await statusUtils.getStatusIdByName(STATUS.inactive);
  const classDeleted = await ClassSchema.updateOne({_id: classId}, {status});

  if (classDeleted.modifiedCount !== 1) {
    throw new CustomAPIError.BadRequestError(
      utilsFunctions.textResponseFormat(className, SHORTTEXTREPONSE.serverError),
    );
  }

  return {
    code: StatusCodes.NO_CONTENT,
    payload: {
      hasError: false,
      message: utilsFunctions.textResponseFormat(
        className,
        SHORTTEXTREPONSE.deleted,
      ),
      content: {},
    },
  };
}


const getAllClass = async ({ filter }) => {
    const classes = await ClassSchema.find(filter).populate('status', {name: 1})
    .populate('instructor', {name:1, lastName:1})
    .populate('talents', {name: 1, lastName: 1, gender: 1, phoneNumber:1, talentId: 1}) || null;
  
    if (classes === null) {
      throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.noBodyRequest);
    }
  
    return {
      code: StatusCodes.OK,
      payload: {
        hasError: false,
        content: classes,
      },
    }
  }


const getClassById = async ({ classId }) => {
    const singleClass = await ClassSchema.findOne({_id: classId}).populate('status', {name: 1})
    .populate('instructor', {name:1, lastName:1, talentId: 1})
    .populate('talents', {name: 1, lastName: 1, gender: 1, phoneNumber:1, talentId: 1});
  
    if (singleClass === null) {
      throw new CustomAPIError.NotFoundError(
        utilsFunctions.textResponseFormat(className, SHORTTEXTREPONSE.notFound),
      );
    }
  
    return {
      code: StatusCodes.OK,
      payload: {
        hasError: false,
        content: singleClass,
      },
    }
  
  }

const updateClass = async({ classId, classCreated }) => {
    const findClass = await ClassSchema.findOne({_id: classId}).populate('status', {name:1});
  
    if (!findClass || findClass === undefined) {
      throw new CustomAPIError.NotFoundError(
        utilsFunctions.textResponseFormat(className, SHORTTEXTREPONSE.notFound),
      );
    }
  
    const updated = await ClassSchema.findByIdAndUpdate(classId , classCreated, { new: true });
  
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


module.exports = {
    addClass,
    getAllClass,
    getClassById,
    deleteClass,
    updateClass,
}