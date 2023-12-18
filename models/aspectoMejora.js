const { Schema, model, Types } = require('mongoose');
const validator = require('validator');

const aspectoMejoraSchema = new Schema(
  {
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

    puntos_fuertes: [
      {
        type: String,
        required: [true, 'Favor de escribir un punto fuerte'],
        minlength: 3,
      },
    ],

    areas_mejora: [
      {
        type: String,
        required: [true, 'Favor de colocar un area de mejora'],
        minlength: 3,
      },
    ],

    condicion_trabajo: [
      {
        type: String,
        required: [true, 'Favor de colocar condiciones/entorno de trabajo'],
        minlength: 3,
      },
    ],
    comentarios: [
      {
        type: String,
        minlength: 3,
      },
    ],

    calificacion_plan_mejora: {
      type: Boolean,
      default: false,
    },

    fecha: {
      type: Date,
      default: Date.now(),
    },

    firmaEvaluador: {
      type: String,
      required: [true, 'Favor de colocar la firma del evaluador/a'],
      validate: (value) => {
        if (!validator.default.isURL(value)) {
          throw new Error('Firma incorrecta, favor de introducir una URL');
        }
      },
    },

    firmaServidor: {
      type: String,
      required: [true, 'Favor de colocar la firma del servidor/a'],
      validate: (value) => {
        if (!validator.default.isURL(value)) {
          throw new Error('Firma incorrecta, favor de introducir una URL');
        }
      },
    },
  },
  { timestamps: true, versionKey: false },
);

const aspectoMejoraModel = model('AspectoMejora', aspectoMejoraSchema);

module.exports = aspectoMejoraModel;
