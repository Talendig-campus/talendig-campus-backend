const {Router} = require('express');
const {CurriculumService} = require('../controllers');
const router = Router();

router.get('/:id', CurriculumService.getCurriculum);

module.exports = router;