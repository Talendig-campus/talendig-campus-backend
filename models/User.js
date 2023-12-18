const {Schema, model, Types, Error} = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
// const AddressSchema = require('./commons/address');
const {SHORTTEXTREPONSE} = require('../constants/helperConstants'); 

const UserSchema = new Schema(
  {
    // title: {
    //   type: Types.ObjectId,
    //   ref: 'Title',
    //   required: [false, 'Por favor, agregar ID del title'],
    // },

    talentId: {
      type:String,
      required: [true, 'Favor de ingresar el identificador del talento'],
      unique: true
    },

    name: {
      type: String,
      required: [true, 'Por favor, coloque un nombre'],
      minlength: 3,
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Por favor, coloque un apellido'],
      minlength: 3,
      trim: true,
    },

    gender: {
      type: String,
      enum: ['F', 'M', 'Otros'],
      default: 'Otros',
    },

    photoUrl: {
      type: String,
      trim: true,
      validate: {
        validator(value) {
          return validator.default.isURL(value);
        },
        message: 'Por favor, coloque un URL valido',
      },
    },

    phoneNumber: {
      type: String,
      required: [true, 'Por favor, coloque un número de contacto'],
      validate: {
        validator(value) {
          return validator.isMobilePhone(value, 'es-DO');
        },
        message: 'Por favor, agregue un número telefónico válido',
      },
    },

    address: {
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
    },

    technologies: [{
      type: Types.ObjectId,
      ref: 'Technology',
    }],

    languages: [{
      type: Types.ObjectId,
      ref: 'Language',
    }],

    biography: {
      type: String,
      trim: true,
    },

    birthdate: {
      type: String,
      format: Date,
      required: [true, 'Por favor seleccione una fecha de nacimiento'],
    },

    email: {
      type: String,
      required: [true, 'Por favor, coloque un correo'],
      trim: true,
      lowercase: true,
      unique: true,
      validate: (value) => {
        if (!validator.default.isEmail(value)) {
          throw new Error('Favor de colocar un email valido');
        }
      }
    },

    password: {
      type: String,
      required: [true, 'Por favor, coloque una contraseña valida'],
      trim: true,
      minlength: 5,
      // select: false,
    },

    signature: {
      type: String,
      trim: true,
      validate: {
        validator(value) {
          return validator.isURL(value);
        },
        message: 'Por favor, coloque un URL valido',
      },
    },

    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],

    accessLevel: {
      type: Types.ObjectId,
      trim: true,
      ref: 'AccessLevel',
      required: [true, 'Por favor, coloque un nivel acceso'],
    },

    lastConnectionDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true, versionKey: false },
);

// * auth
UserSchema.statics.findByCredentials = async ({ talentId, password }) => {
  const user = await User.findOne({talentId});

  if (!user) {
    return SHORTTEXTREPONSE.userNotFound;
  }
  // const talent = await bcrypt.compare(talentId, user.talentId);
  const isMatch = await bcrypt.compare(password, user.password);

  // console.log(isMatch);

  if (!isMatch) {
      return SHORTTEXTREPONSE.userNotFound;
  }

  return user
}

// * get token after auth
UserSchema.methods.generateAuthToken = async function ()  {
  const token = jwt.sign(
    { _id: this._id.toString() },
    process.env.SECRETJWT || 'TalendigFactory5',
    { expiresIn: '2h' },
  );

  this.tokens = this.tokens.concat({ token });

  await this.save();

  return token;
};

// * encrypt pass and talendId
UserSchema.pre('save', async function (next) { 

  if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 8);
  }	

  next();
})

const User = model('User', UserSchema);

module.exports = User;
