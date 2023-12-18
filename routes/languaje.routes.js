const {Router} = require('express');
const {languajeController} = require('../controllers');
const router = Router();

router.post('/', languajeController.getLanguages);
router.post('/create', languajeController.addLanguage);
router.get('/:id', languajeController.getLanguajeById);
router.put('/:id', languajeController.updateLanguaje);
router.delete('/:id', languajeController.deleteLanguaje);

module.exports = router;