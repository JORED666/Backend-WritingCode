const { pool } = require('../database/connection');
const { ICursoRepository } = require('../../domain/repositories');

class CursoRepository extends ICursoRepository {
  async findAll() {
    const { rows } = await pool.query(
      'SELECT * FROM curso ORDER BY id_curso'
    );
    return rows;
  }

  async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM curso WHERE id_curso = $1',
      [id]
    );
    return rows[0] || null;
  }

  async create({ titulo, descripcion, tecnologia }) {
    const { rows } = await pool.query(
      `INSERT INTO curso (titulo, descripcion, tecnologia)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [titulo, descripcion, tecnologia]
    );
    return rows[0];
  }

  async update(id, { titulo, descripcion, tecnologia }) {
    const { rows } = await pool.query(
      `UPDATE curso
       SET titulo = COALESCE($1, titulo),
           descripcion = COALESCE($2, descripcion),
           tecnologia = COALESCE($3, tecnologia)
       WHERE id_curso = $4
       RETURNING *`,
      [titulo, descripcion, tecnologia, id]
    );
    return rows[0];
  }

  async delete(id) {
    await pool.query('DELETE FROM curso WHERE id_curso = $1', [id]);
  }
}

module.exports = CursoRepository;
