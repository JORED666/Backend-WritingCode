const { Evaluacion, Pregunta, Opcion } = require('../../../domain/entities/EvaluacionEntities');

class GetAllEvaluaciones {
  constructor(repo) { this.repo = repo; }
  async execute() { return await this.repo.findAll(); }
}
class GetEvaluacionById {
  constructor(repo) { this.repo = repo; }
  async execute(id) {
    const e = await this.repo.findById(id);
    if (!e) throw new Error(`Evaluación ${id} no encontrada`);
    return e;
  }
}
class GetEvaluacionesByModulo {
  constructor(repo) { this.repo = repo; }
  async execute(id_modulo) { return await this.repo.findByModulo(id_modulo); }
}
class CreateEvaluacion {
  constructor(repo) { this.repo = repo; }
  async execute(data) {
    const e = new Evaluacion(data);
    if (!e.esValido()) throw new Error('Datos de la evaluación inválidos');
    return await this.repo.create(data);
  }
}
class UpdateEvaluacion {
  constructor(repo) { this.repo = repo; }
  async execute(id, data) {
    const existe = await this.repo.findById(id);
    if (!existe) throw new Error(`Evaluación ${id} no encontrada`);
    return await this.repo.update(id, data);
  }
}
class DeleteEvaluacion {
  constructor(repo) { this.repo = repo; }
  async execute(id) {
    const existe = await this.repo.findById(id);
    if (!existe) throw new Error(`Evaluación ${id} no encontrada`);
    await this.repo.delete(id);
    return { message: 'Evaluación eliminada' };
  }
}

class GetAllPreguntas {
  constructor(repo) { this.repo = repo; }
  async execute() { return await this.repo.findAll(); }
}
class GetPreguntaById {
  constructor(repo) { this.repo = repo; }
  async execute(id) {
    const p = await this.repo.findById(id);
    if (!p) throw new Error(`Pregunta ${id} no encontrada`);
    return p;
  }
}
class GetPreguntasByEvaluacion {
  constructor(repo) { this.repo = repo; }
  async execute(id_evaluacion) { return await this.repo.findByEvaluacion(id_evaluacion); }
}
class CreatePregunta {
  constructor(repo) { this.repo = repo; }
  async execute(data) {
    const p = new Pregunta(data);
    if (!p.esValida()) throw new Error('Datos de la pregunta inválidos');
    return await this.repo.create(data);
  }
}
class UpdatePregunta {
  constructor(repo) { this.repo = repo; }
  async execute(id, data) {
    const existe = await this.repo.findById(id);
    if (!existe) throw new Error(`Pregunta ${id} no encontrada`);
    return await this.repo.update(id, data);
  }
}
class DeletePregunta {
  constructor(repo) { this.repo = repo; }
  async execute(id) {
    const existe = await this.repo.findById(id);
    if (!existe) throw new Error(`Pregunta ${id} no encontrada`);
    await this.repo.delete(id);
    return { message: 'Pregunta eliminada' };
  }
}

class GetOpcionesByPregunta {
  constructor(repo) { this.repo = repo; }
  async execute(id_pregunta) { return await this.repo.findByPregunta(id_pregunta); }
}
class CreateOpcion {
  constructor(repo) { this.repo = repo; }
  async execute(data) {
    const o = new Opcion(data);
    if (!o.esValida()) throw new Error('Datos de la opción inválidos');
    return await this.repo.create(data);
  }
}
class UpdateOpcion {
  constructor(repo) { this.repo = repo; }
  async execute(id, data) {
    const existe = await this.repo.findById(id);
    if (!existe) throw new Error(`Opción ${id} no encontrada`);
    return await this.repo.update(id, data);
  }
}
class DeleteOpcion {
  constructor(repo) { this.repo = repo; }
  async execute(id) {
    const existe = await this.repo.findById(id);
    if (!existe) throw new Error(`Opción ${id} no encontrada`);
    await this.repo.delete(id);
    return { message: 'Opción eliminada' };
  }
}

module.exports = {
  GetAllEvaluaciones, GetEvaluacionById, GetEvaluacionesByModulo,
  CreateEvaluacion, UpdateEvaluacion, DeleteEvaluacion,
  GetAllPreguntas, GetPreguntaById, GetPreguntasByEvaluacion,
  CreatePregunta, UpdatePregunta, DeletePregunta,
  GetOpcionesByPregunta, CreateOpcion, UpdateOpcion, DeleteOpcion,
};
