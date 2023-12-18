const {Router} = require('express');
const { ClassController } = require('../controllers');
const router = Router();


router.post('/', ClassController.getClasses);
router.post('/create', ClassController.addClass);
router.delete('/:id', ClassController.deleteClass);
router.get('/:id', ClassController.getClassById);
router.put('/:id', ClassController.updateClass);

module.exports = router;