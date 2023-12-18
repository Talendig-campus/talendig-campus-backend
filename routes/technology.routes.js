const {Router} = require('express');
const {technologyController} = require('../controllers');
// const {isInstructor} = require("../middlewares/userAccess");  
// const auth = require("../middlewares/auth");  
const router = Router();

router.post('/', technologyController.getTechnologies);
router.post('/create', technologyController.addTechnology);
router.get('/:id', technologyController.getTechnologyById);
router.delete('/:id', technologyController.deleteTechnology);
router.put('/:id', technologyController.updateTechnology);

module.exports = router;