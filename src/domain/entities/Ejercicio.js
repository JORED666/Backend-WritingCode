class Ejercicio {
  constructor({ id_ejercicio, id_leccion, instrucciones, resultado_esperado }) {
    this.id_ejercicio       = id_ejercicio;
    this.id_leccion         = id_leccion;
    this.instrucciones      = instrucciones;
    this.resultado_esperado = resultado_esperado;
  }

  verificarRespuesta(respuestaEstudiante) {
    if (!respuestaEstudiante || !this.resultado_esperado) return false;
    return respuestaEstudiante.trim().toLowerCase() ===
           this.resultado_esperado.trim().toLowerCase();
  }

  esValido() {
    return this.id_leccion != null && this.instrucciones?.trim().length > 0;
  }
}

module.exports = Ejercicio;
