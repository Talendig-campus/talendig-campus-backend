const {Schema} = require('mongoose');

const AddressSchema = new Schema({
  street: {
    type: String,
    trim: true,
    required: [true, 'Por favor, coloque una calle'],
  },
  city: {
    type: String,
    trim: true,
    required: [true, 'Por favor, coloque una ciudad'],
  },
  numHouseOrApartment: {
    type: String,
    trim: true,
    required: [true, 'Por favor, coloque un número de apartamento'],
  },
  neighborhood: {
    type: String,
    trim: true,
    required: [true, 'Por favor, coloque un municipio o barrio'],
  },
  zipCode: {
    type: String,
    trim: true,
    required: [true, 'Por favor, coloque un código postal'],
    validate: {
      validator: (zipCode) => /\d{5}/.test(zipCode),
      message: 'Por favor, coloque un código postal valido',
    },
  },
});

module.exports = AddressSchema;
