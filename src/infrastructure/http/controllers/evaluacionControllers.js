const {
  GetAllEvaluaciones, GetEvaluacionById, GetEvaluacionesByModulo,
  CreateEvaluacion, UpdateEvaluacion, DeleteEvaluacion,
  GetAllPreguntas, GetPreguntaById, GetPreguntasByEvaluacion,
  CreatePregunta, UpdatePregunta, DeletePregunta,
  GetOpcionesByPregunta, CreateOpcion, UpdateOpcion, DeleteOpcion,
} = require('../../../application/use-cases/evaluacion');
const { EvaluacionRepository, PreguntaRepository, OpcionRepository } = require('../../repositories/EvaluacionRepositories');

const evalRepo    = new EvaluacionRepository();
const pregRepo    = new PreguntaRepository();
const opcionRepo  = new OpcionRepository();

const evaluacionController = {
  async getAll(req, res, next) {
    try { res.json({ success: true, data: await new GetAllEvaluaciones(evalRepo).execute() }); }
    catch (err) { next(err); }
  },
  async getById(req, res, next) {
    try { res.json({ success: true, data: await new GetEvaluacionById(evalRepo).execute(req.params.id) }); }
    catch (err) { next(err); }
  },
  async getByModulo(req, res, next) {
    try { res.json({ success: true, data: await new GetEvaluacionesByModulo(evalRepo).execute(req.params.id_modulo) }); }
    catch (err) { next(err); }
  },
  async create(req, res, next) {
    try { res.status(201).json({ success: true, data: await new CreateEvaluacion(evalRepo).execute(req.body) }); }
    catch (err) { next(err); }
  },
  async update(req, res, next) {
    try { res.json({ success: true, data: await new UpdateEvaluacion(evalRepo).execute(req.params.id, req.body) }); }
    catch (err) { next(err); }
  },
  async delete(req, res, next) {
    try { res.json({ success: true, ...await new DeleteEvaluacion(evalRepo).execute(req.params.id) }); }
    catch (err) { next(err); }
  },
};

const preguntaController = {
  async getAll(req, res, next) {
    try { res.json({ success: true, data: await new GetAllPreguntas(pregRepo).execute() }); }
    catch (err) { next(err); }
  },
  async getById(req, res, next) {
    try { res.json({ success: true, data: await new GetPreguntaById(pregRepo).execute(req.params.id) }); }
    catch (err) { next(err); }
  },
  async getByEvaluacion(req, res, next) {
    try { res.json({ success: true, data: await new GetPreguntasByEvaluacion(pregRepo).execute(req.params.id_evaluacion) }); }
    catch (err) { next(err); }
  },
  async create(req, res, next) {
    try { res.status(201).json({ success: true, data: await new CreatePregunta(pregRepo).execute(req.body) }); }
    catch (err) { next(err); }
  },
  async update(req, res, next) {
    try { res.json({ success: true, data: await new UpdatePregunta(pregRepo).execute(req.params.id, req.body) }); }
    catch (err) { next(err); }
  },
  async delete(req, res, next) {
    try { res.json({ success: true, ...await new DeletePregunta(pregRepo).execute(req.params.id) }); }
    catch (err) { next(err); }
  },
};

const opcionController = {
  async getByPregunta(req, res, next) {
    try { res.json({ success: true, data: await new GetOpcionesByPregunta(opcionRepo).execute(req.params.id_pregunta) }); }
    catch (err) { next(err); }
  },
  async create(req, res, next) {
    try { res.status(201).json({ success: true, data: await new CreateOpcion(opcionRepo).execute(req.body) }); }
    catch (err) { next(err); }
  },
  async update(req, res, next) {
    try { res.json({ success: true, data: await new UpdateOpcion(opcionRepo).execute(req.params.id, req.body) }); }
    catch (err) { next(err); }
  },
  async delete(req, res, next) {
    try { res.json({ success: true, ...await new DeleteOpcion(opcionRepo).execute(req.params.id) }); }
    catch (err) { next(err); }
  },
};

module.exports = { evaluacionController, preguntaController, opcionController };
