class Curso {
  constructor({ id_curso, titulo, descripcion, tecnologia }) {
    this.id_curso    = id_curso;
    this.titulo      = titulo;
    this.descripcion = descripcion;
    this.tecnologia  = tecnologia; // 'java' | 'docker'
  }

  static tecnologiasValidas() {
    return ['java', 'docker'];
  }

  esValido() {
    return (
      this.titulo &&
      this.titulo.trim().length > 0 &&
      Curso.tecnologiasValidas().includes(this.tecnologia)
    );
  }
}

module.exports = Curso;
