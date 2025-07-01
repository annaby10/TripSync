import React, { useEffect, useState } from "react";
import TripCard from "./TripCard";

function TripList({ onEdit }) {
  const [trips, setTrips] = useState([]);
  const [newItem, setNewItem] = useState({});

  const fetchTrips = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/trips");
      const data = await res.json();
      setTrips(data);
      console.log("Trips:", data);

    } catch (err) {
      console.error("Error fetching trips:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this trip?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/api/trips/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTrips(trips.filter((trip) => trip._id !== id));
      } else {
        alert("Failed to delete trip.");
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleAddItem = async (e, tripId) => {
    e.preventDefault();
    const itemText = newItem[tripId];
    if (!itemText) return;

    const trip = trips.find((t) => t._id === tripId);
    const updatedChecklist = [...(trip.checklist || []), { text: itemText, done: false }];

    await updateChecklist(tripId, updatedChecklist);
    setNewItem({ ...newItem, [tripId]: "" });
  };

  const handleToggleChecklist = async (tripId, index) => {
    const trip = trips.find((t) => t._id === tripId);
    const updatedChecklist = [...trip.checklist];
    updatedChecklist[index].done = !updatedChecklist[index].done;

    await updateChecklist(tripId, updatedChecklist);
  };

  const updateChecklist = async (tripId, updatedChecklist) => {
    try {
      const res = await fetch(`http://localhost:5000/api/trips/${tripId}/checklist`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checklist: updatedChecklist }),
      });

      const updatedTrip = await res.json();
      setTrips((prev) => prev.map((t) => (t._id === tripId ? updatedTrip : t)));
    } catch (err) {
      console.error("Checklist update failed:", err);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  if (!trips.length) {
    return <p className="text-center text-gray-400 dark:text-gray-500 mt-10">No trips saved yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {trips.map((trip) => (
        <TripCard
          key={trip._id}
          trip={trip}
          onEdit={onEdit}
          onDelete={handleDelete}
          newItem={newItem}
          setNewItem={setNewItem}
          handleAddItem={handleAddItem}
          handleToggleChecklist={handleToggleChecklist}
        />

      ))}
    </div>
  );
}

export default TripList;

