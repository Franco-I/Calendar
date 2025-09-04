import { useState, useEffect } from "react";
import { getAllActivities } from "./api/activities";
import ActivityForm from "./components/ActivityForm";
import Calendar from "./components/Calendar";

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const data = await getAllActivities();
      setActivities(data);
    };
    fetchActivities();
  }, []);

  const handleAdd = (newActivity) => {
    setActivities([...activities, newActivity]);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Calendario de Actividades</h1>
      <ActivityForm onAdd={(newActivity) => setActivities([...activities, newActivity])} />
      <Calendar activities={activities} setActivities={setActivities} />

    </div>
  );
}

export default App;
