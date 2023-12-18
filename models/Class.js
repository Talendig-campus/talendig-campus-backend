const { Schema, model, Types } = require("mongoose");
const validator = require("validator");

const classLimit = (value) => value.length <= 30;

const ClassSchema = new Schema({
  bootcamp: {
    type: Types.ObjectId,
    required: [true, "Favor de colocar un bootcamp al que pertenece la clase"],
    ref: "Bootcamp"
  },

 talents: {
    type: [{
        type: Types.ObjectId,
        ref: "User"
    }],

    validate: [classLimit, "{PATH} extents the limit of 30"]
 },

 instructor: {
    type: Types.ObjectId,
    ref: "User",
    required: [true, "favor de colocar al instructor que impartira esta clase"]
 },

 status: {
   type: Types.ObjectId,
   ref: "Status"
 },

 startDate: {
    type: Date,
    required: true,
    default: Date.now(),
 },

 endDate: {
    type: Date,
    required: true
 }

}, {timestamps: true, versionKey: false} );

const ClassModel = model("Class", ClassSchema);
module.exports = ClassModel;
