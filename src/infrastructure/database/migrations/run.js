require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { pool } = require('../connection');

async function runMigration() {
  const sql = fs.readFileSync(
    path.join(__dirname, 'schema.sql'),
    'utf-8'
  );
  const client = await pool.connect();
  try {
    console.log('⏳ Ejecutando migración...');
    await client.query(sql);
    console.log('✅ Migración completada exitosamente');
  } catch (err) {
    console.error('❌ Error en migración:', err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigration();
