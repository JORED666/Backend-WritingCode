# WritingCode — Backend

Backend de la plataforma **WritingCode**, una aplicación web de apoyo para aprender Java y Docker mediante lecciones y ejercicios guiados.

---

## 🏗️ Arquitectura

Este proyecto implementa **Arquitectura Hexagonal** (Ports & Adapters) bajo un enfoque **SOA** (Service-Oriented Architecture).

```
src/
├── domain/                        🟣 Capa de Dominio (núcleo)
│   ├── entities/                  Entidades del negocio (sin dependencias externas)
│   │   ├── Curso.js
│   │   ├── Modulo.js
│   │   ├── Leccion.js
│   │   ├── Ejercicio.js           Contiene lógica de verificación de respuestas
│   │   └── EvaluacionEntities.js  Evaluacion, Pregunta, Opcion
│   └── repositories/              Puertos, interfaces/contratos
│       └── index.js               ICursoRepository, IModuloRepository...
│
├── application/                   🔵 Capa de Aplicación
│   └── use-cases/                 Casos de uso (orquestación de lógica)
│       ├── curso/                 GetAllCursos, CreateCurso, etc.
│       ├── ejercicio/             VerificarRespuesta (caso especial)
│       ├── evaluacion/            Evaluacion, Pregunta, Opcion
│       └── shared/                Modulo, Leccion
│
└── infrastructure/                🟢 Capa de Infraestructura (adaptadores)
    ├── database/
    │   ├── connection.js          Pool de conexión a PostgreSQL
    │   ├── migrations/
    │   │   ├── schema.sql         
    │   │   └── run.js             Ejecutor de migraciones
    │   └── seeds/
    │       └── run.js             Datos de ejemplo
    ├── repositories/              Adaptadores PostgreSQL (implementan los puertos)
    │   ├── CursoRepository.js
    │   ├── ContentRepositories.js Modulo, Leccion, Ejercicio
    │   └── EvaluacionRepositories.js
    └── http/                      Adaptador HTTP (Express)
        ├── controllers/           Traducen HTTP → Casos de uso
        ├── routes/                Definición de endpoints (SOA)
        └── middlewares/           errorHandler, notFound
```

### ¿Por qué Hexagonal + SOA?

| Capa | Responsabilidad |
|------|----------------|
| **Dominio** | Reglas de negocio puras. No conoce Express ni PostgreSQL |
| **Aplicación** | Orquesta los casos de uso usando los puertos del dominio |
| **Infraestructura** | Detalles técnicos: BD, HTTP, etc. Implementa los puertos |

---

## 🚀 Instalación

```bash
# 1. Clonar e instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env
# Edita .env con tus credenciales de PostgreSQL

# 3. Crear la base de datos en PostgreSQL
createdb writingcode_db

# 4. Ejecutar la migración (crea todas las tablas)
npm run migrate

# 5. Insertar datos de ejemplo
npm run seed

# 6. Iniciar el servidor
npm run dev
```

---

## 🌐 Endpoints de la API

**Base URL:** `http://localhost:3000/api/v1`

### Cursos
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/cursos` | Listar todos los cursos |
| GET | `/cursos/:id` | Obtener un curso |
| POST | `/cursos` | Crear curso |
| PUT | `/cursos/:id` | Actualizar curso |
| DELETE | `/cursos/:id` | Eliminar curso |
| GET | `/cursos/:id/modulos` | Módulos de un curso |

### Módulos
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/modulos` | Listar módulos |
| GET | `/modulos/:id` | Obtener módulo |
| POST | `/modulos` | Crear módulo |
| PUT | `/modulos/:id` | Actualizar módulo |
| DELETE | `/modulos/:id` | Eliminar módulo |
| GET | `/modulos/:id/lecciones` | Lecciones de un módulo |
| GET | `/modulos/:id/evaluaciones` | Evaluaciones de un módulo |

### Lecciones
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/lecciones` | Listar lecciones |
| GET | `/lecciones/:id` | Obtener lección |
| POST | `/lecciones` | Crear lección |
| PUT | `/lecciones/:id` | Actualizar lección |
| DELETE | `/lecciones/:id` | Eliminar lección |
| GET | `/lecciones/:id/ejercicios` | Ejercicios de una lección |

### Ejercicios
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/ejercicios` | Listar ejercicios |
| GET | `/ejercicios/:id` | Obtener ejercicio |
| POST | `/ejercicios` | Crear ejercicio |
| PUT | `/ejercicios/:id` | Actualizar ejercicio |
| DELETE | `/ejercicios/:id` | Eliminar ejercicio |
| **POST** | **`/ejercicios/:id/verificar`** | **✅ Verificar respuesta del estudiante** |

### Evaluaciones / Preguntas / Opciones
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/evaluaciones` | Listar evaluaciones |
| POST | `/evaluaciones` | Crear evaluación |
| GET | `/evaluaciones/:id/preguntas` | Preguntas de una evaluación |
| GET | `/preguntas/:id/opciones` | Opciones de una pregunta |
| POST | `/preguntas` | Crear pregunta |
| POST | `/opciones` | Crear opción |

---

## 📋 Ejemplos de uso

### Crear un curso
```json
POST /api/v1/cursos
{
  "titulo": "Java Avanzado",
  "descripcion": "Programación orientada a objetos en Java",
  "tecnologia": "java"
}
```

### Verificar respuesta de un ejercicio ✅
```json
POST /api/v1/ejercicios/1/verificar
{
  "respuesta": "docker ps"
}

// Respuesta exitosa:
{
  "success": true,
  "data": {
    "id_ejercicio": 1,
    "es_correcto": true,
    "mensaje": "¡Excelente! Respuesta correcta 🎉"
  }
}
```

---

## 🛠️ Stack tecnológico

- **Node.js** + **Express** — servidor HTTP
- **PostgreSQL** + **pg** — base de datos
- **dotenv** — variables de entorno
- **morgan** — logging de peticiones
- **cors** — habilitación de CORS

---

## 👥 Equipo

| Nombre | Rol |
|--------|-----|
| Mazariegos Laguna, Carlos Andrés | Documentación y desarrollo general |
| González Abarca, Edy Jordan | Desarrollo backend |
| Ramírez Trujillo, Karolina Guadalupe | Desarrollo frontend |

**Docente:** López Rojo, Viviana  
**Universidad Politécnica de Chiapas** 
