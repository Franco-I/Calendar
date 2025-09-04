import React, { useState } from "react";

export default function Calendar({ activities, setActivities }) {
  const [selectedActivity, setSelectedActivity] = useState(null);

  const weekdays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

  const activitiesByDay = weekdays.reduce((acc, day) => {
    acc[day] = [];
    return acc;
  }, {});

  activities.forEach((activity) => {
    const day = new Date(activity.date).getDay();
    if (day >= 1 && day <= 5) {
      const weekday = weekdays[day - 1];
      activitiesByDay[weekday].push(activity);
    }
  });

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "completed" : "pending";

    try {
      const res = await fetch(
        `http://localhost:4000/activities/${id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (res.ok) {
        setActivities((prev) =>
          prev.map((act) =>
            act.id === id ? { ...act, status: newStatus } : act
          )
        );
      } else {
        alert("Error al actualizar el estado");
      }
    } catch (err) {
      console.error(err);
      alert("Error al actualizar el estado");
    }
  };

  return (
    <>
      {selectedActivity && (
        <div className="modal-backdrop" onClick={() => setSelectedActivity(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedActivity.title}</h2>
            <p>
              <strong>Descripción:</strong> {selectedActivity.description}
            </p>
            <p>
              <strong>Fecha:</strong>{" "}
              {new Date(selectedActivity.date).toLocaleDateString("es-CL", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p>
              <strong>Estado:</strong>{" "}
              <span
                className={
                  selectedActivity.status === "pending"
                    ? "status-pending"
                    : "status-completed"
                }
              >
                {selectedActivity.status}
              </span>
            </p>
            <button className="btn-close" onClick={() => setSelectedActivity(null)}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      <div className="calendar">
        {weekdays.map((day) => (
          <div key={day} className="calendar-day">
            <h3>{day}</h3>
            {activitiesByDay[day].length === 0 ? (
              <p className="no-activities">No hay actividades</p>
            ) : (
              <ul className="activity-list">
                {activitiesByDay[day].map((a) => (
                  <li
                    key={a.id}
                    className={`activity-item ${
                      a.status === "pending" ? "pending" : "completed"
                    }`}
                  >
                    <span
                      className="activity-title"
                      onClick={() => setSelectedActivity(a)}
                    >
                      {a.title}
                    </span>
                    <button
                      className="btn-toggle-status"
                      onClick={() => handleToggleStatus(a.id, a.status)}
                    >
                      Cambiar estado
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </>
  );
}



/**Para que al cambiar el estado de una actividad se vea automáticamente en pantalla sin recargar, necesitamos
guardar las actividades en un estado local con useState y actualizarlo cuando cambie alguna actividad. */


/*Qué cambia respecto a tu versión anterior:

useState para activities: ahora guardamos las actividades en un estado local.

useEffect para cargar actividades: llama a tu API una vez al iniciar y guarda los datos.

Actualizar estado local: cuando se cambia el estado de una actividad, actualizamos activities con setActivities
para que React vuelva a renderizar la lista automáticamente. */

