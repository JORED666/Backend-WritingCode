-- ============================================================
-- WritingCode - Migración de Base de Datos
-- PostgreSQL
-- Basado en el diagrama ER del proyecto
-- ============================================================

-- Limpiar tablas si existen (en orden por FK)
DROP TABLE IF EXISTS opcion CASCADE;
DROP TABLE IF EXISTS pregunta CASCADE;
DROP TABLE IF EXISTS evaluacion CASCADE;
DROP TABLE IF EXISTS ejercicio CASCADE;
DROP TABLE IF EXISTS leccion CASCADE;
DROP TABLE IF EXISTS modulo CASCADE;
DROP TABLE IF EXISTS curso CASCADE;

-- ─── CURSO ────────────────────────────────────────────────────
CREATE TABLE curso (
  id_curso    SERIAL PRIMARY KEY,
  titulo      VARCHAR(150) NOT NULL,
  descripcion TEXT,
  tecnologia  VARCHAR(50) NOT NULL CHECK (tecnologia IN ('java', 'docker'))
);

-- ─── MODULO ───────────────────────────────────────────────────
CREATE TABLE modulo (
  id_modulo  SERIAL PRIMARY KEY,
  id_curso   INT NOT NULL REFERENCES curso(id_curso) ON DELETE CASCADE,
  titulo     VARCHAR(150) NOT NULL,
  orden      INT NOT NULL DEFAULT 1
);

-- ─── LECCION ──────────────────────────────────────────────────
CREATE TABLE leccion (
  id_leccion  SERIAL PRIMARY KEY,
  id_modulo   INT NOT NULL REFERENCES modulo(id_modulo) ON DELETE CASCADE,
  titulo      VARCHAR(150) NOT NULL,
  tipo        VARCHAR(20) NOT NULL CHECK (tipo IN ('teoria', 'practica')),
  contenido   TEXT,
  orden       INT NOT NULL DEFAULT 1
);

-- ─── EJERCICIO ────────────────────────────────────────────────
CREATE TABLE ejercicio (
  id_ejercicio       SERIAL PRIMARY KEY,
  id_leccion         INT NOT NULL REFERENCES leccion(id_leccion) ON DELETE CASCADE,
  instrucciones      TEXT NOT NULL,
  resultado_esperado TEXT
);

-- ─── EVALUACION ───────────────────────────────────────────────
CREATE TABLE evaluacion (
  id_evaluacion   SERIAL PRIMARY KEY,
  id_modulo       INT NOT NULL REFERENCES modulo(id_modulo) ON DELETE CASCADE,
  titulo          VARCHAR(150) NOT NULL,
  total_preguntas INT DEFAULT 0
);

-- ─── PREGUNTA ─────────────────────────────────────────────────
CREATE TABLE pregunta (
  id_pregunta    SERIAL PRIMARY KEY,
  id_evaluacion  INT NOT NULL REFERENCES evaluacion(id_evaluacion) ON DELETE CASCADE,
  enunciado      TEXT NOT NULL
);

-- ─── OPCION ───────────────────────────────────────────────────
CREATE TABLE opcion (
  id_opcion    SERIAL PRIMARY KEY,
  id_pregunta  INT NOT NULL REFERENCES pregunta(id_pregunta) ON DELETE CASCADE,
  texto_opcion VARCHAR(255) NOT NULL,
  es_correcta  BOOLEAN NOT NULL DEFAULT false
);
