import React, { useState } from "react";
import "./App.css";
import { DistanceProvider } from "./DistanceContext";
import CreateForm from "./components/FormEstimate/index.js";
import Card from "./components/Card/index.js";
import FormSearch from "./components/FormSearch/index.js";
import Footer from "./components/Footer/index.js";

function App() {
  // eslint-disable-next-line
  const [routeData, setRouteData] = useState({ origin: "", destination: "" });

  const handleRouteUpdate = (origin, destination) => {
    setRouteData({ origin, destination });
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <DistanceProvider>
        <div className="p-3 mt-5">
          <CreateForm onRouteUpdate={handleRouteUpdate} />
        </div>

        <div className="flex flex-row">
          <Card />
        </div>
      </DistanceProvider>
      <FormSearch />
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
