const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema(
  {
    metaData: {
      name: {
        type: String,
        required: [true, 'Por favor, es necesario el nombre del archivo'],
        minlength: 3,
        trim: true,
      },
      lastModified: {
        type: Date,
      },
      size: {
        type: Number,
      },
      type: {
        type: String,
      },
    },
    fileUrl: {
      type: String,
      required: [true, 'Por favor, es necesario la URL del archivo.'],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('File', FileSchema);
