const mongoose = require('mongoose');
const validator = require('validator');
const AddressSchema = require('./commons/address');

const InstructorSchema = new mongoose.Schema(
  {
    userId: {
      type: [mongoose.Types.ObjectId],
      ref: 'User',
      required: [true, 'Por favor, agregar ID al que le pertenece el usuario'],
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
    contacts: {
      type: [mongoose.Types.ObjectId],
      ref: 'Contact',
      required: [true, 'Por favor, agregar el contacto de emergencia'],
    },
    lastName: {
      type: String,
      trim: true,
      maxLength: 50,
      required: [true, 'Por favor ingrese su apellido.'],
    },
    address: AddressSchema,
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
    birthDate: {
      type: Date,
      required: [true, 'Por favor, agregar fecha de nacimiento'],
    },
    education: {
      type: [mongoose.Types.ObjectId],
      ref: 'Education',
      required: [true, 'Por favor, agregar la educación'],
    },
    workExperience: {
      type: [mongoose.Types.ObjectId],
      ref: 'WorkExperience',
      required: [true, 'Por favor, agregar la experiencia laboral'],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Instructor', InstructorSchema);
