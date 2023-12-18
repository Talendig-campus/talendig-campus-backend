const {Schema, model} = require('mongoose');

const AccessLevelSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor, coloque un nombre'],
      minlength: 3,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false },
);

const AccessLevelModel = model('AccessLevel', AccessLevelSchema);
module.exports = AccessLevelModel;
