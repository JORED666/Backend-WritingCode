const Ejercicio = require('../../../domain/entities/Ejercicio');

class GetAllEjercicios {
  constructor(repo) { this.repo = repo; }
  async execute() { return await this.repo.findAll(); }
}

class GetEjercicioById {
  constructor(repo) { this.repo = repo; }
  async execute(id) {
    const ej = await this.repo.findById(id);
    if (!ej) throw new Error(`Ejercicio con id ${id} no encontrado`);
    return ej;
  }
}

class GetEjerciciosByLeccion {
  constructor(repo) { this.repo = repo; }
  async execute(id_leccion) {
    return await this.repo.findByLeccion(id_leccion);
  }
}

class CreateEjercicio {
  constructor(repo) { this.repo = repo; }
  async execute(data) {
    const ej = new Ejercicio(data);
    if (!ej.esValido()) throw new Error('Datos del ejercicio inválidos');
    return await this.repo.create(data);
  }
}

class UpdateEjercicio {
  constructor(repo) { this.repo = repo; }
  async execute(id, data) {
    const existe = await this.repo.findById(id);
    if (!existe) throw new Error(`Ejercicio con id ${id} no encontrado`);
    return await this.repo.update(id, data);
  }
}

class DeleteEjercicio {
  constructor(repo) { this.repo = repo; }
  async execute(id) {
    const existe = await this.repo.findById(id);
    if (!existe) throw new Error(`Ejercicio con id ${id} no encontrado`);
    await this.repo.delete(id);
    return { message: 'Ejercicio eliminado correctamente' };
  }
}

class VerificarRespuesta {
  constructor(repo) { this.repo = repo; }
  async execute(id_ejercicio, respuestaEstudiante) {
    const raw = await this.repo.findById(id_ejercicio);
    if (!raw) throw new Error(`Ejercicio con id ${id_ejercicio} no encontrado`);

    const ejercicio = new Ejercicio(raw);
    const esCorrecto = ejercicio.verificarRespuesta(respuestaEstudiante);

    return {
      id_ejercicio,
      es_correcto: esCorrecto,
      mensaje: esCorrecto
        ? '¡Excelente! Respuesta correcta 🎉'
        : 'Respuesta incorrecta, inténtalo de nuevo 💪',
    };
  }
}

module.exports = {
  GetAllEjercicios,
  GetEjercicioById,
  GetEjerciciosByLeccion,
  CreateEjercicio,
  UpdateEjercicio,
  DeleteEjercicio,
  VerificarRespuesta,
};
