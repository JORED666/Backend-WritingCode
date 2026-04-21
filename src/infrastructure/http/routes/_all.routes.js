const { Router } = require('express');
const leccionCtrl   = require('../controllers/leccionController');
const ejercicioCtrl = require('../controllers/ejercicioController');
const { evaluacionController, preguntaController, opcionController } = require('../controllers/evaluacionControllers');

const leccionRouter = Router();
leccionRouter.get('/',                          leccionCtrl.getAll);
leccionRouter.post('/',                         leccionCtrl.create);
leccionRouter.get('/:id',                       leccionCtrl.getById);
leccionRouter.put('/:id',                       leccionCtrl.update);
leccionRouter.delete('/:id',                    leccionCtrl.delete);
leccionRouter.get('/:id/ejercicios', ejercicioCtrl.getByLeccion);

const ejercicioRouter = Router();
ejercicioRouter.get('/',              ejercicioCtrl.getAll);
ejercicioRouter.post('/',             ejercicioCtrl.create);
ejercicioRouter.get('/:id',           ejercicioCtrl.getById);
ejercicioRouter.put('/:id',           ejercicioCtrl.update);
ejercicioRouter.delete('/:id',        ejercicioCtrl.delete);
ejercicioRouter.post('/:id/verificar', ejercicioCtrl.verificar);


const evaluacionRouter = Router();
evaluacionRouter.get('/',                             evaluacionController.getAll);
evaluacionRouter.post('/',                            evaluacionController.create);
evaluacionRouter.get('/:id',                          evaluacionController.getById);
evaluacionRouter.put('/:id',                          evaluacionController.update);
evaluacionRouter.delete('/:id',                       evaluacionController.delete);
evaluacionRouter.get('/:id_evaluacion/preguntas',     preguntaController.getByEvaluacion);

const preguntaRouter = Router();
preguntaRouter.get('/',                               preguntaController.getAll);
preguntaRouter.post('/',                              preguntaController.create);
preguntaRouter.get('/:id',                            preguntaController.getById);
preguntaRouter.put('/:id',                            preguntaController.update);
preguntaRouter.delete('/:id',                         preguntaController.delete);
preguntaRouter.get('/:id_pregunta/opciones',          opcionController.getByPregunta);

const opcionRouter = Router();
opcionRouter.post('/',          opcionController.create);
opcionRouter.put('/:id',        opcionController.update);
opcionRouter.delete('/:id',     opcionController.delete);

module.exports = {
  leccionRoutes:    leccionRouter,
  ejercicioRoutes:  ejercicioRouter,
  evaluacionRoutes: evaluacionRouter,
  preguntaRoutes:   preguntaRouter,
  opcionRoutes:     opcionRouter,
};
