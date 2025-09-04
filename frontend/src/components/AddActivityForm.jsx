


//otra forma de hacer el formulario de agregar actividad


/*
import { useState } from "react";

export default function AddActivityForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("pending");
  const [userId, setUserId] = useState(1); // Puedes ajustar según el usuario actual

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, date, status, user_id: userId }),
      });

      const data = await res.json();
      if (res.ok) {
        onAdd(data.activity); // Enviar la actividad al componente padre para actualizar el estado
        setTitle("");
        setDescription("");
        setDate("");
        setStatus("pending");
      } else {
        alert(data.message || "Error al crear actividad");
      }
    } catch (err) {
      console.error(err);
      alert("Error al crear actividad");
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
*/