import pool from '../config/db.js';


// funcion para la obtencion de todos los usuarios de la bd de la tabla users

export const getAllUsersModel = async () => {
  try {
    const [results] = await pool.query('SELECT * FROM users');
    return results;
  } catch (error) {
    throw error;
  }
};




// funcion para la creacion de un usuario en la bd de la tabla users


export const createUserModel = async (name, email) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    return { id: result.insertId, name, email };
  } catch (err) {
    throw err;
  }
};



