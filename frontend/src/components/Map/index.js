import React, { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";

const API_KEY = process.env.REACT_APP_API_KEY;

export default function MapComponent({ origin, destination }) {
  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        style={{ width: "60vw", height: "45vh" }}
        defaultZoom={15}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        <Directions origin={origin} destination={destination} />
      </Map>
    </APIProvider>
  );
}

function Directions({ origin, destination }) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  useEffect(() => {
    if (typeof google !== "undefined") {
      setGoogleLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!routesLibrary || !map || !googleLoaded) return;

    const directionsServiceInstance = new routesLibrary.DirectionsService();
    const directionsRendererInstance = new routesLibrary.DirectionsRenderer({
      map,
    });

    setDirectionsService(directionsServiceInstance);
    setDirectionsRenderer(directionsRendererInstance);
  }, [routesLibrary, map, googleLoaded]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer || !origin || !destination)
      return;

    directionsService
      .route({
        origin,
        destination,
        //eslint-disable-next-line
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      });
  }, [directionsService, directionsRenderer, origin, destination]);

  return null;
}
