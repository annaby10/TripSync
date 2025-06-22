import { useState } from "react";
import axios from "axios";

const TripForm = ({ onTripCreated }) => {
  const [trip, setTrip] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    participants: "",
    notes: ""
  });

  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTrip = {
      ...trip,
      participants: trip.participants.split(",").map(p => p.trim())
    };

    try {
      await axios.post("http://localhost:5000/api/trips", newTrip);
      onTripCreated();
      setTrip({ title: "", destination: "", startDate: "", endDate: "", participants: "", notes: "" });
    } catch (err) {
      console.error("Error creating trip:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Trip Title" value={trip.title} onChange={handleChange} required />
      <input name="destination" placeholder="Destination" value={trip.destination} onChange={handleChange} required />
      <input name="startDate" type="date" value={trip.startDate} onChange={handleChange} required />
      <input name="endDate" type="date" value={trip.endDate} onChange={handleChange} required />
      <input name="participants" placeholder="Participants (comma-separated)" value={trip.participants} onChange={handleChange} />
      <textarea name="notes" placeholder="Notes" value={trip.notes} onChange={handleChange} />
      <button type="submit">Add Trip</button>
    </form>
  );
};

export default TripForm;
