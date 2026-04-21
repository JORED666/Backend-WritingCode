const { Router } = require('express');
const ctrl = require('../controllers/moduloController');
const leccionCtrl = require('../controllers/leccionController');
const { evaluacionController } = require('../controllers/evaluacionControllers');

const router = Router();

router.get('/',                          ctrl.getAll);
router.post('/',                         ctrl.create);
router.get('/:id',                       ctrl.getById);
router.put('/:id',                       ctrl.update);
router.delete('/:id',                    ctrl.delete);
router.get('/:id/lecciones',    leccionCtrl.getByModulo);
router.get('/:id/evaluaciones', evaluacionController.getByModulo);

module.exports = router;
