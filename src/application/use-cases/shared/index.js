const Modulo = require('../../../domain/entities/Modulo');

class GetAllModulos {
  constructor(repo) { this.repo = repo; }
  async execute() { return await this.repo.findAll(); }
}
class GetModuloById {
  constructor(repo) { this.repo = repo; }
  async execute(id) {
    const m = await this.repo.findById(id);
    if (!m) throw new Error(`Módulo ${id} no encontrado`);
    return m;
  }
}
class GetModulosByCurso {
  constructor(repo) { this.repo = repo; }
  async execute(id_curso) { return await this.repo.findByCurso(id_curso); }
}
class CreateModulo {
  constructor(repo) { this.repo = repo; }
  async execute(data) {
    const m = new Modulo(data);
    if (!m.esValido()) throw new Error('Datos del módulo inválidos');
    return await this.repo.create(data);
  }
}
class UpdateModulo {
  constructor(repo) { this.repo = repo; }
  async execute(id, data) {
    const existe = await this.repo.findById(id);
    if (!existe) throw new Error(`Módulo ${id} no encontrado`);
    return await this.repo.update(id, data);
  }
}
class DeleteModulo {
  constructor(repo) { this.repo = repo; }
  async execute(id) {
    const existe = await this.repo.findById(id);
    if (!existe) throw new Error(`Módulo ${id} no encontrado`);
    await this.repo.delete(id);
    return { message: 'Módulo eliminado' };
  }
}

const Leccion = require('../../../domain/entities/Leccion');

class GetAllLecciones {
  constructor(repo) { this.repo = repo; }
  async execute() { return await this.repo.findAll(); }
}
class GetLeccionById {
  constructor(repo) { this.repo = repo; }
  async execute(id) {
    const l = await this.repo.findById(id);
    if (!l) throw new Error(`Lección ${id} no encontrada`);
    return l;
  }
}
class GetLeccionesByModulo {
  constructor(repo) { this.repo = repo; }
  async execute(id_modulo) { return await this.repo.findByModulo(id_modulo); }
}
class CreateLeccion {
  constructor(repo) { this.repo = repo; }
  async execute(data) {
    const l = new Leccion(data);
    if (!l.esValido()) throw new Error('Datos de la lección inválidos. Tipo debe ser: teoria|practica');
    return await this.repo.create(data);
  }
}
class UpdateLeccion {
  constructor(repo) { this.repo = repo; }
  async execute(id, data) {
    const existe = await this.repo.findById(id);
    if (!existe) throw new Error(`Lección ${id} no encontrada`);
    return await this.repo.update(id, data);
  }
}
class DeleteLeccion {
  constructor(repo) { this.repo = repo; }
  async execute(id) {
    const existe = await this.repo.findById(id);
    if (!existe) throw new Error(`Lección ${id} no encontrada`);
    await this.repo.delete(id);
    return { message: 'Lección eliminada' };
  }
}
class GetNavegacionLeccion {
  constructor(repo) { this.repo = repo; }
  async execute(id) {
    const leccion = await this.repo.findById(id);
    if (!leccion) throw new Error(`Lección ${id} no encontrada`);

    const lecciones = await this.repo.findByModulo(leccion.id_modulo);
    const idx = lecciones.findIndex(l => l.id_leccion === parseInt(id));

    return {
      actual:    leccion,
      anterior:  idx > 0 ? lecciones[idx - 1] : null,
      siguiente: idx < lecciones.length - 1 ? lecciones[idx + 1] : null,
    };
  }
}
module.exports = {
  GetAllModulos, GetModuloById, GetModulosByCurso, CreateModulo, UpdateModulo, DeleteModulo,
  GetAllLecciones, GetLeccionById, GetLeccionesByModulo, CreateLeccion, UpdateLeccion, DeleteLeccion,
  GetNavegacionLeccion,
};