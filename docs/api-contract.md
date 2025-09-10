# Flujo de trabajo en git la rama main

primero realizar la clonacion:
luego de haber instalado github, necesitas abrir la consola git bash de visual studio code y ahi en esa consola realizar todos los pasos que se ven a continuacion)

-para clonar: 
git remote add origin https://github.com/Franco-I/Calendar.git

-luego seguir orden de flujo para subir los cambios con cambio de versiones:

1.  git add .

2.  git commit -m ""  (dentro de las comillas dobles escribir el nombre del cambio tipo comentario)

3. git push



OJO si pide sincronizar la ruta para hacer los push, solo copiar y pegar el comando en consola(consola git bash)

en mi caso era: git push --set-upstream origin main



# API Contract - Sistema de Gestión de Actividades

Este documento define los endpoints de la API.  
Funciona como un **contrato entre backend y frontend**, es decir, acuerda:
- Qué rutas existen.
- Qué datos se esperan enviar.
- Qué datos se reciben de vuelta.
- Qué errores pueden ocurrir.

De esta forma, el frontend puede avanzar aunque el backend cambie por dentro, asi que OJO...

---

## 🔹 Entidades principales
- **Activity (Actividad):** representa una tarea registrada por un usuario (ej: "Estudiar React").
- **User (Usuario):** persona a la que pertenece la actividad.  
  Actualmente no hay endpoints de usuario, pero cada actividad incluye información básica del usuario (`user_name`, `user_email`).

---

## 1. Obtener todas las actividades

### Endpoint
`GET /api/activities`

### Descripción
Devuelve la lista completa de actividades registradas, junto con información del usuario que las creó.

ej:

### Respuesta exitosa (200)

[
  {
    "id": 1,
    "title": "Estudiar React",
    "description": "Practicar componentes y hooks",
    "date": "2025-08-18T04:00:00.000Z",
    "status": "pending",
    "created_at": "2025-08-18T19:09:31.000Z",
    "updated_at": "2025-08-18T19:09:31.000Z",
    "user_name": "Franco",
    "user_email": "franco@test.com"
  }
]

2. Obtener una actividad por ID
Endpoint
GET /api/activities/:id

Descripción
Devuelve los detalles de una sola actividad buscada por su id.

Ejemplo
GET /api/activities/1

Respuesta exitosa (200)

{
  "id": 1,
  "title": "Estudiar React",
  "description": "Practicar componentes y hooks",
  "date": "2025-08-18T04:00:00.000Z",
  "status": "pending",
  "created_at": "2025-08-18T19:09:31.000Z",
  "updated_at": "2025-08-18T19:09:31.000Z",
  "user_name": "Franco",
  "user_email": "franco@test.com"
}
Error (404)

{
  "error": "Actividad no encontrada"
}
3. Crear nueva actividad
Endpoint
POST /api/activities

Descripción
Crea una nueva actividad en la base de datos.
La actividad debe pertenecer a un usuario existente (user_id).

Body (JSON)

{
  "title": "Estudiar Node.js",
  "description": "Aprender sobre Express y middlewares",
  "date": "2025-08-20",
  "status": "pending",
  "user_id": 1
}
Respuesta exitosa (201)

{
  "message": "Actividad creada exitosamente",
  "activity": {
    "id": 2,
    "title": "Estudiar Node.js",
    "description": "Aprender sobre Express y middlewares",
    "date": "2025-08-20T04:00:00.000Z",
    "status": "pending",
    "created_at": "2025-08-18T19:15:00.000Z",
    "updated_at": "2025-08-18T19:15:00.000Z",
    "user_id": 1
  }
}
4. Actualizar una actividad
Endpoint
PUT /api/activities/:id

Descripción
Permite modificar una actividad existente.
Solo se deben enviar los campos que cambian.

Body (JSON)

{
  "title": "Estudiar Node.js avanzado",
  "status": "completed"
}
Respuesta exitosa (200)

{
  "message": "Actividad actualizada exitosamente"
}
Error (404)

{
  "error": "Actividad no encontrada"
}
5. Eliminar una actividad
Endpoint
DELETE /api/activities/:id

Descripción
Elimina una actividad de la base de datos.
La acción es irreversible.

Respuesta exitosa (200)

{
  "message": "Actividad eliminada exitosamente"
}
Error (404)

{
  "error": "Actividad no encontrada"
}

📌 Notas finales

Todas las fechas están en formato ISO (YYYY-MM-DDTHH:mm:ss.sssZ).
Los estados válidos para status son: "pending", "in_progress", "completed".
En caso de error inesperado, la API devuelve un código 500 con un mensaje genérico. quizas esto lo cambie para dar el mensaje especifico y no generico :3

