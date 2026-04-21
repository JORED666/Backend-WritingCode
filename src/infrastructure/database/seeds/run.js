require('dotenv').config();
const { pool } = require('../connection');

async function seed() {
  const client = await pool.connect();
  try {
    console.log('🌱 Insertando datos de prueba...');

    // ─── CURSOS ──────────────────────────────────────────────
    const { rows: cursos } = await client.query(`
      INSERT INTO curso (titulo, descripcion, tecnologia) VALUES
        ('Java desde cero', 'Aprende los fundamentos de Java paso a paso', 'java'),
        ('Docker esencial', 'Domina contenedores con Docker desde lo básico', 'docker')
      RETURNING id_curso
    `);

    const [javaId, dockerId] = cursos.map(c => c.id_curso);

    // ─── MODULOS ─────────────────────────────────────────────
    const { rows: modulos } = await client.query(`
      INSERT INTO modulo (id_curso, titulo, orden) VALUES
        ($1, 'Introducción a Java', 1),
        ($1, 'Tipos de datos y variables', 2),
        ($2, 'Fundamentos de Docker', 1),
        ($2, 'Imágenes y contenedores', 2)
      RETURNING id_modulo
    `, [javaId, dockerId]);

    const [m1, m2, m3, m4] = modulos.map(m => m.id_modulo);

    // ─── LECCIONES ───────────────────────────────────────────
    const { rows: lecciones } = await client.query(`
      INSERT INTO leccion (id_modulo, titulo, tipo, orden) VALUES
        ($1, '¿Qué es Java?', 'teoria', 1),
        ($1, 'Tu primer programa: Hola Mundo', 'practica', 2),
        ($2, 'Variables en Java', 'teoria', 1),
        ($2, 'Declarando tu primera variable', 'practica', 2),
        ($3, '¿Qué es Docker?', 'teoria', 1),
        ($3, 'Instalando Docker', 'practica', 2),
        ($4, '¿Qué es una imagen?', 'teoria', 1),
        ($4, 'Corriendo tu primer contenedor', 'practica', 2)
      RETURNING id_leccion
    `, [m1, m2, m3, m4]);

    const [l1, l2, l3, l4, l5, l6, l7, l8] = lecciones.map(l => l.id_leccion);

    // ─── EJERCICIOS ──────────────────────────────────────────
    await client.query(`
      INSERT INTO ejercicio (id_leccion, instrucciones, resultado_esperado) VALUES
        ($1, 'Completa el código para imprimir "Hola Mundo": System.out.println(___);', '"Hola Mundo"'),
        ($2, 'Declara una variable entera llamada edad con valor 20: ___ edad = 20;', 'int'),
        ($3, 'Escribe el comando para ver los contenedores activos en Docker:', 'docker ps'),
        ($4, 'Escribe el comando para descargar la imagen de nginx:', 'docker pull nginx')
      RETURNING id_ejercicio
    `, [l2, l4, l6, l8]);

    // ─── EVALUACIONES ────────────────────────────────────────
    const { rows: evals } = await client.query(`
      INSERT INTO evaluacion (id_modulo, titulo, total_preguntas) VALUES
        ($1, 'Evaluación: Introducción a Java', 2),
        ($2, 'Evaluación: Fundamentos de Docker', 2)
      RETURNING id_evaluacion
    `, [m1, m3]);

    const [e1, e2] = evals.map(e => e.id_evaluacion);

    // ─── PREGUNTAS ───────────────────────────────────────────
    const { rows: preguntas } = await client.query(`
      INSERT INTO pregunta (id_evaluacion, enunciado) VALUES
        ($1, '¿Cuál es la extensión de un archivo Java?'),
        ($1, '¿Cuál clase contiene el método main en Java?'),
        ($2, '¿Qué comando lista todos los contenedores (activos e inactivos)?'),
        ($2, '¿Qué es un Dockerfile?')
      RETURNING id_pregunta
    `, [e1, e2]);

    const [p1, p2, p3, p4] = preguntas.map(p => p.id_pregunta);

    // ─── OPCIONES ────────────────────────────────────────────
    await client.query(`
      INSERT INTO opcion (id_pregunta, texto_opcion, es_correcta) VALUES
        ($1, '.java', true),
        ($1, '.py', false),
        ($1, '.js', false),
        ($2, 'La clase principal', true),
        ($2, 'Cualquier clase', false),
        ($3, 'docker ps -a', true),
        ($3, 'docker ps', false),
        ($3, 'docker list', false),
        ($4, 'Un archivo de instrucciones para construir una imagen', true),
        ($4, 'Un contenedor detenido', false)
    `, [p1, p2, p3, p4]);

    console.log('✅ Seed completado. Datos de Java y Docker insertados 🚀');
  } catch (err) {
    console.error('❌ Error en seed:', err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
