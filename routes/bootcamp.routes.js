const {Router} = require('express');
const { BootcampController } = require('../controllers');
const router = Router();


router.post('/', BootcampController.getBootcamps);
router.post('/create', BootcampController.addBootcamp);
router.delete('/:id', BootcampController.deleteBootcamp);
router.get('/:id', BootcampController.getBootcampById);
router.put('/:id', BootcampController.updateBootcamp);

module.exports = router;