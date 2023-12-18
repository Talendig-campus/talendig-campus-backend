const mongoose = require('mongoose');
const validator = require('validator');

const intershipSchema = new mongoose.Schema({
    institutionId:{
        type: mongoose.Types.ObjectId,
        required: [true, 'Por favor de digitar idiomas'],
    },
        groupName:{
            type: String,
            required: [true, 'Por favor de digitar grupo de pasantia'],
        },
        workField:{
            type: String,
            required: [true, 'Por favor de digitar area de trabajo'],
        },
        description: {
            type: String,
            required: [true, 'Por favor de digitar descripcion del grupo'],
            maxlength: 300,
        },
        statusId:{
            type: mongoose.Types.ObjectId,
            required: [true, 'Por favor de digitar'],
        },
},
    {timestamps: true}
);

module.exports = mongoose.model('interships', intershipSchema);