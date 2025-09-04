//Funciones para consumir la API (GET, POST, PUT, DELETE)

// src/api/activities.js
const BASE_URL = "http://localhost:4000/activities";

// Función para obtener todas las actividades
export const getAllActivities = async () => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Error al obtener actividades");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Función para crear una nueva actividad
export const createActivity = async (activity) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activity),
    });
    if (!res.ok) throw new Error("Error al crear actividad");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Función para actualizar una actividad
export const updateActivity = async (id, updates) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error("Error al actualizar actividad");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Función para eliminar una actividad
export const deleteActivity = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Error al eliminar actividad");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};


// Actualizar estado de una actividad
export const updateActivityStatus = async (id, status) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) throw new Error("Error al actualizar estado");
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};



