const Curso = require('../../../domain/entities/Curso');

class GetAllCursos {
  constructor(cursoRepository) {
    this.cursoRepository = cursoRepository;
  }
  async execute() {
    return await this.cursoRepository.findAll();
  }
}

class GetCursoById {
  constructor(cursoRepository) {
    this.cursoRepository = cursoRepository;
  }
  async execute(id) {
    const curso = await this.cursoRepository.findById(id);
    if (!curso) throw new Error(`Curso con id ${id} no encontrado`);
    return curso;
  }
}

class CreateCurso {
  constructor(cursoRepository) {
    this.cursoRepository = cursoRepository;
  }
  async execute(data) {
    const curso = new Curso(data);
    if (!curso.esValido()) {
      throw new Error('Datos del curso inválidos. Verifica título y tecnología (java|docker)');
    }
    return await this.cursoRepository.create(data);
  }
}

class UpdateCurso {
  constructor(cursoRepository) {
    this.cursoRepository = cursoRepository;
  }
  async execute(id, data) {
    const existe = await this.cursoRepository.findById(id);
    if (!existe) throw new Error(`Curso con id ${id} no encontrado`);
    return await this.cursoRepository.update(id, data);
  }
}

class DeleteCurso {
  constructor(cursoRepository) {
    this.cursoRepository = cursoRepository;
  }
  async execute(id) {
    const existe = await this.cursoRepository.findById(id);
    if (!existe) throw new Error(`Curso con id ${id} no encontrado`);
    await this.cursoRepository.delete(id);
    return { message: 'Curso eliminado correctamente' };
  }
}

module.exports = { GetAllCursos, GetCursoById, CreateCurso, UpdateCurso, DeleteCurso };
