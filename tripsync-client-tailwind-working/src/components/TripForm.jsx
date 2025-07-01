import React, { useEffect, useState } from "react";

function TripForm({ onTripCreated, editingTrip, onEditComplete }) {
  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [members, setMembers] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (editingTrip) {
      setTitle(editingTrip.title || "");
      setDestination(editingTrip.destination || "");
      setStartDate(editingTrip.startDate?.slice(0, 10) || "");
      setEndDate(editingTrip.endDate?.slice(0, 10) || "");
      setMembers(editingTrip.members || "");
      setNotes(editingTrip.notes || "");
    } else {
      clearForm();
    }
  }, [editingTrip]);

  const clearForm = () => {
    setTitle("");
    setDestination("");
    setStartDate("");
    setEndDate("");
    setMembers("");
    setNotes("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trip = { title, destination, startDate, endDate, members, notes };

    try {
      const url = editingTrip
        ? `http://localhost:5000/api/trips/${editingTrip._id}`
        : "http://localhost:5000/api/trips";
      const method = editingTrip ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trip),
      });

      if (res.ok) {
        clearForm();
        editingTrip ? onEditComplete() : onTripCreated();
      } else {
        alert("Failed to save trip.");
      }
    } catch (err) {
      console.error("Error saving trip:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto mb-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm text-gray-500">Trip Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-style"
            required
          />
        </div>
        <div>
          <label className="text-sm text-gray-500">Destination</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="input-style"
            required
          />
        </div>
        <div>
          <label className="text-sm text-gray-500">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="input-style"
            required
          />
        </div>
        <div>
          <label className="text-sm text-gray-500">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="input-style"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm text-gray-500">Participants</label>
          <input
            type="text"
            value={members}
            onChange={(e) => setMembers(e.target.value)}
            className="input-style"
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm text-gray-500">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="input-style"
            rows={2}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-all duration-200 font-medium"
      >
        {editingTrip ? "✏️ Update Trip" : "➕ Save Trip"}
      </button>
    </form>
  );
}

export default TripForm;
