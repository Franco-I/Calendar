import pool from '../config/db.js';



// funcion para obtener todas las actividades de la bd de la tabla activities

export const getAllActivitiesModel = async () => {
  try {
    const [results] = await pool.query(`
      SELECT 
        a.id,
        a.title,
        a.description,
        a.date,
        a.status,
        a.created_at,
        a.updated_at,
        u.name AS user_name,
        u.email AS user_email
      FROM activities a
      JOIN users u ON a.user_id = u.id
    `);
    return results;
  } catch (error) {
    throw error;
  }
};



// funcion para la creacion de una actividad en la bd de la tabla activities

export const createActivityModel = async (user_id, title, description, date, status = 'pending') => {
  try {
    const [result] = await pool.query(
      `INSERT INTO activities (user_id, title, description, date, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
      [user_id, title, description, date, status]
    );
    return { 
      id: result.insertId,
      user_id,
      title,
      description,
      date,
      status
    };
  } catch (error) {
    throw error;
  }
};



// funcion para actualizar el estado de una actividad en la bd de la tabla activities

// Actualizar solo el estado de una actividad
export const updateActivityStatusModel = async (id, status) => {
  try {
    const [result] = await pool.query(
      "UPDATE activities SET status = ?, updated_at = NOW() WHERE id = ?",
      [status, id]
    );
    return result;
  } catch (error) {
    throw error;
  }
};
