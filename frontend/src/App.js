import React, { useEffect } from "react";
import "./App.css";
import CreateForm from "./components/FormEstimate/index.js";
import ConfirmButton from "./components/ConfirmButton/index.js";
import Map from "./components/Map/index.js";
import Card from "./components/Card/index.js";

import api from "./Api.js";
//import axios from "axios";

function App() {
  useEffect(() => {
    api.get("/ride/3?driver_id=1").then((res) => {
      console.log(res.data);
      return;
    });
  }, []);

  return (
    <div>
      <CreateForm />
      <ConfirmButton />
      <React.StrictMode>
        <Map />
      </React.StrictMode>
      <Card />
    </div>
  );
}

export default App;
