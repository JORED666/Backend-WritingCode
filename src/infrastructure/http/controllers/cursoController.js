const {
  GetAllCursos,
  GetCursoById,
  CreateCurso,
  UpdateCurso,
  DeleteCurso,
} = require('../../../application/use-cases/curso');
const CursoRepository = require('../../repositories/CursoRepository');

const repo = new CursoRepository();

const cursoController = {
  async getAll(req, res, next) {
    try {
      const cursos = await new GetAllCursos(repo).execute();
      res.json({ success: true, data: cursos });
    } catch (err) { next(err); }
  },

  async getById(req, res, next) {
    try {
      const curso = await new GetCursoById(repo).execute(req.params.id);
      res.json({ success: true, data: curso });
    } catch (err) { next(err); }
  },

  async create(req, res, next) {
    try {
      const curso = await new CreateCurso(repo).execute(req.body);
      res.status(201).json({ success: true, data: curso });
    } catch (err) { next(err); }
  },

  async update(req, res, next) {
    try {
      const curso = await new UpdateCurso(repo).execute(req.params.id, req.body);
      res.json({ success: true, data: curso });
    } catch (err) { next(err); }
  },

  async delete(req, res, next) {
    try {
      const result = await new DeleteCurso(repo).execute(req.params.id);
      res.json({ success: true, ...result });
    } catch (err) { next(err); }
  },
};

module.exports = cursoController;
