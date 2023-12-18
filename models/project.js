const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: 'User',
    required: [true, 'Por favor coloque el id del usuario'],
  },
  name: {
    type: String,
    required: [true, 'Por favor coloque el nombre del usuario'],
    trim: true,
  },
  createDate: {
    type: Date,
    required: [true, 'Por favor seleccione una fecha de creacion'],
  },
  modifiedDate: {
    type: Date,
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
  },
});

module.exports = mongoose.model('Project', ProjectSchema);
