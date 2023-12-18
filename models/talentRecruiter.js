const mongoose = require('mongoose');

const TalentSchema = new mongoose.Schema({
  talentId: {
    type: mongoose.Types.ObjectId,
    ref: 'Talent',
    required: [true, 'Por favor, agregar ID al que le pertenece el Talento'],
  },
  recruiterId: {
    type: mongoose.Types.ObjectId,
    ref: 'Recruiter',
    required: [true, 'Por favor, agregar ID al que le pertenece el Reclutador'],
  },
  activeStep: {
    type: Number,
    enum: [0, 1, 2, 3],
    default: 0,
  },
  activeProcess: {
    type: Boolean,
    default: false,
  },
  completedSteps: {
    type: mongoose.Schema.Types.Mixed,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  decision: {
    selection: {
      type: String,
      enum: ['reclutado', 'debe mejorar'],
      default: 'reclutado',
    },
    comments: {
      type: String,
      trim: true,
    },
  },
});

module.exports = mongoose.model('Talent', TalentSchema);
