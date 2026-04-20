class Modulo {
  constructor({ id_modulo, id_curso, titulo, orden }) {
    this.id_modulo = id_modulo;
    this.id_curso  = id_curso;
    this.titulo    = titulo;
    this.orden     = orden;
  }

  esValido() {
    return this.titulo?.trim().length > 0 && this.id_curso != null;
  }
}

module.exports = Modulo;
