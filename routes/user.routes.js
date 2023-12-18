const {Router} = require('express');
const {UserController} = require('../controllers');
const auth = require("../middlewares/auth");
const router = Router();

router.post('/',  UserController.getUsers);
router.post('/create', UserController.addUser);
router.post('/login', UserController.login);
router.post('/logout', auth, UserController.logout);
router.get('/:id', auth, UserController.getUserById);
router.put('/:id', auth , UserController.updateUser);

module.exports = router;