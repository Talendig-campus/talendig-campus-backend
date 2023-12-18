const mongoose = require('mongoose');
const validator = require('validator');
const AddressSchema = require('./commons/address');

const ContactSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Por favor, agregar ID al que le pertenece el usuario'],
    },
    email: {
      type: String,
      required: [true, 'Por favor, agregue el correo electronico'],
      validate: {
        validator: validator.isEmail,
        message: 'Por favor, agregue un correo electronico válido',
      },
    },
    contactType: {
      type: String,
      enum: ['emergency', 'jobReference'],
      required: [true, 'Por favor, selecciona un tipo de contacto'],
    },
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

    phone: {
      type: String,
      required: [true, 'Por favor, agregue el número telefónico'],
      validate: {
        validator(value) {
          return validator.isMobilePhone(value, 'es-DO');
        },
        message: 'Por favor, agregue un número telefónico válido',
      },
    },
    address: AddressSchema,
    statusId: {
      type: mongoose.Types.ObjectId,
      trim: true,
      ref: 'Status',
      required: [true, 'Por favor, coloque un estado'],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Contact', ContactSchema);
