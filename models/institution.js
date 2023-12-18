const mongoose = require('mongoose');

const institutionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Por favor, agregar ID al que le pertenece el usuario'],
    },
    companyDetails: {
      type: Object,
      name: {
        type: String,
        required: [true, 'Por favor, coloque un nombre'],
        minlength: 3,
        trim: true,
      },
      foundationDate: {
        type: Date,
        required: [
          true,
          'Por favor de digitar fecha cuando fue fundada la institucion',
        ],
      },
      rnc: {
        type: String,
        required: [true, 'Por favor de digitar RNC'],
        minlength: 9,
        validate: {
          validator: (value) => /^\d{10}$/.test(value),
          message: 'Please provide a valid RNC',
        },
      },
    },
    ownerDetails: {
      type: Object,
      name: {
        type: String,
        required: [true, 'Por favor, coloque un nombre'],
        minlength: 3,
        trim: true,
      },
      lastName: {
        type: String,
        required: [true, 'Por favor, coloque un apellido'],
        minlength: 3,
        trim: true,
      },

      phoneNumber: {
        type: String,
        required: [true, 'Por favor de digitar numero de telefono'],
      },
      rnc: {
        type: String,
        required: [true, 'Por favor de digitar RNC'],
        minlength: 9,
        validate: {
          validator: (value) => /^\d{10}$/.test(value),
          message: 'Please provide a valid RNC',
        },
      },
      gender: {
        type: String,
        enum: ['Femenino', 'Masculino', 'Otros'],
        default: 'Otros',
      },
      languages: {
        type: [mongoose.Types.ObjectId],
        ref: 'Language',
        required: [true, 'Por favor de digitar idiomas que domina'],
      },
      contact: {
        type: [mongoose.Types.ObjectId],
        ref: 'Contact',
        required: [true, 'Por favor de digitar contactos de emergencia'],
      },
    },
  },
  { timestamps: true, versionKey: false },
);

module.exports = mongoose.model('institutions', institutionSchema);
