const mongoose = require('mongoose');

const WorkExperienceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Por favor, agregar ID al que le pertenece el reclutador'],
  },
  title: {
    type: String,
    required: [true, 'Por favor, digite un titulo'],
    trim: true,
  },
  companyName: {
    type: String,
    required: [true, 'Por favor, digite el nombre de una compañía'],
    trim: true,
  },
  startDate: {
    type: Date,
    required: [true, 'Por favor, selecciona una fecha de inicio'],
  },
  endDate: {
    type: Date,
  },
  directSupervisor: {
    name: {
      type: String,
      required: [true, 'Por favor, digite un nombre'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Por favor, digite un apellido'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Por favor, digite un numero telefonico'],
      trim: true,
    },
  },
});

module.exports = mongoose.model('WorkExperience', WorkExperienceSchema);
