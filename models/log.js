const mongoose = require('mongoose');
const validator = require('validator');

const logSchema = new mongoose.Schema({
    datetime:{
        type: Date,
        required: [true, 'Por favor de digitar fecha'],
    },
    action:{
        type: String,
        required: [true, 'Por favor de digitar action'],
    },
    userId:{
        type: String,
        required: [true, 'Por favor de digitar userId'],
    },
},
    {timestamps: true}
);

module.exports = mongoose.model('logs', logSchema);