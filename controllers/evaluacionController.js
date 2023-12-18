const CustomAPIErrorInstance = require('../errors/custom-api');
const { EvaluacionService } = require('../services');

const addRegimenEtico = async (req, res) => {
  const { userId } = req.body;
  const { instructorId } = req.body;

  try {
    await EvaluacionService.EncontrarUsuarios(userId, instructorId);
    const respuesta = await EvaluacionService.CrearRegimenEtico({ formulario: req.body });

    return res.status(respuesta.code).json(respuesta);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance)
      return res.status(400).json(error);
    return res.status(404).json(error);
  }
};


const addLogroMetas = async (req, res) => {
  const { userId, instructorId } = req.body;

  try {
    const find = await EvaluacionService.EncontrarUsuarios(userId, instructorId);
    if (find) {
      const response = await EvaluacionService.crearLogroMetas({ formulario: req.body });
      return res.status(response.code).json(response);
    }
    return res.status(400).json(false);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance)
      return res.status(400).json(error);
    return res.status(500).json(error);
  }
};


const addAsPectoMejora = async (req, res) => {
  const { userId, instructorId } = req.body;

  try {
    await EvaluacionService.EncontrarUsuarios(userId, instructorId);
    const response = await EvaluacionService.CrearAspectoMejora({ formulario: req.body });
    // console.log(response);

    if (response.payload.hasError) {
      return res.status(400).json({
        response: "not found users or not created",
      });
    }

    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance)
      return res.status(400).json(error);
    return res.status(404).json(error);
  }
};


module.exports = {addAsPectoMejora, addLogroMetas, addRegimenEtico};