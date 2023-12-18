const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor, coloque un nombre'],
      minlength: 3,
      trim: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    description: {
      type: String,
      required: [true, 'Por favor, coloque una description'],
      trim: true,
    },
    profileIds: {
      type: [mongoose.Types.ObjectId],
      required: [true, 'Por favor, coloque los perfiles'],
    },
    statusId: {
      type: mongoose.Types.ObjectId,
      trim: true,
      ref: 'Status',
      required: [true, 'Por favor, coloque un estado'],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Event', EventSchema);
