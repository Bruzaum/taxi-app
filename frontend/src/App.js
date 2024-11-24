import React, { useEffect } from "react";
import "./App.css";
import CreateForm from "./components/FormEstimate/index.js";
import ConfirmButton from "./components/ConfirmButton/index.js";
import Map from "./components/Map/index.js";
import Card from "./components/Card/index.js";
import DataGridDemo from "./components/DataGrid/index.js";

import api from "./Api.js";
import Footer from "./components/Footer/index.js";
//import axios from "axios";

function App() {
  useEffect(() => {
    api.get("/ride/3?driver_id=1").then((res) => {
      console.log(res.data);
      return;
    });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <div className="p-3 mt-5">
        <CreateForm />
      </div>
      <React.StrictMode>
        <Map />
      </React.StrictMode>
      <ConfirmButton />

      <div className="flex flex-row space-x-4">
        <Card />
        <Card />
        <Card />
      </div>
      <DataGridDemo />
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
