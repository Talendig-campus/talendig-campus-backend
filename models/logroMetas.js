const { Schema, model, Types } = require('mongoose');
const validator = require('validator');

const LogroMetasSchema = new Schema(
  {
    institucion: {
      type: Types.ObjectId,
      ref: 'institutions',
      required: [true, 'Favor de ingresar la institucion'],
    },

    periodo: {
      type: Date,
      required: true,
      default: Date.now(),
    },

    unidadOrganizativa: {
      type: String,
      required: true,
    },

    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: [
        true,
        'Porfavor, introduzca el id del usuario que lleno el formulario',
      ],
    },
    instructorId: {
      type: Types.ObjectId,
      ref: 'Instructor',
      required: [
        true,
        'Porfavor, introduzca el id del usuario que lleno el formulario',
      ],
    },

    cargoServidor: {
      type: String,
      required: [true, 'favor de introducir su cargo actual'],
    },

    cargoSupervisor: {
      type: String,
      required: [true, 'favor de introducir su cargo actual'],
    },

    metas: [
      {
        type: String,
        required: [true, 'Favor de introducir sus metas actuales'],
      },
    ],

    indicadorCuanto: [
      {
        type: String,
        required: true,
      },
    ],

    indicadorCuando: [
      {
        type: String,
        required: true,
      },
    ],

    ponderacion: [
      {
        type: Number,
      },
    ],

    ponderacionTotal: {
      type: Number,
      required: true,
    },

    calificacion: [
      {
        type: Number,
      },
    ],

    calificacionTotal: {
      type: Number,
      required: true,
    },

    observaciones: [
      {
        type: String,
      },
    ],

    fechaEvaluacion: {
      type: Date,
      required: true,
      default: Date.now(),
    },

    fechaAcuerdo: {
      type: Date,
      required: true,
      default: Date.now(),
    },

    firmaServidor: {
      type: String,
      required: [true, 'Favor de ingresar la firma del servidor'],
      validate: (value) => {
        if (!validator.default.isURL(value)) {
          throw new Error(
            'Error favor de enviar una url valida para firma supervisor',
          );
        }
      },
    },

    firmaSupervisor: {
      type: String,
      required: [true, 'Favor de ingresar la firma del supervisor'],
      validate: (value) => {
        if (!validator.default.isURL(value)) {
          throw new Error(
            'Error favor de enviar una url valida para firma supervisor',
          );
        }
      },
    },
  },
  { timestamps: true, versionKey: false },
);

const LogroMetasModel = model('LogroMetas', LogroMetasSchema);

module.exports = LogroMetasModel;
