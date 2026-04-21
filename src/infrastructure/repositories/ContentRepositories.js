const { pool } = require('../database/connection');
const { IModuloRepository, ILeccionRepository, IEjercicioRepository } = require('../../domain/repositories');

class ModuloRepository extends IModuloRepository {
  async findAll() {
    const { rows } = await pool.query('SELECT * FROM modulo ORDER BY id_curso, orden');
    return rows;
  }
  async findById(id) {
    const { rows } = await pool.query('SELECT * FROM modulo WHERE id_modulo = $1', [id]);
    return rows[0] || null;
  }
  async findByCurso(id_curso) {
    const { rows } = await pool.query(
      'SELECT * FROM modulo WHERE id_curso = $1 ORDER BY orden', [id_curso]
    );
    return rows;
  }
  async create({ id_curso, titulo, orden }) {
    const { rows } = await pool.query(
      'INSERT INTO modulo (id_curso, titulo, orden) VALUES ($1,$2,$3) RETURNING *',
      [id_curso, titulo, orden]
    );
    return rows[0];
  }
  async update(id, { titulo, orden }) {
    const { rows } = await pool.query(
      `UPDATE modulo SET titulo=COALESCE($1,titulo), orden=COALESCE($2,orden)
       WHERE id_modulo=$3 RETURNING *`,
      [titulo, orden, id]
    );
    return rows[0];
  }
  async delete(id) {
    await pool.query('DELETE FROM modulo WHERE id_modulo = $1', [id]);
  }
}

class LeccionRepository extends ILeccionRepository {
  async findAll() {
    const { rows } = await pool.query('SELECT * FROM leccion ORDER BY id_modulo, orden');
    return rows;
  }
  async findById(id) {
    const { rows } = await pool.query('SELECT * FROM leccion WHERE id_leccion = $1', [id]);
    return rows[0] || null;
  }
  async findByModulo(id_modulo) {
    const { rows } = await pool.query(
      'SELECT * FROM leccion WHERE id_modulo = $1 ORDER BY orden', [id_modulo]
    );
    return rows;
  }
  async create({ id_modulo, titulo, tipo, orden }) {
    const { rows } = await pool.query(
      'INSERT INTO leccion (id_modulo, titulo, tipo, orden) VALUES ($1,$2,$3,$4) RETURNING *',
      [id_modulo, titulo, tipo, orden]
    );
    return rows[0];
  }
  async update(id, { titulo, tipo, orden }) {
    const { rows } = await pool.query(
      `UPDATE leccion SET titulo=COALESCE($1,titulo), tipo=COALESCE($2,tipo),
       orden=COALESCE($3,orden) WHERE id_leccion=$4 RETURNING *`,
      [titulo, tipo, orden, id]
    );
    return rows[0];
  }
  async delete(id) {
    await pool.query('DELETE FROM leccion WHERE id_leccion = $1', [id]);
  }
}

class EjercicioRepository extends IEjercicioRepository {
  async findAll() {
    const { rows } = await pool.query('SELECT * FROM ejercicio');
    return rows;
  }
  async findById(id) {
    const { rows } = await pool.query('SELECT * FROM ejercicio WHERE id_ejercicio = $1', [id]);
    return rows[0] || null;
  }
  async findByLeccion(id_leccion) {
    const { rows } = await pool.query(
      'SELECT * FROM ejercicio WHERE id_leccion = $1', [id_leccion]
    );
    return rows;
  }
  async create({ id_leccion, instrucciones, resultado_esperado }) {
    const { rows } = await pool.query(
      'INSERT INTO ejercicio (id_leccion, instrucciones, resultado_esperado) VALUES ($1,$2,$3) RETURNING *',
      [id_leccion, instrucciones, resultado_esperado]
    );
    return rows[0];
  }
  async update(id, { instrucciones, resultado_esperado }) {
    const { rows } = await pool.query(
      `UPDATE ejercicio SET instrucciones=COALESCE($1,instrucciones),
       resultado_esperado=COALESCE($2,resultado_esperado) WHERE id_ejercicio=$3 RETURNING *`,
      [instrucciones, resultado_esperado, id]
    );
    return rows[0];
  }
  async delete(id) {
    await pool.query('DELETE FROM ejercicio WHERE id_ejercicio = $1', [id]);
  }
}

module.exports = { ModuloRepository, LeccionRepository, EjercicioRepository };
