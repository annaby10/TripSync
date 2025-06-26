import React, { useState, useEffect } from 'react';

function TripForm({ onTripCreated, editingTrip, onEditComplete }) {
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    members: '',
    notes: '',
  });

  useEffect(() => {
    if (editingTrip) {
      setFormData(editingTrip);
    } else {
      resetForm();
    }
  }, [editingTrip]);

  const resetForm = () => {
    setFormData({
      title: '',
      destination: '',
      startDate: '',
      endDate: '',
      members: '',
      notes: '',
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingTrip
      ? `http://localhost:5000/api/trips/${editingTrip._id}`
      : "http://localhost:5000/api/trips";

    const method = editingTrip ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const result = await res.json();
        alert(editingTrip ? "✏️ Trip updated!" : "✅ Trip saved!");
        resetForm();
        if (editingTrip && onEditComplete) {
          onEditComplete(result);
        } else {
          onTripCreated(result);
        }
      } else {
        alert("❌ Failed to submit form.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Trip Title" className="input" required />
        <input name="destination" value={formData.destination} onChange={handleChange} placeholder="Destination" className="input" required />
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="input" required />
        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="input" required />
        <input name="members" value={formData.members} onChange={handleChange} placeholder="Participants" className="input" />
        <input name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes" className="input" />
      </div>
      <button type="submit" className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
        {editingTrip ? "✏️ Update Trip" : "➕ Save Trip"}
      </button>
    </form>
  );
}

export default TripForm;

