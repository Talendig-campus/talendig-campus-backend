const {Router} = require('express');
const {accessLevelController} = require('../controllers');
const router = Router();

router.post('/', accessLevelController.getAccessLevels);
router.post('/create', accessLevelController.addAccessLevel);
router.get('/:id', accessLevelController.getAccessLevelById);
router.delete('/:id', accessLevelController.deleteAccessLevel);

module.exports = router;