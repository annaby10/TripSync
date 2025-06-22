import { useEffect, useState } from "react";
import axios from "axios";

const TripList = () => {
  const [trips, setTrips] = useState([]);

  const fetchTrips = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/trips");
      setTrips(res.data);
    } catch (err) {
      console.error("Failed to load trips:", err);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <div>
      <h2>Saved Trips</h2>
      {trips.map((trip) => (
        <div key={trip._id}>
          <h3>{trip.title} — {trip.destination}</h3>
          <p>{trip.startDate} to {trip.endDate}</p>
          <p>Notes: {trip.notes}</p>
          <p>With: {trip.participants?.join(", ")}</p>
        </div>
      ))}
    </div>
  );
};

export default TripList;
