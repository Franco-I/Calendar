import { getAllActivitiesModel, createActivityModel } from "../models/activityModel.js";
import pool from '../config/db.js';
import { updateActivityStatusModel } from "../models/activityModel.js";

// lógica de listar todas las actividades
export const getAllActivities = async (req, res) => {
  try {
    const activities = await getAllActivitiesModel();
    res.json(activities);
  } catch (err) {
    console.error("Error al obtener actividades:", err);
    res.status(500).json({ message: "Error al obtener actividades", error: err.message });
  }
}




// lógica de creación de una actividad
export const createActivity = async (req, res) => {
  const { user_id, title, description, date, status } = req.body;
  try {
    const newActivity = await createActivityModel(user_id, title, description, date, status);
    res.json(newActivity);
  } catch (err) {
    console.error("Error al crear actividad:", err);
    res.status(500).json({ message: "Error al crear actividad", error: err.message });
  }
};



// Logica para actualizar solo el estado
export const updateActivityStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["pending", "completed"].includes(status)) {
    return res.status(400).json({ error: "Estado no válido" });
  }

  try {
    const result = await updateActivityStatusModel(id, status);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Actividad no encontrada" });
    }
    res.json({ message: "Estado actualizado exitosamente", status });
  } catch (error) {
    console.error("Error al actualizar estado:", error);
    res.status(500).json({ error: "Error al actualizar estado" });
  }
};