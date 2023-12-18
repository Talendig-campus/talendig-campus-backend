const mongoose = require('mongoose');
const AddressSchema = require('./commons/address');

const RecruiterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Por favor, agregar ID al que le pertenece el reclutador'],
    },
    gender: {
      type: String,
      enum: ['Femenino', 'Masculino', 'Otro'],
      required: [true, 'Por favor, selecciona un género'],
    },

    languages: {
      type: [mongoose.Types.ObjectId],
      ref: 'Language',
      required: [true, 'Por favor, selecciona un idioma'],
    },

    companyDetails: {
      name: {
        type: String,
        required: [true, 'Por favor, coloque el nombre de la empresa'],
        minlength: 3,
        trim: true,
      },
      rnc: {
        type: String,
        trim: true,
        required: [true, 'Por favor, coloque la rnc de la empresa'],
        minlength: 5,
      },
      address: AddressSchema,
    },

    contacts: {
      type: [mongoose.Types.ObjectId],
      ref: 'Contact',
      required: [true, 'Por favor, agregar el contacto de emergencia'],
    },

    birthDate: {
      type: Date,
      required: [true, 'Por favor, agregar fecha de nacimiento'],
    },

    educations: {
      type: [mongoose.Types.ObjectId],
      ref: 'Education',
      required: [true, 'Por favor, agregar la educación'],
    },

    workExperiences: {
      type: [mongoose.Types.ObjectId],
      ref: 'WorkExperience',
      required: [true, 'Por favor, agregar la experiencia laboral'],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Recruiter', RecruiterSchema);
