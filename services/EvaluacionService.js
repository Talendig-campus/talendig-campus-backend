/* eslint-disable camelcase */
const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
const LogroMetas = require('../models/logroMetas');
const AspectoMejora = require('../models/aspectoMejora');
const Instructor = require('../models/instructor');
const RegimenEtico = require('../models/regimenEtico');
const CustomAPIError = require('../errors/index');
const { SHORTTEXTREPONSE } = require('../constants/helperConstants');
const { utilsFunctions } = require('../utils');

const EncontrarUsuarios = async (userId, instructorId) => {
  if (!userId) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.notId);
  }

  if (!instructorId) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.notId);
  }

  const foundInstructor = await Instructor.findById(instructorId);

  if (!foundInstructor) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(
        `El instructor con el id ${instructorId}`,
        SHORTTEXTREPONSE.notFound,
      ),
    );
  }

  const foundUser = await User.findById(userId);

  if (!foundUser) {
    throw new CustomAPIError.NotFoundError(
      utilsFunctions.textResponseFormat(
        `El instructor con el id ${instructorId}`,
        SHORTTEXTREPONSE.notFound,
      ),
    );
  }

  return true;
};

const CrearRegimenEtico = async ({ formulario }) => {
  try {
    const {
      userId,
      instructorId,
      lealtad,
      transparencia,
      colaboracion,
      relaciones_interpersonales,
      cumplimiento_normas,
    } = formulario;

    const suma_puntuacion =
      lealtad +
      transparencia +
      colaboracion +
      relaciones_interpersonales +
      cumplimiento_normas;

    if (
      lealtad > 3 ||
      transparencia > 3 ||
      colaboracion > 3 ||
      relaciones_interpersonales > 3 ||
      cumplimiento_normas > 3
    ) {
      return {
        code: StatusCodes.BAD_REQUEST,
        payload: {
          hasError: true,
          message: utilsFunctions.textResponseFormat(
            `${suma_puntuacion}`,
            SHORTTEXTREPONSE.badRequest,
          ),
          content: formulario,
        },
      };
    }
    const newRegimen = new RegimenEtico({
      userId,
      instructorId,
      lealtad,
      transparencia,
      colaboracion,
      relaciones_interpersonales,
      cumplimiento_normas,
      suma_puntuacion,
    });

    newRegimen.save();

    return {
      code: StatusCodes.CREATED,
      payload: {
        hasError: false,
        message: utilsFunctions.textResponseFormat(
          'Regimen etico',
          SHORTTEXTREPONSE.created,
        ),
        content: newRegimen,
      },
    };
  } catch (error) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.serverError);
  }
};



const crearLogroMetas = async ({ formulario }) => {
  const {
    cargoServidor,
    cargoSupervisor,
    firmaServidor,
    firmaSupervisor,
    indicadorCuando,
    indicadorCuanto,
    institucion,
    instructorId,
    metas,
    observaciones,
    periodo,
    ponderacion,
    unidadOrganizativa,
    userId,
    calificacion,
  } = formulario;

  // * calificacion total del formulario
  const calificacionBase = 65;
  try {
    if (calificacion.some((item) => item > 65)) {
      return {
        code: StatusCodes.BAD_REQUEST,
        payload: {
          hasError: true,
          message: utilsFunctions.textResponseFormat(
            SHORTTEXTREPONSE.badRequest,
          ),
          content: 'La calificaion debe ser menor o igual a 65',
        },
      };
    }

    if (ponderacion.reduce((acc, i) => acc + i) !== 65) {
      return {
        code: StatusCodes.BAD_REQUEST,
        payload: {
          hasError: true,
          message: utilsFunctions.textResponseFormat(
            SHORTTEXTREPONSE.badRequest,
          ),
          content: 'La evaluacion debe dar como total 65',
        },
      };
    }
    // * calculo de la ponderacion total
    const total = calificacion
      .map((item, i) => item * ponderacion[i])
      .reduce((acc, i) => acc + i);
    const ponderacionTotal = Math.round(total / calificacionBase);

    const calificacionTotalSuma = calificacion.reduce((acc, i) => acc + i);
    const calificacionTotal = calificacionTotalSuma / calificacion.length;

    const newLogro = new LogroMetas({
      cargoServidor,
      cargoSupervisor,
      firmaServidor,
      firmaSupervisor,
      indicadorCuando,
      indicadorCuanto,
      institucion,
      instructorId,
      metas,
      observaciones,
      periodo,
      ponderacion,
      ponderacionTotal,
      unidadOrganizativa,
      userId,
      calificacion,
      calificacionTotal,
    });
    // console.log(newLogro);
    newLogro.save();
    // console.log(save);

    return {
      code: StatusCodes.CREATED,
      payload: {
        hasError: false,
        message: utilsFunctions.textResponseFormat(
          'Logro metas',
          SHORTTEXTREPONSE.created,
        ),
        content: newLogro,
      },
    };
  } catch (error) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.serverError);
  }
};



const CrearAspectoMejora = async ({ formulario }) => {
  // console.log(formulario);
  const {
    firmaEvaluador,
    firmaServidor,
    condicion_trabajo,
    comentarios,
    calificacion_plan_mejora,
    areas_mejora,
    puntos_fuertes,
    userId,
    instructorId,
  } = formulario;

  try {
    const newAspectoMejora = new AspectoMejora({
      userId,
      instructorId,
      areas_mejora,
      puntos_fuertes,
      calificacion_plan_mejora,
      comentarios,
      condicion_trabajo,
      firmaEvaluador,
      firmaServidor,
    });

    await newAspectoMejora.save();
    // console.log(saved);

    return {
      code: StatusCodes.CREATED,
      payload: {
        hasError: false,
        message: utilsFunctions.textResponseFormat(
          'Regimen etico',
          SHORTTEXTREPONSE.created,
        ),
        content: newAspectoMejora,
      },
    };
  } catch (error) {
    throw new CustomAPIError.BadRequestError(SHORTTEXTREPONSE.serverError);
  }
};



module.exports = {CrearAspectoMejora, crearLogroMetas, CrearRegimenEtico, EncontrarUsuarios};
