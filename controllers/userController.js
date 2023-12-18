const CustomAPIErrorInstance = require("../errors/custom-api");
const {Error: MongoError} = require("mongoose")
const { UsuarioService } = require("../services");

/**
 *
 * Controller for a new Languaje
 * @returns 201
 */
const addUser = async (req, res) => {
  try {
    const response = await UsuarioService.addUser({ user: req.body });
    // console.log(response);
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance) return res.status(400).json(error.message);
    if (error instanceof MongoError) return res.status(400).json(error.message);
    return res.status(500).json(error.message);
  }
};

const getUsers = async (req, res) => {
  const { filter } = req.body;
  // console.log(req.body);

  if (filter == null || filter == "" || filter == undefined) {
    return res.status(400).json({
      hasError: true,
      payload: {
        message: "Filter not found",
      },
    });
  }

  try {
    const response = await UsuarioService.getAllUsers({ filter });
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance) return res.status(400).json(error.message);
    if (error instanceof MongoError) return res.status(400).json(error.message);
    return res.status(404).json(error.message);
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  if (id == "" || id == undefined || id == null) {
    return res.status(400).json({
      hasError: true,
      payload: {
        message: "id not found",
      },
    });
  }

  try {
    const response = await UsuarioService.getUserById({ userId: id });
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance) return res.status(400).json(error.message);
    if (error instanceof MongoError) return res.status(400).json(error.message);
    return res.status(404).json(error.message);
  }
};

// const deleteLanguaje = async (req, res) => {
//   const { id } = req.params;

//   if (id == "" || id == undefined) {
//     return res.status(400).json();
//   }

//   try {
//     const response = await UsuarioService.deleteLanguage({ languageId: id });
//     return res.status(response.code).json(response);
//   } catch (error) {
//     if (error instanceof CustomAPIErrorInstance)
//       return res.status(400).json(error);
//     return res.status(500).json(error);
//   }
// };

const updateUser = async (req, res) => {
  const { id } = req.params;

  if (id == "" || id == undefined) {
    return res.status(400).json({
      hasError: true,
      payload: {
        message: "id not found",
      },
    });
  }

  try {
    const response = await UsuarioService.updateUser({
      userId: id,
      userCreated: req.body,
    });
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance) return res.status(400).json(error.message);
    if (error instanceof MongoError) return res.status(400).json(error.message);
    return res.status(404).json(error.message);
  }
};

const login = async (req, res) => {
  const { talentId, password } = req.body;
  try {
    const response = await UsuarioService.logInUser({
      credentials: { talentId, password },
    });
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance) return res.status(400).json(error.message);
    if (error instanceof MongoError) return res.status(400).json(error.message);
    return res.status(500).json(error.message);
  }
};

const logout = async (req, res) => {
  try {
    const response = await UsuarioService.logOutUser({ user: req.user });
    return res.status(response.code).json(response);
  } catch (error) {
    if (error instanceof CustomAPIErrorInstance) return res.status(400).json(error.message);
    if (error instanceof MongoError) return res.status(400).json(error.message);
    return res.status(500).json(error.message);
  }
};

module.exports = {
  addUser,
  getUserById,
  getUsers,
  updateUser,
  login,
  logout,
};
