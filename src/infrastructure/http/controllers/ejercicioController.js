const {
  GetAllEjercicios,
  GetEjercicioById,
  GetEjerciciosByLeccion,
  CreateEjercicio,
  UpdateEjercicio,
  DeleteEjercicio,
  VerificarRespuesta,
} = require('../../../application/use-cases/ejercicio');
const { EjercicioRepository } = require('../../repositories/ContentRepositories');

const repo = new EjercicioRepository();

const ejercicioController = {
  async getAll(req, res, next) {
    try {
      const data = await new GetAllEjercicios(repo).execute();
      res.json({ success: true, data });
    } catch (err) { next(err); }
  },

  async getById(req, res, next) {
    try {
      const data = await new GetEjercicioById(repo).execute(req.params.id);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  },

  async getByLeccion(req, res, next) {
    try {
      const data = await new GetEjerciciosByLeccion(repo).execute(req.params.id);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  },

  async create(req, res, next) {
    try {
      const data = await new CreateEjercicio(repo).execute(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) { next(err); }
  },

  async update(req, res, next) {
    try {
      const data = await new UpdateEjercicio(repo).execute(req.params.id, req.body);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  },

  async delete(req, res, next) {
    try {
      const result = await new DeleteEjercicio(repo).execute(req.params.id);
      res.json({ success: true, ...result });
    } catch (err) { next(err); }
  },

  async verificar(req, res, next) {
    try {
      const { respuesta } = req.body;
      if (!respuesta) {
        return res.status(400).json({ success: false, message: 'El campo "respuesta" es requerido' });
      }
      const result = await new VerificarRespuesta(repo).execute(req.params.id, respuesta);
      res.json({ success: true, data: result });
    } catch (err) { next(err); }
  },
};

module.exports = ejercicioController;
