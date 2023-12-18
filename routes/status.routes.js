const {Router} = require('express');
const {statusController} = require('../controllers');
const router = Router();

router.post('/', statusController.getAllStatus);
router.post('/create', statusController.addStatus);
router.get('/:id', statusController.getStatussLevelById);
router.put('/:id', statusController.updateStatus);
router.delete('/:id', statusController.deleteStatus);

module.exports = router;