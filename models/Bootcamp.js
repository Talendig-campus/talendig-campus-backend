const { Schema, model, Types } = require("mongoose");
const validator = require("validator");

const BoootcampSchema = new Schema({
  name: {
    type: String,
    required: [true, "Favor de colocar un nombre al bootcamp"],
    trim: true,
    unique: true,
  },

  photoUrl: {
    type: String,
    trim: true,
    validate: {
      validator(value) {
        return validator.default.isURL(value);
      },
      message: "Por favor, coloque un URL valido",
    },
    default: "http://google.com"
  },

  price: {
    type: Number,
    required: true
  },

  description: {
    type: String,
    required: [true, "Favor de colocar la descripcion del bootcamp"],
    trim: true
  },

  status: {
    type: Types.ObjectId,
    ref: "Status"
  }

}, { timestamps:  true, versionKey: false });

const BootcampModel = model("Bootcamp", BoootcampSchema);
module.exports = BootcampModel;
