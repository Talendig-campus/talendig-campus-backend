const CustomAPIErrorInstance = require("../errors/custom-api");
const { LenguajeService } = require("../services");

/**
 *
 * Controller for a new Languaje
 * @returns 201
 */
const addLanguage = async (req, res) => {
  const { language } = req.body;

  if (language == "" || language == undefined) {
    return res.status(400).json();
  }

  try {
    const response = await LenguajeService.createLanguage({ language });
    // console.log(response);
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance)
      return res.status(400).json(error);
    return res.status(500).json(error);
  }
};

const getLanguages = async (req, res) => {
  const { filter } = req.body;
  // console.log(req.body);

  // if (!filter || filter == "" || filter == undefined) {
  //   return res.status(400).json();
  // }

  try {
    const response = await LenguajeService.getLanguages({ filter });
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance)
      return res.status(400).json(error);
    return res.status(404).json(error);
  }
};

const getLanguajeById = async (req, res) => {
  const { id } = req.params;

  if (id == "" || id == undefined) {
    return res.status(400).json();
  }

  try {
    const response = await LenguajeService.getSingleLanguage({
      languageId: id,
    });
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance)
      return res.status(400).json(error);
    return res.status(404).json(error);
  }
};

const deleteLanguaje = async (req, res) => {
  const { id } = req.params;

  if (id == "" || id == undefined) {
    return res.status(400).json();
  }

  try {
    const response = await LenguajeService.deleteLanguage({ languageId: id });
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance)
      return res.status(400).json(error);
    return res.status(500).json(error);
  }
};

const updateLanguaje = async (req, res) => {
  const { id } = req.params;

  if (id == "" || id == undefined) {
    return res.status(400).json();
  }

  try {
    const response = await LenguajeService.updateLanguage({
      languageId: id,
      languageCreated: req.body,
    });
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance)
      return res.status(400).json(error);
    return res.status(404).json(error);
  }
};

module.exports = {
  addLanguage,
  getLanguages,
  updateLanguaje,
  deleteLanguaje,
  getLanguajeById,
};
