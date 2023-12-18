const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  userId: {
    type: [mongoose.Types.ObjectId],
    ref: 'User',
    required: [true, 'Por favor, agregar ID al que le pertenece el usuario'],
  },
  gender: {
    type: String,
    enum: ['Femenino', 'Masculino', 'Otros'],
    default: 'Otros',
  },
  languages: {
    type: [mongoose.Types.ObjectId],
    ref: 'Language',
    required: [true, 'Por favor, selecciona un idioma'],
  },
  contacts: {
    type: [mongoose.Types.ObjectId],
    ref: 'Contact',
    required: [true, 'Por favor, selecciona un contacto de emergencia'],
  },
  birthdate: {
    type: String,
    format: Date,
    required: [true, 'Por favor seleccione una fecha de nacimiento'],
  },
  education: {
    type: [mongoose.Types.ObjectId],
    ref: 'Education',
    required: [true, 'Por favor seleccione un tipo de educacion'],
  },
  workExperience: {
    type: [mongoose.Types.ObjectId],
    ref: 'WorkExperience',
  },
});

module.exports = mongoose.model('Administrator', AdminSchema);