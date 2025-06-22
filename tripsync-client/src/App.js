import TripForm from "./components/TripForm";
import TripList from "./components/TripList";
import { useState } from "react";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="App">
      <h1>TripSync 🌍</h1>
      <TripForm onTripCreated={() => setRefresh(!refresh)} />
      <TripList key={refresh} />
    </div>
  );
}

export default App;
