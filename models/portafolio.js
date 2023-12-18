const mongoose = require('mongoose');
const validator = require('validator');

const portfolioSchema = new mongoose.Schema({
        userId:{
            type: mongoose.Types.ObjectId,
            required: [true, 'Por favor de digitar userId'],
        },
        projectId:{
            type: mongoose.Types.ObjectId,
            required: [true, 'Por favor de digitar projectId'],
        },
        statusId:{
            type: mongoose.Types.ObjectId,
            required: [true, 'Por favor de digitar'],
        },
},
    {timestamps: true}
);

module.exports = mongoose.model('portfolios', portfolioSchema);