import React, { useEffect, useState } from 'react';

function TripList({ onEdit }) {
  const [trips, setTrips] = useState([]);

  const fetchTrips = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/trips");
      const data = await res.json();
      setTrips(data);
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

  useEffect(() => {
    fetchTrips();
  }, []);

  if (!trips.length) {
    return <p className="text-center text-gray-500 mt-10">No trips saved yet.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-2xl font-semibold mb-4 text-center text-indigo-700">Saved Trips</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trips.map((trip) => (
          <div key={trip._id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-indigo-600 mb-1">{trip.title}</h3>
            <p className="text-gray-700 mb-1">📍 {trip.destination}</p>
            <p className="text-gray-600 mb-1">🗓 {formatDate(trip.startDate)} → {formatDate(trip.endDate)}</p>
            {trip.members && <p className="text-gray-600 mb-1">👥 {trip.members}</p>}
            {trip.notes && <p className="text-gray-600">📝 {trip.notes}</p>}

            <div className="flex gap-4 mt-3">
              <button
                onClick={() => handleDelete(trip._id)}
                className="text-red-500 hover:underline"
              >
                🗑 Delete
              </button>
              <button
                onClick={() => onEdit(trip)}
                className="text-blue-500 hover:underline"
              >
                ✏️ Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toISOString().split('T')[0];
};

export default TripList;

