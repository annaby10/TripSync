import React, { useState } from "react";
import TripForm from "./components/TripForm";
import TripList from "./components/TripList";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null); // ✅ editing trip state

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">TripSync 🌍</h1>
      <TripForm
        onTripCreated={() => setRefresh(!refresh)}
        editingTrip={editingTrip}
        onEditComplete={() => {
          setEditingTrip(null);
          setRefresh(!refresh);
        }}
      />
      <TripList
        key={refresh}
        onEdit={(trip) => setEditingTrip(trip)} // pass edit handler to TripList
      />
    </div>
  );
}

export default App;
