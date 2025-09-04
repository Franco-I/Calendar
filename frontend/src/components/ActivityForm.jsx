import { useState } from "react";
import { createActivity } from "../api/activities"; // función que hace POST a tu backend

export default function ActivityForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const newActivity = {
      title,
      description,
      date,
      status: "pending",
      user_id: 1, // por ahora usuario fijo
    };

    const created = await createActivity(newActivity);

    if (created) {
      // el backend ya devuelve la actividad directamente
      onAdd(created);
      setTitle("");
      setDescription("");
      setDate("");
    } else {
      console.error("No se recibió la actividad creada", created);
    }
  } catch (error) {
    console.error("Error al crear actividad:", error);
  }
};


  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Agregar actividad</button>
    </form>
  );
}
