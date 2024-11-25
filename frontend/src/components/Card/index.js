import React, { useEffect, useState, useContext } from "react";
import api from "../../Api.js";
import DriverCards from "./drivercard.js";
import { DistanceContext } from "../../DistanceContext"; // Importe o contexto

export default function DriverList() {
  const [drivers, setDrivers] = useState([]);
  const { distance } = useContext(DistanceContext); // Obtém a distância do contexto

  useEffect(() => {
    async function fetchDrivers() {
      try {
        const response = await api.get("/drivers");
        setDrivers(response.data);
      } catch (error) {
        console.error("Erro ao buscar motoristas:", error);
      }
    }

    fetchDrivers();
  }, []);

  return <DriverCards drivers={drivers.slice(0, 3)} distance={distance} />;
}
