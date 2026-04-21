const {
  GetAllModulos,
  GetModuloById,
  GetModulosByCurso,
  CreateModulo,
  UpdateModulo,
  DeleteModulo,
} = require('../../../application/use-cases/shared');
const { ModuloRepository } = require('../../repositories/ContentRepositories');

const repo = new ModuloRepository();

const moduloController = {
  async getAll(req, res, next) {
    try {
      const data = await new GetAllModulos(repo).execute();
      res.json({ success: true, data });
    } catch (err) { next(err); }
  },

  async getById(req, res, next) {
    try {
      const data = await new GetModuloById(repo).execute(req.params.id);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  },

  async getByCurso(req, res, next) {
    try {
      const data = await new GetModulosByCurso(repo).execute(req.params.id);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  },

  async create(req, res, next) {
    try {
      const data = await new CreateModulo(repo).execute(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) { next(err); }
  },

  async update(req, res, next) {
    try {
      const data = await new UpdateModulo(repo).execute(req.params.id, req.body);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  },

  async delete(req, res, next) {
    try {
      const result = await new DeleteModulo(repo).execute(req.params.id);
      res.json({ success: true, ...result });
    } catch (err) { next(err); }
  },
};

module.exports = moduloController;
