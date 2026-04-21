const { Router } = require('express');
const ctrl = require('../controllers/dockerHubController');

const router = Router();

router.get('/popular',    ctrl.getImagenesPopulares);
router.get('/:imagen',    ctrl.getImageInfo);

module.exports = router;
