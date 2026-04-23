const {
  GetAllLecciones,
  GetLeccionById,
  GetLeccionesByModulo,
  CreateLeccion,
  UpdateLeccion,
  DeleteLeccion,
  GetNavegacionLeccion,
} = require('../../../application/use-cases/shared');
const { LeccionRepository } = require('../../repositories/ContentRepositories');

const repo = new LeccionRepository();

const leccionController = {
  async getAll(req, res, next) {
    try {
      const data = await new GetAllLecciones(repo).execute();
      res.json({ success: true, data });
    } catch (err) { next(err); }
  },

  async getById(req, res, next) {
    try {
      const data = await new GetLeccionById(repo).execute(req.params.id);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  },

  async getByModulo(req, res, next) {
    try {
      const data = await new GetLeccionesByModulo(repo).execute(req.params.id);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  },

  async create(req, res, next) {
    try {
      const data = await new CreateLeccion(repo).execute(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) { next(err); }
  },

  async update(req, res, next) {
    try {
      const data = await new UpdateLeccion(repo).execute(req.params.id, req.body);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  },

  async delete(req, res, next) {
    try {
      const result = await new DeleteLeccion(repo).execute(req.params.id);
      res.json({ success: true, ...result });
    } catch (err) { next(err); }
  },

  async getNavegacion(req, res, next) {
    try {
      const data = await new GetNavegacionLeccion(repo).execute(req.params.id);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  },
};

module.exports = leccionController;