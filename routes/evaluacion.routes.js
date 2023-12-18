const {Router} = require('express');
const {evaluacionController} = require('../controllers');
const router = Router();

router.post('/regimen-etico', evaluacionController.addRegimenEtico);

router.post('/logro-metas', evaluacionController.addLogroMetas);

router.post('/aspecto-mejora', evaluacionController.addAsPectoMejora);


module.exports = router;