const mongoose = require('mongoose');
const validator = require('validator');

const InstructorBootcampSchema = new mongoose.Schema(
  {
    instructorId: {
      type: [mongoose.Types.ObjectId],
      ref: 'User',
      required: [true, 'Por favor, agregar ID al que le pertenece el usuario'],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('InstructorBootcamp', InstructorBootcampSchema);
