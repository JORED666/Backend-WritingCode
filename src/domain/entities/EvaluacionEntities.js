class Evaluacion {
  constructor({ id_evaluacion, id_modulo, titulo, total_preguntas }) {
    this.id_evaluacion   = id_evaluacion;
    this.id_modulo       = id_modulo;
    this.titulo          = titulo;
    this.total_preguntas = total_preguntas;
  }

  esValido() {
    return this.titulo?.trim().length > 0 && this.id_modulo != null;
  }
}

class Pregunta {
  constructor({ id_pregunta, id_evaluacion, enunciado }) {
    this.id_pregunta    = id_pregunta;
    this.id_evaluacion  = id_evaluacion;
    this.enunciado      = enunciado;
  }

  esValida() {
    return this.enunciado?.trim().length > 0 && this.id_evaluacion != null;
  }
}

class Opcion {
  constructor({ id_opcion, id_pregunta, texto_opcion, es_correcta }) {
    this.id_opcion    = id_opcion;
    this.id_pregunta  = id_pregunta;
    this.texto_opcion = texto_opcion;
    this.es_correcta  = es_correcta;
  }

  esValida() {
    return this.texto_opcion?.trim().length > 0 && this.id_pregunta != null;
  }
}

module.exports = { Evaluacion, Pregunta, Opcion };
