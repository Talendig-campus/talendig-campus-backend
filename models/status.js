const { Schema, model } = require('mongoose');

const StatusSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor, coloque un nombre'],
      minlength: 3,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true, versionKey: false },
);

const StatusModel = model('Status', StatusSchema); 
module.exports = StatusModel;
