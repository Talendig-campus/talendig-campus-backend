const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor, coloque el nombre del reporte'],
      minlength: 3,
      trim: true,
    },
    labels: {
      type: [
        {
          type: String,
          trim: true,
        },
      ],
      required: true,
    },
    datetime: {
      type: Date,
    },
    datasets: [
      {
        label: String,
        variation: {
          value: Number,
          isPercent: Boolean,
        },
        data: [String],
      },
    ],
    statusId: {
      type: mongoose.Types.ObjectId,
      trim: true,
      ref: 'Status',
      required: [true, 'Por favor, coloque un estado'],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Report', ReportSchema);
