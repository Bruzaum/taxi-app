import React from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

// Acessando a API key com o prefixo correto
const API_KEY = process.env.REACT_APP_API_KEY;

const MapComponent = () => (
  <APIProvider apiKey={API_KEY}>
    <Map
      style={{ width: "40vw", height: "40vh" }}
      defaultCenter={{ lat: -23.1096554, lng: -47.7133705 }}
      defaultZoom={15}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
    />
  </APIProvider>
);

export default MapComponent;
