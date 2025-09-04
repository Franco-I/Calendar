import { getAllUsersModel, createUserModel } from '../models/userModel.js';

 //logica de listar todos los usuarios

export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersModel();
    res.json(users);
  } catch (err) {
    console.error("Error al obtener usuarios:", err); // para ver en consola
    res.status(500).json({ message: "Error al obtener usuarios", error: err.message });
  }
};




//logica de creacion de un usuario
export const createUser = async (req, res) => {
  const { name, email } = req.body;
  try {           
    const newUser = await createUserModel(name, email);
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ message: "Error al crear usuario", error: err });
  }
};






