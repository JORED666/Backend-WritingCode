const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const cursoRoutes = require('./infrastructure/http/routes/curso.routes');
const moduloRoutes = require('./infrastructure/http/routes/modulo.routes');
const leccionRoutes = require('./infrastructure/http/routes/leccion.routes');
const ejercicioRoutes = require('./infrastructure/http/routes/ejercicio.routes');
const evaluacionRoutes = require('./infrastructure/http/routes/evaluacion.routes');
const preguntaRoutes = require('./infrastructure/http/routes/pregunta.routes');
const opcionRoutes = require('./infrastructure/http/routes/opcion.routes');

const errorHandler = require('./infrastructure/http/middlewares/errorHandler');
const notFound = require('./infrastructure/http/middlewares/notFound');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const API_PREFIX = '/api/v1';

app.use(`${API_PREFIX}/cursos`,      cursoRoutes);
app.use(`${API_PREFIX}/modulos`,     moduloRoutes);
app.use(`${API_PREFIX}/lecciones`,   leccionRoutes);
app.use(`${API_PREFIX}/ejercicios`,  ejercicioRoutes);
app.use(`${API_PREFIX}/evaluaciones`,evaluacionRoutes);
app.use(`${API_PREFIX}/preguntas`,   preguntaRoutes);
app.use(`${API_PREFIX}/opciones`,    opcionRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'WritingCode API', version: '1.0.0' });
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
