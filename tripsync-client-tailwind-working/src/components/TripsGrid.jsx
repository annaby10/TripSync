// src/components/TripsGrid.js
import TripCard from "./TripCard";

export default function TripsGrid({ trips, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {trips.map((trip) => (
        <TripCard
          key={trip._id}
          trip={trip}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
