const {Schema, model} = require('mongoose');

const TechnologySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor, coloque un nombre'],
      minlength: 2,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },

    // statusId: {
    //   type: Types.ObjectId,
    //   trim: true,
    //   ref: 'Status',
    //   required: [true, 'Por favor, coloque un estado'],
    // },
  },
  { timestamps: true, versionKey: false },
);

const TechnologyModel = model('Technology', TechnologySchema);
module.exports = TechnologyModel;
