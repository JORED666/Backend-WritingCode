const { pool } = require('../database/connection');
const { IEvaluacionRepository, IPreguntaRepository, IOpcionRepository } = require('../../domain/repositories');

class EvaluacionRepository extends IEvaluacionRepository {
  async findAll() {
    const { rows } = await pool.query('SELECT * FROM evaluacion');
    return rows;
  }
  async findById(id) {
    const { rows } = await pool.query('SELECT * FROM evaluacion WHERE id_evaluacion = $1', [id]);
    return rows[0] || null;
  }
  async findByModulo(id_modulo) {
    const { rows } = await pool.query(
      'SELECT * FROM evaluacion WHERE id_modulo = $1', [id_modulo]
    );
    return rows;
  }
  async create({ id_modulo, titulo, total_preguntas }) {
    const { rows } = await pool.query(
      'INSERT INTO evaluacion (id_modulo, titulo, total_preguntas) VALUES ($1,$2,$3) RETURNING *',
      [id_modulo, titulo, total_preguntas || 0]
    );
    return rows[0];
  }
  async update(id, { titulo, total_preguntas }) {
    const { rows } = await pool.query(
      `UPDATE evaluacion SET titulo=COALESCE($1,titulo),
       total_preguntas=COALESCE($2,total_preguntas) WHERE id_evaluacion=$3 RETURNING *`,
      [titulo, total_preguntas, id]
    );
    return rows[0];
  }
  async delete(id) {
    await pool.query('DELETE FROM evaluacion WHERE id_evaluacion = $1', [id]);
  }
}

class PreguntaRepository extends IPreguntaRepository {
  async findAll() {
    const { rows } = await pool.query('SELECT * FROM pregunta');
    return rows;
  }
  async findById(id) {
    const { rows } = await pool.query('SELECT * FROM pregunta WHERE id_pregunta = $1', [id]);
    return rows[0] || null;
  }
  async findByEvaluacion(id_evaluacion) {
    const { rows } = await pool.query(
      'SELECT * FROM pregunta WHERE id_evaluacion = $1', [id_evaluacion]
    );
    return rows;
  }
  async create({ id_evaluacion, enunciado }) {
    const { rows } = await pool.query(
      'INSERT INTO pregunta (id_evaluacion, enunciado) VALUES ($1,$2) RETURNING *',
      [id_evaluacion, enunciado]
    );
    return rows[0];
  }
  async update(id, { enunciado }) {
    const { rows } = await pool.query(
      'UPDATE pregunta SET enunciado=COALESCE($1,enunciado) WHERE id_pregunta=$2 RETURNING *',
      [enunciado, id]
    );
    return rows[0];
  }
  async delete(id) {
    await pool.query('DELETE FROM pregunta WHERE id_pregunta = $1', [id]);
  }
}

class OpcionRepository extends IOpcionRepository {
  async findAll() {
    const { rows } = await pool.query('SELECT * FROM opcion');
    return rows;
  }
  async findById(id) {
    const { rows } = await pool.query('SELECT * FROM opcion WHERE id_opcion = $1', [id]);
    return rows[0] || null;
  }
  async findByPregunta(id_pregunta) {
    const { rows } = await pool.query(
      'SELECT * FROM opcion WHERE id_pregunta = $1', [id_pregunta]
    );
    return rows;
  }
  async create({ id_pregunta, texto_opcion, es_correcta }) {
    const { rows } = await pool.query(
      'INSERT INTO opcion (id_pregunta, texto_opcion, es_correcta) VALUES ($1,$2,$3) RETURNING *',
      [id_pregunta, texto_opcion, es_correcta || false]
    );
    return rows[0];
  }
  async update(id, { texto_opcion, es_correcta }) {
    const { rows } = await pool.query(
      `UPDATE opcion SET texto_opcion=COALESCE($1,texto_opcion),
       es_correcta=COALESCE($2,es_correcta) WHERE id_opcion=$3 RETURNING *`,
      [texto_opcion, es_correcta, id]
    );
    return rows[0];
  }
  async delete(id) {
    await pool.query('DELETE FROM opcion WHERE id_opcion = $1', [id]);
  }
}

module.exports = { EvaluacionRepository, PreguntaRepository, OpcionRepository };
