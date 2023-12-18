const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema(
  {
    statusId: {
      type: mongoose.Types.ObjectId,
      trim: true,
      ref: 'Status',
      required: [true, 'Por favor, coloque un estado'],
    },
    name: {
      type: String,
      required: [true, 'Por favor, coloque un idioma'],
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    description: {
      type: String,
      default: 'Esta es la descipcion de su perfil.',
      minlength: 3,
      maxlength: 500,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Profile', ProfileSchema);
