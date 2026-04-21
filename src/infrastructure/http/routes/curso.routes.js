const { Router } = require('express');
const ctrl = require('../controllers/cursoController');
const moduloCtrl = require('../controllers/moduloController');

const router = Router();

router.get('/',                        ctrl.getAll);
router.post('/',                       ctrl.create);
router.get('/:id',                     ctrl.getById);
router.put('/:id',                     ctrl.update);
router.delete('/:id',                  ctrl.delete);
router.get('/:id/modulos',             moduloCtrl.getByCurso);

module.exports = router;
