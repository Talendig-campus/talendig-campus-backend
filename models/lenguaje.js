const {Schema, model} = require('mongoose');

const LanguageSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor, coloque un idioma'],
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false },
);

const LanguageModel = model('Language', LanguageSchema);
module.exports = LanguageModel;
