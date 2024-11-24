import React, { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";

const API_KEY = process.env.REACT_APP_API_KEY;

export default function MapComponent() {
  const origin = { lat: -23.1096554, lng: -47.7133705 };

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        style={{ width: "40vw", height: "40vh" }}
        defaultCenter={origin}
        defaultZoom={15}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        <Directions />
      </Map>
    </APIProvider>
  );
}

function Directions() {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  useEffect(() => {
    // Verifica se o Google foi carregado
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
    if (!directionsService || !directionsRenderer) return;

    if (typeof google !== "undefined") {
      directionsService
        .route({
          origin: "Rua Capitão João de Campos Toledo, Tiete",
          destination: "Rua Santíssimo Redentor, Tiete",
          // eslint-disable-next-line no-undef
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true,
        })
        .then((response) => {
          directionsRenderer.setDirections(response);
          setRoutes(response.routes);
        });
    }
  }, [directionsService, directionsRenderer]);

  return null;
}
