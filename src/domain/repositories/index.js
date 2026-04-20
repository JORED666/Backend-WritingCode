/**
 * DOMINIO - Puerto (Interfaz) ICursoRepository
 *
 * Define el contrato que cualquier implementación de repositorio
 * de Curso debe cumplir. El dominio nunca importa pg, mongoose, etc.
 * Solo conoce esta interfaz.
 */
class ICursoRepository {
  async findAll()         { throw new Error('Not implemented'); }
  async findById(id)      { throw new Error('Not implemented'); }
  async create(data)      { throw new Error('Not implemented'); }
  async update(id, data)  { throw new Error('Not implemented'); }
  async delete(id)        { throw new Error('Not implemented'); }
}

class IModuloRepository {
  async findAll()              { throw new Error('Not implemented'); }
  async findById(id)           { throw new Error('Not implemented'); }
  async findByCurso(id_curso)  { throw new Error('Not implemented'); }
  async create(data)           { throw new Error('Not implemented'); }
  async update(id, data)       { throw new Error('Not implemented'); }
  async delete(id)             { throw new Error('Not implemented'); }
}

class ILeccionRepository {
  async findAll()                { throw new Error('Not implemented'); }
  async findById(id)             { throw new Error('Not implemented'); }
  async findByModulo(id_modulo)  { throw new Error('Not implemented'); }
  async create(data)             { throw new Error('Not implemented'); }
  async update(id, data)         { throw new Error('Not implemented'); }
  async delete(id)               { throw new Error('Not implemented'); }
}

class IEjercicioRepository {
  async findAll()                 { throw new Error('Not implemented'); }
  async findById(id)              { throw new Error('Not implemented'); }
  async findByLeccion(id_leccion) { throw new Error('Not implemented'); }
  async create(data)              { throw new Error('Not implemented'); }
  async update(id, data)          { throw new Error('Not implemented'); }
  async delete(id)                { throw new Error('Not implemented'); }
}

class IEvaluacionRepository {
  async findAll()                { throw new Error('Not implemented'); }
  async findById(id)             { throw new Error('Not implemented'); }
  async findByModulo(id_modulo)  { throw new Error('Not implemented'); }
  async create(data)             { throw new Error('Not implemented'); }
  async update(id, data)         { throw new Error('Not implemented'); }
  async delete(id)               { throw new Error('Not implemented'); }
}

class IPreguntaRepository {
  async findAll()                      { throw new Error('Not implemented'); }
  async findById(id)                   { throw new Error('Not implemented'); }
  async findByEvaluacion(id_eval)      { throw new Error('Not implemented'); }
  async create(data)                   { throw new Error('Not implemented'); }
  async update(id, data)               { throw new Error('Not implemented'); }
  async delete(id)                     { throw new Error('Not implemented'); }
}

class IOpcionRepository {
  async findAll()                    { throw new Error('Not implemented'); }
  async findById(id)                 { throw new Error('Not implemented'); }
  async findByPregunta(id_pregunta)  { throw new Error('Not implemented'); }
  async create(data)                 { throw new Error('Not implemented'); }
  async update(id, data)             { throw new Error('Not implemented'); }
  async delete(id)                   { throw new Error('Not implemented'); }
}

module.exports = {
  ICursoRepository,
  IModuloRepository,
  ILeccionRepository,
  IEjercicioRepository,
  IEvaluacionRepository,
  IPreguntaRepository,
  IOpcionRepository,
};
