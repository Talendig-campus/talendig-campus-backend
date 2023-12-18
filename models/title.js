const {Schema, Types, model} = require('mongoose');

const TitleSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor, coloque un nombre'],
      minlength: 3,
      trim: true,
      unique: true,
    },
  },

  { timestamps: true },
);

const TitleModel = model('Title', TitleSchema);
module.exports = TitleModel;
