class Leccion {
  constructor({ id_leccion, id_modulo, titulo, tipo, orden }) {
    this.id_leccion = id_leccion;
    this.id_modulo  = id_modulo;
    this.titulo     = titulo;
    this.tipo       = tipo;   // 'teoria' | 'practica'
    this.orden      = orden;
  }

  static tiposValidos() {
    return ['teoria', 'practica'];
  }

  esValido() {
    return (
      this.titulo?.trim().length > 0 &&
      this.id_modulo != null &&
      Leccion.tiposValidos().includes(this.tipo)
    );
  }
}

module.exports = Leccion;
